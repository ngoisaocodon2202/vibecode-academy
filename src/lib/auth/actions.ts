"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { hashPassword, verifyPassword } from "./password";
import { generateRawToken, hashToken } from "./tokens";
import { createSession, destroyAllUserSessions, destroyCurrentSession } from "./session";
import { checkRateLimit } from "./rate-limit";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/validation/auth";

export type ActionResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

const RESET_TOKEN_DURATION_MS = 60 * 60 * 1000; // 1 hour

async function getClientIp() {
  const headerList = await headers();
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown"
  );
}

function dashboardPathForRole(role: string) {
  return role === "ADMIN" ? "/admin" : "/dashboard";
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    agreeToTerms: formData.get("agreeToTerms") === "on",
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại thông tin đã nhập",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, phone, password } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return {
      success: false,
      error: "Email đã được sử dụng",
      fieldErrors: { email: ["Email này đã có tài khoản"] },
    };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      phone: phone || null,
      passwordHash,
      role: "STUDENT",
    },
  });

  await createSession(user.id);
  redirect(dashboardPathForRole(user.role));
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "on",
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại thông tin đã nhập",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const ip = await getClientIp();
  const rateLimitKey = `login:${ip}:${parsed.data.email.toLowerCase()}`;
  const { allowed } = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
  if (!allowed) {
    return {
      success: false,
      error: "Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 15 phút.",
    };
  }

  const normalizedEmail = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  const genericError = "Email hoặc mật khẩu không đúng";

  if (!user) {
    return { success: false, error: genericError };
  }

  if (user.status !== "ACTIVE") {
    return { success: false, error: "Tài khoản của bạn đã bị khóa" };
  }

  const validPassword = await verifyPassword(user.passwordHash, parsed.data.password);
  if (!validPassword) {
    return { success: false, error: genericError };
  }

  await createSession(user.id);
  redirect(dashboardPathForRole(user.role));
}

export async function logoutAction() {
  await destroyCurrentSession();
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData): Promise<ActionResult> {
  const raw = { email: formData.get("email") };
  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng nhập email hợp lệ",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const ip = await getClientIp();
  const { allowed } = checkRateLimit(`forgot:${ip}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    return { success: false, error: "Quá nhiều yêu cầu. Vui lòng thử lại sau." };
  }

  const normalizedEmail = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (user) {
    const rawToken = generateRawToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_DURATION_MS);

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const resetUrl = `${process.env.APP_URL ?? "http://localhost:3000"}/reset-password?token=${rawToken}`;

    if (process.env.NODE_ENV === "production") {
      // TODO: plug in a real email delivery adapter (e.g. Resend, SES, Postmark)
      // before relying on this flow in production. Sending is intentionally
      // not simulated here.
      console.warn(
        "[forgotPasswordAction] No email provider configured; reset link was not sent:",
        resetUrl,
      );
    } else {
      console.log(`[dev] Password reset link for ${normalizedEmail}: ${resetUrl}`);
    }
  }

  // Always return the same success response, whether or not the email exists.
  return { success: true };
}

export async function resetPasswordAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = resetPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại thông tin đã nhập",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const tokenHash = hashToken(parsed.data.token);
  const resetToken = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return { success: false, error: "Đường dẫn đặt lại mật khẩu không hợp lệ hoặc đã hết hạn" };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  await destroyAllUserSessions(resetToken.userId);

  return { success: true };
}

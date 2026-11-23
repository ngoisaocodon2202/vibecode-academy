import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata = { title: "Đăng ký — VibeCode Academy" };

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/dashboard");

  return (
    <AuthLayout title="Tạo tài khoản" subtitle="Bắt đầu hành trình học AI và Vibe Coding của bạn">
      <RegisterForm />
    </AuthLayout>
  );
}

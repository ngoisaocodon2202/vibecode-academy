"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/auth/session";
import { updateProfileSchema } from "@/lib/validation/profile";
import type { ActionResult } from "@/lib/auth/actions";

export async function updateProfileAction(formData: FormData): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Bạn cần đăng nhập để thực hiện hành động này" };
  }

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone") || undefined,
  };

  const parsed = updateProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại thông tin đã nhập",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name, phone: parsed.data.phone || null },
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

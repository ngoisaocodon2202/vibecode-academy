"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdmin } from "@/lib/admin/guard";
import type { ActionResult } from "@/lib/auth/actions";
import { z } from "zod";

const VALID_ROLES = ["STUDENT", "INSTRUCTOR", "ADMIN"] as const;
const VALID_STATUSES = ["ACTIVE", "SUSPENDED", "DELETED"] as const;

export async function updateUserRoleAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!userId || !VALID_ROLES.includes(role as typeof VALID_ROLES[number])) {
    return { success: false, error: "Dữ liệu không hợp lệ" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: role as typeof VALID_ROLES[number] },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

export async function updateUserStatusAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const userId = String(formData.get("userId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!userId || !VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
    return { success: false, error: "Dữ liệu không hợp lệ" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { status: status as typeof VALID_STATUSES[number] },
  });

  revalidatePath("/admin/users");
  return { success: true };
}

const courseSchema = z.object({
  title: z.string().min(3, "Tên khóa học phải có ít nhất 3 ký tự"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug chỉ gồm chữ thường, số và gạch ngang"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "PROFESSIONAL"]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export async function createCourseAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const parsed = courseSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    level: formData.get("level"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại thông tin đã nhập",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const existing = await prisma.course.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { success: false, error: "Slug đã được sử dụng", fieldErrors: { slug: ["Slug này đã tồn tại"] } };
  }

  await prisma.course.create({ data: parsed.data });
  revalidatePath("/admin/courses");
  return { success: true };
}

export async function deleteCourseAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const courseId = String(formData.get("courseId") ?? "");
  if (!courseId) return { success: false, error: "Thiếu mã khóa học" };

  await prisma.course.delete({ where: { id: courseId } });
  revalidatePath("/admin/courses");
  return { success: true };
}

const categorySchema = z.object({
  name: z.string().min(2, "Tên danh mục phải có ít nhất 2 ký tự"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug chỉ gồm chữ thường, số và gạch ngang"),
});

export async function createCategoryAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: "Vui lòng kiểm tra lại thông tin đã nhập",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const existing = await prisma.category.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) {
    return { success: false, error: "Slug đã được sử dụng", fieldErrors: { slug: ["Slug này đã tồn tại"] } };
  }

  await prisma.category.create({ data: parsed.data });
  revalidatePath("/admin/categories");
  return { success: true };
}

export async function deleteCategoryAction(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const categoryId = String(formData.get("categoryId") ?? "");
  if (!categoryId) return { success: false, error: "Thiếu mã danh mục" };

  await prisma.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  return { success: true };
}

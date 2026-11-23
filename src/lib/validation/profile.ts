import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự").max(100),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^[0-9+()\-\s]{8,20}$/.test(v), { message: "Số điện thoại không hợp lệ" }),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

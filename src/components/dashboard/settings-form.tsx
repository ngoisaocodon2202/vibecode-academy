"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validation/profile";
import { updateProfileAction } from "@/lib/profile/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import type { User } from "@/generated/prisma";

export function SettingsForm({ user }: { user: Pick<User, "name" | "phone" | "email"> }) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user.name, phone: user.phone ?? "" },
  });

  const onSubmit = (data: UpdateProfileInput) => {
    const formData = new FormData();
    formData.set("name", data.name);
    if (data.phone) formData.set("phone", data.phone);

    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result.success) {
        showToast("Đã lưu thông tin cá nhân", "success");
      } else {
        showToast(result.error, "error");
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            setError(field as keyof UpdateProfileInput, { message: messages[0] });
          }
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-5" noValidate>
      <div>
        <Label htmlFor="email-readonly">Email</Label>
        <Input id="email-readonly" value={user.email} disabled />
      </div>

      <div>
        <Label htmlFor="name">Họ và tên</Label>
        <Input id="name" error={errors.name?.message} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <Label htmlFor="phone">Số điện thoại</Label>
        <Input id="phone" type="tel" error={errors.phone?.message} {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>

      <Button type="submit" isLoading={isPending} className="w-fit">
        Lưu thay đổi
      </Button>
    </form>
  );
}

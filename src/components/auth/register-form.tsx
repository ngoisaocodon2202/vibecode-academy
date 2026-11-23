"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validation/auth";
import { registerAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: undefined as unknown as true,
    },
  });

  const onSubmit = (data: RegisterInput) => {
    setFormError(null);
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    if (data.phone) formData.set("phone", data.phone);
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);
    if (data.agreeToTerms) formData.set("agreeToTerms", "on");

    startTransition(async () => {
      const result = await registerAction(formData);
      if (!result.success) {
        setFormError(result.error);
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            setError(field as keyof RegisterInput, { message: messages[0] });
          }
        }
        showToast(result.error, "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {formError && (
        <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {formError}
        </div>
      )}

      <div>
        <Label htmlFor="name">Họ và tên</Label>
        <Input
          id="name"
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          error={errors.name?.message}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="ban@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="phone">Số điện thoại (không bắt buộc)</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="0912345678"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Tối thiểu 8 ký tự, có hoa, thường và số"
          error={errors.password?.message}
          {...register("password")}
        />
        <FieldError message={errors.password?.message} />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <FieldError message={errors.confirmPassword?.message} />
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-text-secondary">
          <Checkbox {...register("agreeToTerms")} className="mt-0.5" />
          <span>
            Tôi đồng ý với{" "}
            <Link href="/terms" className="text-brand-blue hover:underline">
              Điều khoản sử dụng
            </Link>{" "}
            và Chính sách bảo mật của VibeCode Academy
          </span>
        </label>
        <FieldError message={errors.agreeToTerms?.message} />
      </div>

      <Button type="submit" size="lg" isLoading={isPending} className="w-full">
        Tạo tài khoản
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-medium text-brand-blue hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}

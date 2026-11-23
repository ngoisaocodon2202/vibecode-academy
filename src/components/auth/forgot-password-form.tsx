"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validation/auth";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    setFormError(null);
    const formData = new FormData();
    formData.set("email", data.email);

    startTransition(async () => {
      const result = await forgotPasswordAction(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setFormError(result.error);
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <CheckCircle className="h-12 w-12 text-success" />
        <h2 className="text-lg font-semibold text-text-primary">Kiểm tra email của bạn</h2>
        <p className="text-sm text-text-secondary">
          Nếu email này có trong hệ thống, chúng tôi đã gửi một đường dẫn để đặt lại mật khẩu.
          Đường dẫn có hiệu lực trong 1 giờ.
        </p>
        <Link href="/login" className="text-sm font-medium text-brand-blue hover:underline">
          Quay lại đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {formError && (
        <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {formError}
        </div>
      )}

      <p className="text-sm text-text-secondary">
        Nhập email đã đăng ký. Chúng tôi sẽ gửi cho bạn một đường dẫn để đặt lại mật khẩu.
      </p>

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

      <Button type="submit" size="lg" isLoading={isPending} className="w-full">
        Gửi yêu cầu
      </Button>

      <p className="text-center text-sm text-text-secondary">
        <Link href="/login" className="font-medium text-brand-blue hover:underline">
          Quay lại đăng nhập
        </Link>
      </p>
    </form>
  );
}

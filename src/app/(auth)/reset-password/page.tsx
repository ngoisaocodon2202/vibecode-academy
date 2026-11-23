import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = { title: "Đặt lại mật khẩu — VibeCode Academy" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthLayout title="Đường dẫn không hợp lệ" subtitle="Thiếu mã đặt lại mật khẩu">
        <p className="text-sm text-text-secondary">
          Vui lòng sử dụng đường dẫn được gửi trong email, hoặc{" "}
          <Link href="/forgot-password" className="font-medium text-brand-blue hover:underline">
            yêu cầu một đường dẫn mới
          </Link>
          .
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Đặt lại mật khẩu" subtitle="Nhập mật khẩu mới cho tài khoản của bạn">
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}

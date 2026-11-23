import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = { title: "Quên mật khẩu — VibeCode Academy" };

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Quên mật khẩu"
      subtitle="Chúng tôi sẽ gửi cho bạn đường dẫn để đặt lại mật khẩu"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

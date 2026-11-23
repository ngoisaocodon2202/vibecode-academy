import { redirect } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata = { title: "Đăng nhập — VibeCode Academy" };

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.role === "ADMIN" ? "/admin" : "/dashboard");

  return (
    <AuthLayout title="Đăng nhập" subtitle="Chào mừng bạn trở lại VibeCode Academy">
      <LoginForm />
    </AuthLayout>
  );
}

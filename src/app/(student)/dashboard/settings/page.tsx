import { getCurrentUser } from "@/lib/auth/session";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata = { title: "Cài đặt — VibeCode Academy" };

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Cài đặt tài khoản</h1>
      <p className="mt-1 text-text-secondary">Cập nhật thông tin cá nhân của bạn</p>

      <div className="mt-6">
        <SettingsForm user={user} />
      </div>
    </div>
  );
}

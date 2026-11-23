import { prisma } from "@/lib/db/client";
import { Card } from "@/components/ui/card";
import { UserRoleStatusForm } from "@/components/admin/user-role-status-form";

export const metadata = { title: "Quản lý người dùng — Admin" };

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Người dùng</h1>
      <p className="mt-1 text-text-secondary">{users.length} người dùng trong hệ thống</p>

      <div className="mt-6 flex flex-col gap-3">
        {users.map((user) => (
          <Card key={user.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-sm text-text-secondary">{user.email}</p>
            </div>

            <UserRoleStatusForm userId={user.id} role={user.role} status={user.status} />
          </Card>
        ))}
      </div>
    </div>
  );
}

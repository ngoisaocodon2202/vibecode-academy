"use client";

import { useTransition } from "react";
import { updateUserRoleAction, updateUserStatusAction } from "@/lib/admin/actions";
import { useToast } from "@/components/ui/toast";

const ROLES = ["STUDENT", "INSTRUCTOR", "ADMIN"] as const;
const STATUSES = ["ACTIVE", "SUSPENDED", "DELETED"] as const;

export function UserRoleStatusForm({
  userId,
  role,
  status,
}: {
  userId: string;
  role: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleRoleChange = (newRole: string) => {
    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("role", newRole);
    startTransition(async () => {
      const result = await updateUserRoleAction(formData);
      showToast(result.success ? "Đã cập nhật vai trò" : result.error, result.success ? "success" : "error");
    });
  };

  const handleStatusChange = (newStatus: string) => {
    const formData = new FormData();
    formData.set("userId", userId);
    formData.set("status", newStatus);
    startTransition(async () => {
      const result = await updateUserStatusAction(formData);
      showToast(result.success ? "Đã cập nhật trạng thái" : result.error, result.success ? "success" : "error");
    });
  };

  return (
    <div className="flex items-center gap-3">
      <select
        defaultValue={role}
        disabled={isPending}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="h-9 rounded-lg border border-border-subtle bg-bg-card px-2.5 text-sm text-text-primary disabled:opacity-60"
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        defaultValue={status}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="h-9 rounded-lg border border-border-subtle bg-bg-card px-2.5 text-sm text-text-primary disabled:opacity-60"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

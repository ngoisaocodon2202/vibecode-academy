"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import type { ActionResult } from "@/lib/auth/actions";

export function DeleteButton({
  action,
  fieldName,
  id,
  confirmMessage,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  fieldName: string;
  id: string;
  confirmMessage: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleClick = () => {
    if (!window.confirm(confirmMessage)) return;
    const formData = new FormData();
    formData.set(fieldName, id);
    startTransition(async () => {
      const result = await action(formData);
      if (result.success) {
        showToast("Đã xóa thành công", "success");
      } else {
        showToast(result.error, "error");
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50"
      aria-label="Xóa"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

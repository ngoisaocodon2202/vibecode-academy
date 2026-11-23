"use client";

import { useState, useTransition } from "react";
import { createCategoryAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export function CreateCategoryForm() {
  const [isPending, startTransition] = useTransition();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const { showToast } = useToast();

  const onSubmit = (formData: FormData) => {
    setFieldErrors({});
    startTransition(async () => {
      const result = await createCategoryAction(formData);
      if (result.success) {
        showToast("Đã tạo danh mục", "success");
        (document.getElementById("create-category-form") as HTMLFormElement)?.reset();
      } else {
        showToast(result.error, "error");
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      }
    });
  };

  return (
    <form
      id="create-category-form"
      action={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-card p-5 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <Label htmlFor="name">Tên danh mục</Label>
        <Input id="name" name="name" required />
        <FieldError message={fieldErrors.name?.[0]} />
      </div>
      <div className="flex-1">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" placeholder="vi-du-slug" required />
        <FieldError message={fieldErrors.slug?.[0]} />
      </div>
      <Button type="submit" isLoading={isPending} className="w-fit">
        Tạo danh mục
      </Button>
    </form>
  );
}

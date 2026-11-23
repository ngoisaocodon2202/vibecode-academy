"use client";

import { useState, useTransition } from "react";
import { createCourseAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

export function CreateCourseForm() {
  const [isPending, startTransition] = useTransition();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const { showToast } = useToast();

  const onSubmit = (formData: FormData) => {
    setFieldErrors({});
    startTransition(async () => {
      const result = await createCourseAction(formData);
      if (result.success) {
        showToast("Đã tạo khóa học", "success");
        (document.getElementById("create-course-form") as HTMLFormElement)?.reset();
      } else {
        showToast(result.error, "error");
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      }
    });
  };

  return (
    <form id="create-course-form" action={onSubmit} className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-card p-5">
      <h2 className="text-sm font-semibold text-text-primary">Tạo khóa học mới</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Tên khóa học</Label>
          <Input id="title" name="title" required />
          <FieldError message={fieldErrors.title?.[0]} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" placeholder="vi-du-slug-khoa-hoc" required />
          <FieldError message={fieldErrors.slug?.[0]} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Input id="description" name="description" required />
        <FieldError message={fieldErrors.description?.[0]} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="level">Cấp độ</Label>
          <Select id="level" name="level" defaultValue="BEGINNER">
            <option value="BEGINNER">Cơ bản</option>
            <option value="INTERMEDIATE">Trung cấp</option>
            <option value="ADVANCED">Nâng cao</option>
            <option value="PROFESSIONAL">Chuyên sâu</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Trạng thái</Label>
          <Select id="status" name="status" defaultValue="DRAFT">
            <option value="DRAFT">Bản nháp</option>
            <option value="PUBLISHED">Đã xuất bản</option>
            <option value="ARCHIVED">Lưu trữ</option>
          </Select>
        </div>
      </div>

      <Button type="submit" isLoading={isPending} className="w-fit">
        Tạo khóa học
      </Button>
    </form>
  );
}

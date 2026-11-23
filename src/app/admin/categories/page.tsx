import { prisma } from "@/lib/db/client";
import { deleteCategoryAction } from "@/lib/admin/actions";
import { Card } from "@/components/ui/card";
import { CreateCategoryForm } from "@/components/admin/create-category-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "Quản lý danh mục — Admin" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Danh mục</h1>
        <p className="mt-1 text-text-secondary">{categories.length} danh mục trong hệ thống</p>
      </div>

      <CreateCategoryForm />

      <div className="flex flex-col gap-3">
        {categories.length === 0 ? (
          <Card className="py-10 text-center text-sm text-text-secondary">
            Chưa có danh mục nào. Tạo danh mục đầu tiên ở trên.
          </Card>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{category.name}</p>
                <p className="text-sm text-text-secondary">/{category.slug}</p>
              </div>
              <DeleteButton
                action={deleteCategoryAction}
                fieldName="categoryId"
                id={category.id}
                confirmMessage={`Xóa danh mục "${category.name}"?`}
              />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

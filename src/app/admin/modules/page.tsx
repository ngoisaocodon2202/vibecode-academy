import { Inbox } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Quản lý chương học — Admin" };

export default async function AdminModulesPage() {
  const modules = await prisma.courseModule.findMany({
    include: { course: true, lessons: true },
    orderBy: { position: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Chương học</h1>
      <p className="mt-1 text-text-secondary">{modules.length} chương trong hệ thống</p>

      <div className="mt-6 flex flex-col gap-3">
        {modules.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-12 text-center">
            <Inbox className="h-8 w-8 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">Chưa có chương học nào</p>
            <p className="text-sm text-text-secondary">Tạo khóa học trước, sau đó thêm chương học</p>
          </Card>
        ) : (
          modules.map((module) => (
            <Card key={module.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{module.title}</p>
                <p className="text-sm text-text-secondary">{module.course.title}</p>
              </div>
              <span className="text-xs text-text-secondary">{module.lessons.length} bài học</span>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

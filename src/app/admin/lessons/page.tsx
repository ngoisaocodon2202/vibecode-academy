import { Inbox } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Quản lý bài học — Admin" };

export default async function AdminLessonsPage() {
  const lessons = await prisma.lesson.findMany({
    include: { module: { include: { course: true } } },
    orderBy: { position: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Bài học</h1>
      <p className="mt-1 text-text-secondary">{lessons.length} bài học trong hệ thống</p>

      <div className="mt-6 flex flex-col gap-3">
        {lessons.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-12 text-center">
            <Inbox className="h-8 w-8 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">Chưa có bài học nào</p>
            <p className="text-sm text-text-secondary">Tạo chương học trước, sau đó thêm bài học</p>
          </Card>
        ) : (
          lessons.map((lesson) => (
            <Card key={lesson.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{lesson.title}</p>
                <p className="text-sm text-text-secondary">
                  {lesson.module.course.title} / {lesson.module.title}
                </p>
              </div>
              <Badge>{lesson.status}</Badge>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

import { prisma } from "@/lib/db/client";
import { deleteCourseAction } from "@/lib/admin/actions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateCourseForm } from "@/components/admin/create-course-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "Quản lý khóa học — Admin" };

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Khóa học</h1>
        <p className="mt-1 text-text-secondary">{courses.length} khóa học trong hệ thống</p>
      </div>

      <CreateCourseForm />

      <div className="flex flex-col gap-3">
        {courses.length === 0 ? (
          <Card className="py-10 text-center text-sm text-text-secondary">
            Chưa có khóa học nào. Tạo khóa học đầu tiên ở trên.
          </Card>
        ) : (
          courses.map((course) => (
            <Card key={course.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-primary">{course.title}</p>
                <p className="text-sm text-text-secondary">/{course.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="brand">{course.level}</Badge>
                <Badge>{course.status}</Badge>
                <DeleteButton
                  action={deleteCourseAction}
                  fieldName="courseId"
                  id={course.id}
                  confirmMessage={`Xóa khóa học "${course.title}"? Hành động này không thể hoàn tác.`}
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

import { Inbox } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Quản lý đăng ký khóa học — Admin" };

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({
    include: { user: true, course: true },
    orderBy: { enrolledAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Lượt đăng ký</h1>
      <p className="mt-1 text-text-secondary">{enrollments.length} lượt đăng ký trong hệ thống</p>

      <div className="mt-6 flex flex-col gap-3">
        {enrollments.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-12 text-center">
            <Inbox className="h-8 w-8 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">Chưa có lượt đăng ký nào</p>
          </Card>
        ) : (
          enrollments.map((enrollment) => (
            <Card key={enrollment.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{enrollment.user.name}</p>
                <p className="text-sm text-text-secondary">{enrollment.course.title}</p>
              </div>
              <Badge variant="brand">{enrollment.status}</Badge>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

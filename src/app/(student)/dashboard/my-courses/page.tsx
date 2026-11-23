import { Inbox } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Khóa học của tôi — VibeCode Academy" };

export default async function MyCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: { course: true },
    orderBy: { enrolledAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Khóa học của tôi</h1>
      <p className="mt-1 text-text-secondary">Danh sách các khóa học bạn đã đăng ký</p>

      <div className="mt-6">
        {enrollments.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-16 text-center">
            <Inbox className="h-8 w-8 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">Bạn chưa đăng ký khóa học nào</p>
            <p className="text-sm text-text-secondary">Khám phá khóa học để bắt đầu học tập</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {enrollments.map((enrollment) => (
              <Card key={enrollment.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">{enrollment.course.title}</span>
                <Badge variant="brand">{enrollment.status}</Badge>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

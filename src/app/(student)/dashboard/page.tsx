import { BookOpen, CheckCircle2, Clock, Inbox } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";
import { getStudentOverview } from "@/lib/data/dashboard";
import { Card } from "@/components/ui/card";
import { COURSES } from "@/lib/data/courses";
import { CourseCard } from "@/components/courses/course-card";

export const metadata = { title: "Dashboard — VibeCode Academy" };

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const overview = await getStudentOverview(user.id);
  const estimatedHoursLearned = Math.round(overview.completedLessons * 0.3 * 10) / 10;

  const stats = [
    { label: "Khóa học đã đăng ký", value: overview.totalCourses, icon: BookOpen },
    { label: "Bài học đã hoàn thành", value: overview.completedLessons, icon: CheckCircle2 },
    { label: "Tổng thời gian học (giờ)", value: estimatedHoursLearned, icon: Clock },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Chào mừng trở lại, {user.name}</h1>
        <p className="mt-1 text-text-secondary">Đây là tổng quan hành trình học tập của bạn</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <stat.icon className="h-6 w-6 text-brand-blue" />
            <p className="mt-4 text-2xl font-semibold text-text-primary">{stat.value}</p>
            <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
          </Card>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Hoạt động gần đây</h2>
        {overview.recentActivity.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-12 text-center">
            <Inbox className="h-8 w-8 text-text-secondary" />
            <p className="text-sm font-medium text-text-primary">Chưa có hoạt động nào</p>
            <p className="text-sm text-text-secondary">Bắt đầu một khóa học để xem tiến độ tại đây</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {overview.recentActivity.map((activity) => (
              <Card key={activity.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{activity.lesson.title}</p>
                  <p className="text-sm text-text-secondary">
                    {activity.lesson.module.course.title}
                  </p>
                </div>
                <span className="text-xs text-text-secondary">
                  {activity.completed ? "Hoàn thành" : "Đang học"}
                </span>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Khóa học đề xuất</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.slice(0, 3).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}

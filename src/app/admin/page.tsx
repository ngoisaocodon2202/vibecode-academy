import { Users, BookOpen, ClipboardList, Activity } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Admin Overview — VibeCode Academy" };

export default async function AdminOverviewPage() {
  const [studentCount, courseCount, enrollmentCount, recentUsers] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Tổng số học viên", value: studentCount, icon: Users },
    { label: "Tổng số khóa học", value: courseCount, icon: BookOpen },
    { label: "Số lượt đăng ký", value: enrollmentCount, icon: ClipboardList },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Tổng quan quản trị</h1>
        <p className="mt-1 text-text-secondary">Thống kê hoạt động của nền tảng</p>
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
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">Hoạt động gần đây</h2>
        </div>
        <div className="flex flex-col gap-3">
          {recentUsers.length === 0 ? (
            <Card className="py-10 text-center text-sm text-text-secondary">
              Chưa có người dùng nào
            </Card>
          ) : (
            recentUsers.map((u) => (
              <Card key={u.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{u.name}</p>
                  <p className="text-sm text-text-secondary">{u.email}</p>
                </div>
                <span className="text-xs text-text-secondary">{u.role}</span>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

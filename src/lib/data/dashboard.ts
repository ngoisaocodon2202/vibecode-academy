import "server-only";
import { prisma } from "@/lib/db/client";

export async function getStudentOverview(userId: string) {
  const [totalCourses, completedLessons, totalLessonsStarted] = await Promise.all([
    prisma.enrollment.count({ where: { userId } }),
    prisma.lessonProgress.count({ where: { userId, completed: true } }),
    prisma.lessonProgress.count({ where: { userId } }),
  ]);

  const recentActivity = await prisma.lessonProgress.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: { lesson: { include: { module: { include: { course: true } } } } },
  });

  return {
    totalCourses,
    completedLessons,
    totalLessonsStarted,
    recentActivity,
  };
}

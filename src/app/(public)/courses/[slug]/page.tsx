import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, CheckCircle, PlayCircle } from "lucide-react";
import { getCourseBySlug, LEVEL_LABELS } from "@/lib/data/courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return { title: course ? `${course.title} — VibeCode Academy` : "Khóa học không tồn tại" };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div>
      <div className={`bg-gradient-to-br ${course.thumbnailGradient} px-4 py-16 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-2">
            <Badge className="border-white/30 bg-white/15 text-white">
              {LEVEL_LABELS[course.level]}
            </Badge>
            <Badge className="border-white/30 bg-white/15 text-white">{course.category}</Badge>
          </div>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{course.title}</h1>
          <p className="mt-3 max-w-2xl text-white/90">{course.description}</p>
          <div className="mt-6 flex items-center gap-6 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {course.durationHours} giờ
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> {course.lessonCount} bài học
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-text-primary">Mục tiêu khóa học</h2>
            <ul className="flex flex-col gap-2.5">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-text-primary">Nội dung khóa học</h2>
            <div className="flex flex-col gap-3">
              {course.modules.map((module, idx) => (
                <div key={module.title} className="rounded-xl border border-border-subtle bg-bg-card p-5">
                  <h3 className="mb-3 text-sm font-semibold text-text-primary">
                    Chương {idx + 1}: {module.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {module.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <PlayCircle className="h-4 w-4 shrink-0 text-brand-blue" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-text-primary">Câu hỏi thường gặp</h2>
            <Accordion items={course.faqs} />
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Giảng viên</h3>
              <p className="mt-2 text-sm text-text-primary">{course.instructor.name}</p>
              <p className="text-sm text-text-secondary">{course.instructor.title}</p>
            </div>
            <Link href="/register" className="w-full">
              <Button size="lg" className="w-full">
                Đăng ký khóa học
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

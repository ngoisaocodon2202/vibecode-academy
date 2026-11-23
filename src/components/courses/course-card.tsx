import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LEVEL_LABELS, type MockCourse } from "@/lib/data/courses";

export function CourseCard({ course }: { course: MockCourse }) {
  return (
    <Link href={`/courses/${course.slug}`} className="group">
      <Card interactive className="flex h-full flex-col gap-4 overflow-hidden p-0">
        <div
          className={`relative flex h-36 w-full items-center justify-center bg-gradient-to-br ${course.thumbnailGradient}`}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <GraduationCap className="relative h-10 w-10 text-white/90 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <Badge variant="brand">{LEVEL_LABELS[course.level]}</Badge>
            <Badge>{course.category}</Badge>
          </div>
          <h3 className="text-base font-semibold text-text-primary">{course.title}</h3>
          <p className="line-clamp-2 flex-1 text-sm text-text-secondary">{course.description}</p>
          <div className="flex items-center justify-between gap-4 border-t border-border-subtle pt-3">
            <div className="flex items-center gap-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {course.durationHours} giờ
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> {course.lessonCount} bài học
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-brand-blue">
              <span className="hidden sm:inline">Khám phá</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSES } from "@/lib/data/courses";
import { CourseCard } from "@/components/courses/course-card";
import { AnimateIn } from "@/components/ui/animate-in";

export function FeaturedCoursesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimateIn className="mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Khóa học nổi bật
          </h2>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:underline"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course, idx) => (
            <AnimateIn key={course.slug} delay={idx * 0.08}>
              <CourseCard course={course} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

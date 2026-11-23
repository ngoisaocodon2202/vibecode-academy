import { CoursesExplorer } from "@/components/courses/courses-explorer";

export const metadata = { title: "Khóa học — VibeCode Academy" };

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-text-primary">Khóa học</h1>
        <p className="mt-2 text-text-secondary">
          Khám phá các khóa học AI và Vibe Coding từ cơ bản đến chuyên sâu
        </p>
      </div>
      <CoursesExplorer />
    </div>
  );
}

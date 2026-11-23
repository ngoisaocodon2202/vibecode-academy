"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { COURSES, LEVEL_LABELS, type CourseLevel } from "@/lib/data/courses";
import { CourseCard } from "@/components/courses/course-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type SortOption = "newest" | "duration-asc" | "duration-desc";

const CATEGORIES = Array.from(new Set(COURSES.map((c) => c.category)));

export function CoursesExplorer() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let result = COURSES.filter((course) => {
      const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase().trim());
      const matchesLevel = level === "all" || course.level === level;
      const matchesCategory = category === "all" || course.category === category;
      return matchesQuery && matchesLevel && matchesCategory;
    });

    if (sort === "duration-asc") {
      result = [...result].sort((a, b) => a.durationHours - b.durationHours);
    } else if (sort === "duration-desc") {
      result = [...result].sort((a, b) => b.durationHours - a.durationHours);
    }

    return result;
  }, [query, level, category, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Tìm kiếm khóa học..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={level} onChange={(e) => setLevel(e.target.value as CourseLevel | "all")} className="sm:w-48">
          <option value="all">Tất cả cấp độ</option>
          {Object.entries(LEVEL_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} className="sm:w-48">
          <option value="all">Tất cả chủ đề</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="sm:w-48">
          <option value="newest">Mới nhất</option>
          <option value="duration-asc">Thời lượng: ngắn đến dài</option>
          <option value="duration-desc">Thời lượng: dài đến ngắn</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border-subtle bg-bg-card py-16 text-center">
          <p className="text-base font-medium text-text-primary">Không tìm thấy khóa học nào</p>
          <p className="text-sm text-text-secondary">Hãy thử điều chỉnh từ khóa hoặc bộ lọc</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

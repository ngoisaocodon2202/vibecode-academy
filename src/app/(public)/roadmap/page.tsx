import { CheckCircle } from "lucide-react";
import { LEVEL_LABELS, type CourseLevel } from "@/lib/data/courses";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Lộ trình học — VibeCode Academy" };

const ROADMAP: { level: CourseLevel; description: string; skills: string[] }[] = [
  {
    level: "BEGINNER",
    description: "Làm quen với AI và tư duy Vibe Coding, không cần kiến thức lập trình trước đó.",
    skills: ["Sử dụng công cụ AI cơ bản", "Viết prompt hiệu quả", "Hiểu cấu trúc một ứng dụng web"],
  },
  {
    level: "INTERMEDIATE",
    description: "Xây dựng sản phẩm thật với database và triển khai lên Internet.",
    skills: ["Thiết kế database", "Kết nối frontend và backend", "Triển khai sản phẩm thực tế"],
  },
  {
    level: "ADVANCED",
    description: "Kỹ thuật prompt chuyên sâu và tối ưu quy trình phát triển với AI.",
    skills: ["Prompt engineering chuyên sâu", "Tối ưu chi phí và hiệu năng AI", "Debug hệ thống phức tạp"],
  },
  {
    level: "PROFESSIONAL",
    description: "Lộ trình toàn diện để trở thành kỹ sư AI chuyên nghiệp, sẵn sàng cho công việc thực tế.",
    skills: ["Kiến trúc hệ thống quy mô lớn", "Giám sát và đánh giá AI trong sản phẩm", "Danh mục dự án thực tế"],
  },
];

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-text-primary">Lộ trình học</h1>
        <p className="mt-2 text-text-secondary">
          Từ người mới bắt đầu đến kỹ sư AI chuyên nghiệp, từng bước một
        </p>
      </div>

      <div className="relative flex flex-col gap-6 sm:pl-6">
        <div className="absolute bottom-0 left-[9px] top-0 hidden w-px bg-border-subtle sm:block" />
        {ROADMAP.map((stage, idx) => (
          <div key={stage.level} className="relative flex gap-4 sm:gap-6">
            <div className="hidden sm:block">
              <div className="relative z-10 mt-1.5 h-[18px] w-[18px] -ml-6 rounded-full border-2 border-brand-blue bg-bg-primary" />
            </div>
            <div className="flex-1 rounded-xl border border-border-subtle bg-bg-card p-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-secondary">
                  Giai đoạn {idx + 1}
                </span>
                <Badge variant="brand">{LEVEL_LABELS[stage.level]}</Badge>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{stage.description}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {stage.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2.5 text-sm text-text-primary">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

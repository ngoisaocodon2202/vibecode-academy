import { BookOpen, CheckSquare, Code, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Tài nguyên — VibeCode Academy" };

const RESOURCE_GROUPS = [
  {
    title: "Tài liệu",
    icon: FileText,
    items: [
      { title: "Hướng dẫn bắt đầu với Vibe Coding", tag: "PDF" },
      { title: "Tổng quan kiến trúc ứng dụng web hiện đại", tag: "PDF" },
    ],
  },
  {
    title: "Prompt Library",
    icon: BookOpen,
    items: [
      { title: "Prompt cho sinh code chất lượng cao", tag: "Prompt" },
      { title: "Prompt cho debug và refactor", tag: "Prompt" },
    ],
  },
  {
    title: "Công cụ lập trình",
    icon: Code,
    items: [
      { title: "Thiết lập môi trường phát triển với AI", tag: "Hướng dẫn" },
      { title: "Danh sách công cụ AI nên biết năm nay", tag: "Hướng dẫn" },
    ],
  },
  {
    title: "Checklist",
    icon: CheckSquare,
    items: [
      { title: "Checklist trước khi triển khai sản phẩm", tag: "Checklist" },
      { title: "Checklist bảo mật cơ bản cho ứng dụng web", tag: "Checklist" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-text-primary">Tài nguyên</h1>
        <p className="mt-2 text-text-secondary">
          Tài liệu, prompt mẫu và công cụ hỗ trợ hành trình học của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {RESOURCE_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="mb-4 flex items-center gap-2.5">
              <group.icon className="h-5 w-5 text-brand-blue" />
              <h2 className="text-lg font-semibold text-text-primary">{group.title}</h2>
            </div>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <Card key={item.title} interactive className="flex items-center justify-between gap-3">
                  <span className="text-sm text-text-primary">{item.title}</span>
                  <Badge>{item.tag}</Badge>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

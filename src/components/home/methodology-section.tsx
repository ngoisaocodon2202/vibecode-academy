import { CheckCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const METHODOLOGY = [
  "Học qua thực hành: mỗi bài học gắn với một sản phẩm cụ thể",
  "Phản hồi nhanh: AI hỗ trợ đánh giá và gợi ý cải thiện ngay lập tức",
  "Lộ trình rõ ràng: tiến bộ từng bước theo cấp độ phù hợp",
  "Cộng đồng đồng hành: học cùng những người có cùng mục tiêu",
];

export function MethodologySection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Phương pháp đào tạo
          </h2>
        </AnimateIn>
        <ul className="flex flex-col gap-4">
          {METHODOLOGY.map((item, idx) => (
            <AnimateIn key={item} delay={idx * 0.08}>
              <li className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-card p-4 transition-colors hover:border-success/30">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-sm text-text-primary">{item}</span>
              </li>
            </AnimateIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Code, Database, GraduationCap, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimateIn } from "@/components/ui/animate-in";

const OUTCOMES = [
  {
    icon: Code,
    title: "Làm chủ công cụ AI",
    description: "Thành thạo các công cụ AI hàng đầu để viết code nhanh và chính xác hơn.",
  },
  {
    icon: Rocket,
    title: "Xây dựng sản phẩm thật",
    description: "Tự tay dựng website, ứng dụng từ ý tưởng đến khi triển khai thực tế.",
  },
  {
    icon: Database,
    title: "Tư duy hệ thống",
    description: "Hiểu cách thiết kế kiến trúc, database và luồng dữ liệu của sản phẩm.",
  },
  {
    icon: GraduationCap,
    title: "Sẵn sàng cho nghề nghiệp",
    description: "Trang bị kỹ năng để làm việc như một kỹ sư phần mềm chuyên nghiệp.",
  },
];

export function OutcomesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Những gì học viên sẽ đạt được
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((item, idx) => (
            <AnimateIn key={item.title} delay={idx * 0.08}>
              <Card interactive className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-blue/10">
                  <item.icon className="h-5.5 w-5.5 text-brand-blue" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

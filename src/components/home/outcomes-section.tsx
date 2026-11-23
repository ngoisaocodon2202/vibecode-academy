import { Code, Database, GraduationCap, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimateIn } from "@/components/ui/animate-in";
import { cn } from "@/lib/utils/cn";

const OUTCOMES = [
  {
    icon: Rocket,
    title: "Xây dựng sản phẩm thật",
    description:
      "Tự tay dựng website, ứng dụng từ ý tưởng đến khi triển khai thực tế lên Internet, không chỉ học lý thuyết.",
    span: "lg:col-span-2 lg:row-span-2",
    iconSize: "h-14 w-14",
  },
  {
    icon: Code,
    title: "Làm chủ công cụ AI",
    description: "Thành thạo các công cụ AI hàng đầu để viết code nhanh và chính xác hơn.",
    span: "lg:col-span-1",
    iconSize: "h-11 w-11",
  },
  {
    icon: Database,
    title: "Tư duy hệ thống",
    description: "Hiểu cách thiết kế kiến trúc, database và luồng dữ liệu của sản phẩm.",
    span: "lg:col-span-1",
    iconSize: "h-11 w-11",
  },
  {
    icon: GraduationCap,
    title: "Sẵn sàng cho nghề nghiệp",
    description: "Trang bị kỹ năng để làm việc như một kỹ sư phần mềm chuyên nghiệp.",
    span: "lg:col-span-2",
    iconSize: "h-11 w-11",
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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {OUTCOMES.map((item, idx) => (
            <AnimateIn key={item.title} delay={idx * 0.08} className={cn("h-full", item.span)}>
              <Card
                interactive
                className="group relative flex h-full flex-col justify-center overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <div
                  className={cn(
                    "relative flex items-center justify-center rounded-lg bg-brand-blue/10",
                    item.iconSize,
                  )}
                >
                  <item.icon className="h-1/2 w-1/2 text-brand-blue" />
                </div>
                <h3 className="relative mt-4 text-base font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm text-text-secondary">{item.description}</p>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

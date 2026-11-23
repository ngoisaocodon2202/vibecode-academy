import { Clock, Download, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimateIn } from "@/components/ui/animate-in";

const BENEFITS = [
  { icon: Clock, title: "Học theo tốc độ riêng", description: "Truy cập không giới hạn, học bất cứ khi nào bạn muốn." },
  { icon: Download, title: "Tài nguyên tải về", description: "Prompt library, checklist và tài liệu kèm theo mỗi khóa học." },
  { icon: Users, title: "Cộng đồng học viên", description: "Kết nối và trao đổi với học viên khác trong cộng đồng." },
  { icon: Zap, title: "Cập nhật liên tục", description: "Nội dung được cập nhật theo các công cụ AI mới nhất." },
];

export function BenefitsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Lợi ích dành cho học viên
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item, idx) => (
            <AnimateIn key={item.title} delay={idx * 0.08}>
              <Card className="h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-cyan/10">
                  <item.icon className="h-5.5 w-5.5 text-brand-cyan" />
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

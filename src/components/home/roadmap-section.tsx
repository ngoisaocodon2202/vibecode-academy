import { LEVEL_LABELS, type CourseLevel } from "@/lib/data/courses";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";

const STEPS: { level: CourseLevel; description: string }[] = [
  { level: "BEGINNER", description: "Làm quen với AI, Vibe Coding và các khái niệm nền tảng." },
  { level: "INTERMEDIATE", description: "Xây dựng sản phẩm thật với database và triển khai thực tế." },
  { level: "ADVANCED", description: "Kỹ thuật prompt chuyên sâu và tối ưu quy trình phát triển." },
  { level: "PROFESSIONAL", description: "Lộ trình toàn diện để trở thành kỹ sư AI chuyên nghiệp." },
];

export function RoadmapSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Lộ trình từ Beginner đến Advanced
          </h2>
        </AnimateIn>

        <div className="relative flex flex-col gap-6 sm:pl-6">
          <div className="absolute bottom-0 left-[9px] top-0 hidden w-px bg-gradient-to-b from-brand-blue via-brand-violet to-brand-cyan opacity-40 sm:block" />
          {STEPS.map((step, idx) => (
            <AnimateIn key={step.level} delay={idx * 0.1} className="relative flex gap-4 sm:gap-6">
              <div className="hidden sm:block">
                <div className="relative z-10 mt-1.5 h-[18px] w-[18px] -ml-6 rounded-full border-2 border-brand-blue bg-bg-primary shadow-[0_0_12px_rgba(217,119,6,0.55)]" />
              </div>
              <div className="flex-1 rounded-xl border border-border-subtle bg-bg-card p-5 transition-colors hover:border-brand-blue/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-secondary">
                    Giai đoạn {idx + 1}
                  </span>
                  <Badge variant="brand">{LEVEL_LABELS[step.level]}</Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

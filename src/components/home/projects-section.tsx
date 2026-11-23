import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";

const PROJECTS = [
  { title: "Ứng dụng quản lý công việc AI", tag: "Web App" },
  { title: "Chatbot hỗ trợ khách hàng", tag: "AI Agent" },
  { title: "Nền tảng blog cá nhân", tag: "Full-stack" },
  { title: "Công cụ phân tích dữ liệu", tag: "Data Tool" },
];

export function ProjectsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Dự án thực tế
          </h2>
          <p className="mt-2 text-text-secondary">
            Học viên sẽ xây dựng các dự án thực tế trong suốt quá trình học
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project, idx) => (
            <AnimateIn key={project.title} delay={idx * 0.08}>
              <Card interactive className="h-full">
                <Badge variant="brand">{project.tag}</Badge>
                <h3 className="mt-4 text-sm font-semibold text-text-primary">{project.title}</h3>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

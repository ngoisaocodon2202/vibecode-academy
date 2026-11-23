import { Bot, Code, Rocket } from "lucide-react";
import { TechIcon, type TechIconName } from "@/components/icons/tech-icon";
import { AnimateIn } from "@/components/ui/animate-in";

type Tool =
  | { kind: "brand"; name: TechIconName; label: string }
  | { kind: "generic"; icon: typeof Bot; label: string };

const TOOLS: Tool[] = [
  { kind: "generic", icon: Code, label: "VS Code" },
  { kind: "brand", name: "cursor", label: "Cursor" },
  { kind: "generic", icon: Rocket, label: "Antigravity" },
  { kind: "generic", icon: Bot, label: "OpenAI" },
  { kind: "brand", name: "claude", label: "Claude" },
  { kind: "brand", name: "gemini", label: "Gemini" },
  { kind: "brand", name: "github", label: "GitHub" },
  { kind: "brand", name: "git", label: "Git" },
  { kind: "brand", name: "vercel", label: "Vercel" },
  { kind: "brand", name: "react", label: "React" },
  { kind: "brand", name: "nextjs", label: "Next.js" },
  { kind: "brand", name: "nodejs", label: "Node.js" },
  { kind: "brand", name: "typescript", label: "TypeScript" },
  { kind: "brand", name: "javascript", label: "JavaScript" },
  { kind: "brand", name: "postgresql", label: "PostgreSQL" },
  { kind: "brand", name: "tailwindcss", label: "Tailwind CSS" },
  { kind: "brand", name: "figma", label: "Figma" },
];

export function ToolsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Công cụ AI được đào tạo
          </h2>
          <p className="mt-2 text-text-secondary">
            Thực hành trực tiếp với các công cụ và công nghệ đang dẫn đầu ngành
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {TOOLS.map((tool) => (
              <div
                key={tool.label}
                className="group flex flex-col items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/50 hover:bg-brand-blue/5"
              >
                {tool.kind === "brand" ? (
                  <TechIcon
                    name={tool.name}
                    className="h-8 w-8 text-text-secondary transition-colors group-hover:text-text-primary"
                  />
                ) : (
                  <tool.icon className="h-8 w-8 text-text-secondary transition-colors group-hover:text-text-primary" />
                )}
                <span className="text-xs text-text-secondary">{tool.label}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

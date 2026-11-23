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

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <div className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-card px-5 py-3.5 opacity-80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/50 hover:bg-brand-blue/5 hover:opacity-100">
      {tool.kind === "brand" ? (
        <TechIcon name={tool.name} className="h-6 w-6 transition-transform group-hover:scale-110" />
      ) : (
        <tool.icon className="h-6 w-6 text-text-secondary transition-all group-hover:scale-110 group-hover:text-text-primary" />
      )}
      <span className="whitespace-nowrap text-sm text-text-secondary transition-colors group-hover:text-text-primary">
        {tool.label}
      </span>
    </div>
  );
}

export function ToolsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Công cụ AI được đào tạo
          </h2>
          <p className="mt-2 text-text-secondary">
            Thực hành trực tiếp với các công cụ và công nghệ đang dẫn đầu ngành
          </p>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.1}>
        <div className="group relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-primary to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-primary to-transparent sm:w-32" />

          <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
            {[...TOOLS, ...TOOLS].map((tool, idx) => (
              <ToolPill key={`${tool.label}-${idx}`} tool={tool} />
            ))}
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}

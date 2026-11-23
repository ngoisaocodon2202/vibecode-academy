import {
  siGithub,
  siGit,
  siVercel,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siTypescript,
  siJavascript,
  siPostgresql,
  siTailwindcss,
  siFigma,
  siGooglegemini,
  siClaude,
  siCursor,
} from "simple-icons";

const ICONS = {
  github: siGithub,
  git: siGit,
  vercel: siVercel,
  react: siReact,
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  postgresql: siPostgresql,
  tailwindcss: siTailwindcss,
  figma: siFigma,
  gemini: siGooglegemini,
  claude: siClaude,
  cursor: siCursor,
} as const;

/**
 * VS Code, OpenAI and Google Antigravity have no official mark in simple-icons;
 * these names map to a generic Lucide icon in ToolsSection instead of a wrong logo.
 */

export type TechIconName = keyof typeof ICONS;

/** Brand marks whose official color is near-black and would vanish on a dark card background. */
const NEEDS_LIGHT_CHIP: ReadonlySet<TechIconName> = new Set(["github", "vercel", "nextjs", "cursor"]);

export function TechIcon({
  name,
  className,
  monochrome = false,
}: {
  name: TechIconName;
  className?: string;
  /** When true, renders using currentColor instead of the brand hex. */
  monochrome?: boolean;
}) {
  const icon = ICONS[name];
  const pathMatch = icon.svg.match(/<path d="([^"]+)"/);
  if (!pathMatch) return null;

  const useLightChip = !monochrome && NEEDS_LIGHT_CHIP.has(name);

  const svg = (
    <svg
      viewBox="0 0 24 24"
      className={useLightChip ? "h-full w-full" : className}
      fill={monochrome ? "currentColor" : `#${icon.hex}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={pathMatch[1]} />
    </svg>
  );

  if (useLightChip) {
    return (
      <span className={`inline-flex items-center justify-center rounded-md bg-white p-1 ${className ?? ""}`}>
        {svg}
      </span>
    );
  }

  return svg;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  FolderOpen,
  Award,
  Settings,
  LogOut,
  Users,
  Layers,
  FileText,
  Tag,
  ClipboardList,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { logoutAction } from "@/lib/auth/actions";

const ICONS = {
  overview: LayoutDashboard,
  courses: BookOpen,
  roadmap: Map,
  resources: FolderOpen,
  certificates: Award,
  settings: Settings,
  users: Users,
  modules: Layers,
  lessons: FileText,
  categories: Tag,
  enrollments: ClipboardList,
  reports: BarChart3,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;
export type NavItem = { href: string; label: string; iconKey: IconKey };

const STUDENT_NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", iconKey: "overview" },
  { href: "/dashboard/my-courses", label: "My Courses", iconKey: "courses" },
  { href: "/roadmap", label: "Learning Roadmap", iconKey: "roadmap" },
  { href: "/resources", label: "Resources", iconKey: "resources" },
  { href: "/dashboard/certificates", label: "My Certificates", iconKey: "certificates" },
  { href: "/dashboard/settings", label: "Settings", iconKey: "settings" },
];

export function SidebarNav({ items = STUDENT_NAV, onNavigate }: { items?: NavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      {items.map((item) => {
        const isActive = pathname === item.href;
        const Icon = ICONS[item.iconKey];
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-blue/10 text-brand-blue"
                : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
            )}
          >
            <Icon className="h-4.5 w-4.5" />
            {item.label}
          </Link>
        );
      })}

      <form action={logoutAction} className="mt-auto">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-error/10 hover:text-error"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </form>
    </nav>
  );
}

export { STUDENT_NAV };

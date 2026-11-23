import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { NavItem } from "@/components/dashboard/sidebar-nav";

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Overview", iconKey: "overview" },
  { href: "/admin/users", label: "Users", iconKey: "users" },
  { href: "/admin/courses", label: "Courses", iconKey: "courses" },
  { href: "/admin/modules", label: "Modules", iconKey: "modules" },
  { href: "/admin/lessons", label: "Lessons", iconKey: "lessons" },
  { href: "/admin/categories", label: "Categories", iconKey: "categories" },
  { href: "/admin/enrollments", label: "Enrollments", iconKey: "enrollments" },
  { href: "/admin/reports", label: "Reports", iconKey: "reports" },
  { href: "/admin/settings", label: "Settings", iconKey: "settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <DashboardShell user={user} navItems={ADMIN_NAV}>
      {children}
    </DashboardShell>
  );
}

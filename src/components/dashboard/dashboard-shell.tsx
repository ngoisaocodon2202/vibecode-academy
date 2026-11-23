"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SidebarNav, type NavItem } from "@/components/dashboard/sidebar-nav";
import { Logo } from "@/components/layout/logo";
import type { User } from "@/generated/prisma";

export function DashboardShell({
  user,
  navItems,
  children,
}: {
  user: Pick<User, "name" | "email" | "avatar">;
  navItems?: NavItem[];
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-border-subtle bg-bg-secondary lg:block">
        <Link href="/" className="flex h-16 items-center gap-2 border-b border-border-subtle px-4">
          <Logo />
          <span className="text-sm font-semibold text-text-primary">VibeCode Academy</span>
        </Link>
        <SidebarNav items={navItems} />
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border-subtle bg-bg-secondary px-4 sm:px-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-sm font-semibold text-text-primary">VibeCode Academy</span>
          </Link>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 text-text-primary" aria-label="Mở menu">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)} aria-hidden />
          <div className="absolute left-0 top-0 flex h-full w-full max-w-xs flex-col bg-bg-secondary shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border-subtle px-4">
              <span className="text-sm font-semibold text-text-primary">{user.name}</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-text-secondary hover:text-text-primary" aria-label="Đóng menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarNav items={navItems} onNavigate={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

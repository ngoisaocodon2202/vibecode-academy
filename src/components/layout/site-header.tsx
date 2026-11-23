"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import type { User } from "@/generated/prisma";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/courses", label: "Khóa học" },
  { href: "/roadmap", label: "Lộ trình học" },
  { href: "/resources", label: "Tài nguyên" },
  { href: "/about", label: "Giới thiệu" },
];

export function SiteHeader({ user }: { user: Pick<User, "id" | "name" | "role"> | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-semibold text-text-primary">VibeCode Academy</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link href={user.role === "ADMIN" ? "/admin" : "/dashboard"}>
              <Button size="sm" variant="secondary">
                Vào học tập
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" variant="ghost">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Đăng ký</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="p-2 text-text-primary lg:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Mở menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col gap-6 bg-bg-secondary p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-text-primary">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary"
                aria-label="Đóng menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-white/5 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2">
              {user ? (
                <Link href={user.role === "ADMIN" ? "/admin" : "/dashboard"} className="w-full">
                  <Button variant="secondary" className="w-full">
                    Vào học tập
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <Button variant="secondary" className="w-full">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Đăng ký</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

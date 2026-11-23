import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const FOOTER_COLUMNS = [
  {
    title: "Sản phẩm",
    links: [
      { href: "/courses", label: "Khóa học" },
      { href: "/roadmap", label: "Lộ trình học" },
      { href: "/resources", label: "Tài nguyên" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { href: "/about", label: "Giới thiệu" },
      { href: "/contact", label: "Liên hệ" },
    ],
  },
  {
    title: "Pháp lý",
    links: [
      { href: "/terms", label: "Điều khoản sử dụng" },
      { href: "/privacy", label: "Chính sách bảo mật" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-base font-semibold text-text-primary">VibeCode Academy</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary">Learn AI. Build Anything.</p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-text-primary">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-sm text-text-secondary">
          © {new Date().getFullYear()} VibeCode Academy. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
}

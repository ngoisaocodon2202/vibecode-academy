import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Logo size={36} />
          <span className="text-lg font-semibold text-text-primary">VibeCode Academy</span>
        </Link>

        <div className="rounded-2xl border border-border-subtle bg-bg-card p-8 shadow-xl shadow-black/20">
          <h1 className="mb-1.5 text-2xl font-semibold text-text-primary">{title}</h1>
          <p className="mb-6 text-sm text-text-secondary">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

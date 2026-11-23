import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "success" | "warning" | "error" | "brand";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-text-secondary border-border-subtle",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  error: "bg-error/10 text-error border-error/30",
  brand: "bg-brand-blue/10 text-brand-blue border-brand-blue/30",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

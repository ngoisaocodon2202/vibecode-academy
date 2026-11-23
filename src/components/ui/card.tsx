import { cn } from "@/lib/utils/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-gradient-to-b from-bg-card to-bg-card/60 p-6 shadow-sm shadow-black/20",
        interactive &&
          "transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue/50 hover:shadow-xl hover:shadow-brand-blue/10 cursor-pointer active:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

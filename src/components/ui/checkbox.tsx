"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "peer h-5 w-5 shrink-0 appearance-none rounded-md border border-border-subtle bg-bg-card",
            "checked:border-brand-blue checked:bg-brand-blue",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40",
            "transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute h-3.5 w-3.5 scale-0 text-white transition-transform peer-checked:scale-100" />
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";

import type { ComponentProps } from "react";
import { cn } from "./utils";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning";

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-brand-600 text-white",
  secondary: "bg-brand-100 text-brand-900",
  outline: "border border-brand-300 text-brand-900",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

import type { ComponentProps } from "react";
import { cn } from "./utils";

type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500 disabled:hover:bg-brand-600",
  secondary:
    "bg-brand-100 text-brand-900 hover:bg-brand-200 focus-visible:ring-brand-500 disabled:hover:bg-brand-100",
  outline:
    "border border-brand-300 bg-transparent text-brand-900 hover:bg-brand-50 focus-visible:ring-brand-500 disabled:hover:bg-transparent",
  ghost:
    "text-brand-900 hover:bg-brand-50 focus-visible:ring-brand-500 disabled:hover:bg-transparent",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 disabled:hover:bg-red-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

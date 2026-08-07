import type { ComponentProps } from "react";
import { cn } from "./utils";

export interface TextareaProps extends ComponentProps<"textarea"> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500",
        "disabled:cursor-not-allowed disabled:opacity-60",
        invalid && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

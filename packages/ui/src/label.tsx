import type { ComponentProps } from "react";
import { cn } from "./utils";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-slate-900",
        "aria-disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

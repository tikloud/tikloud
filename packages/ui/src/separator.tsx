import type { ComponentProps } from "react";

import { cn } from "./utils";

export function Separator({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("border-slate-200", className)} {...props} />;
}

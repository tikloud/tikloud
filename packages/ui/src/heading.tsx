import type { ComponentProps } from "react";
import { cn } from "./utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<ComponentProps<"h1">, "level"> {
  level?: HeadingLevel;
}

const sizes: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-tight sm:text-5xl",
  2: "text-3xl font-bold tracking-tight",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold",
  5: "text-lg font-semibold",
  6: "text-base font-semibold",
};

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn("text-slate-900", sizes[level], className)} {...props} />;
}

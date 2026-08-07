import type { ComponentProps } from "react";

import { cn } from "./utils";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocProps extends ComponentProps<"nav"> {
  items: TocItem[];
}

export function Toc({ items, className, ...props }: TocProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn("hidden lg:block", className)}
      {...props}
    >
      <p className="text-sm font-semibold text-slate-900">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-slate-500 transition-colors hover:text-brand-700",
                item.level === 3 && "pl-4",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import Link from "next/link";
import type { ComponentProps } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "./utils";

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export interface BreadcrumbsProps extends ComponentProps<"nav"> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && "font-medium text-slate-900")}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

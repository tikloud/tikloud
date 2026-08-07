import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Cloud } from "lucide-react";

import { cn } from "./utils";

export type SiteHeaderLink = {
  href: string;
  label: string;
  variant?: "link" | "button";
};

export interface SiteHeaderProps extends Omit<ComponentProps<"header">, "children"> {
  brand?: ReactNode;
  navItems?: SiteHeaderLink[];
}

function DefaultBrand() {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
      <Cloud className="size-6 text-brand-600" />
      <span>Ti Kloud</span>
    </Link>
  );
}

export function SiteHeader({
  brand,
  navItems = [],
  className,
  ...props
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {brand ?? <DefaultBrand />}
        {navItems.length > 0 && (
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map(({ href, label, variant = "link" }) =>
              variant === "button" ? (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-white transition-colors hover:bg-brand-700"
                >
                  {label}
                </Link>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors hover:text-brand-700"
                >
                  {label}
                </Link>
              ),
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

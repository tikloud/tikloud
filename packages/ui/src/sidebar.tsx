import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Cloud } from "lucide-react";

import { cn } from "./utils";

export interface SidebarProps extends ComponentProps<"aside"> {
  brand?: ReactNode;
  footer?: ReactNode;
}

export function Sidebar({
  brand,
  footer,
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-64 flex-col border-r border-slate-200 bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 font-semibold">
        {brand ?? (
          <>
            <Cloud className="size-6 text-brand-600" />
            Ti Kloud
          </>
        )}
      </div>
      {children}
      {footer && <div className="border-t border-slate-200 p-4">{footer}</div>}
    </aside>
  );
}

export function SidebarNav({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      className={cn("flex flex-1 flex-col gap-1 p-4", className)}
      {...props}
    />
  );
}

export interface SidebarNavLinkProps extends Omit<
  ComponentProps<typeof Link>,
  "href"
> {
  href: string;
  icon?: ReactNode;
  active?: boolean;
}

export function SidebarNavLink({
  href,
  icon,
  active = false,
  className,
  children,
  ...props
}: SidebarNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-brand-50 text-brand-700"
          : "text-slate-600 hover:bg-brand-50 hover:text-brand-700",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
}

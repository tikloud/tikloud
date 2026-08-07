import Link from "next/link";

import { cn } from "@repo/ui";
import { Cloud, LayoutDashboard, Settings } from "@repo/ui/icons";

import { SignOutButton } from "@/components/sign-out-button";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  displayName,
  email,
}: {
  displayName: string;
  email: string;
}) {
  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 font-semibold">
        <Cloud className="size-6 text-brand-600" />
        Ti Kloud
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600",
              "transition-colors hover:bg-brand-50 hover:text-brand-700",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 px-3">
          <p className="truncate text-sm font-medium text-slate-900">{displayName}</p>
          <p className="truncate text-xs text-slate-500">{email}</p>
        </div>
        <SignOutButton />
      </div>
    </aside>
  );
}

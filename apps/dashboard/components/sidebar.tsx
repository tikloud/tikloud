"use client";

import { usePathname } from "next/navigation";

import { Sidebar, SidebarNav, SidebarNavLink } from "@repo/ui";
import { LayoutDashboard, Settings } from "@repo/ui/icons";

import { SignOutButton } from "@/components/sign-out-button";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
];

function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarNav>
      {navItems.map(({ href, label, icon: Icon }) => (
        <SidebarNavLink
          key={href}
          href={href}
          active={pathname === href}
          icon={<Icon className="size-4" />}
        >
          {label}
        </SidebarNavLink>
      ))}
    </SidebarNav>
  );
}

export function DashboardSidebar({
  displayName,
  email,
}: {
  displayName: string;
  email: string;
}) {
  return (
    <Sidebar
      footer={
        <div>
          <div className="mb-3 px-3">
            <p className="truncate text-sm font-medium text-slate-900">
              {displayName}
            </p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
          <SignOutButton />
        </div>
      }
    >
      <DashboardNav />
    </Sidebar>
  );
}

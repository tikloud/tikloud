"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, Menu, X } from "lucide-react";

import { Sidebar, SidebarNav, SidebarNavLink, cn } from "@repo/ui";

import type { NavSection } from "@/lib/content";

export function DocsSidebar({ nav }: { nav: NavSection[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-12 items-center gap-3 border-b border-slate-200 px-4 lg:hidden">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
          className="-ml-1 flex size-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu className="size-5" />
        </button>
        <span className="text-sm font-semibold text-slate-900">
          Ti Kloud Docs
        </span>
      </div>

      <Sidebar
        className={cn(
          "fixed inset-y-0 left-0 z-50 -translate-x-full transition-transform duration-200",
          "lg:inset-y-auto lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
          open && "translate-x-0",
        )}
        brand={
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Cloud className="size-6 text-brand-600" />
              <span>Ti Kloud Docs</span>
            </Link>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <X className="size-4" />
            </button>
          </div>
        }
      >
        <SidebarNav className="overflow-y-auto">
          {nav.map((section) => (
            <div key={section.id} className="mt-5 first:mt-0">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {section.title}
              </p>
              {section.docs.map((doc) => (
                <SidebarNavLink
                  key={doc.slug}
                  href={`/${doc.slug}`}
                  active={pathname === `/${doc.slug}`}
                  onClick={() => setOpen(false)}
                >
                  {doc.title}
                </SidebarNavLink>
              ))}
            </div>
          ))}
        </SidebarNav>
      </Sidebar>

      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        />
      )}
    </>
  );
}

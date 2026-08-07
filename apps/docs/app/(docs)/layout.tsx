import Link from "next/link";
import { Cloud } from "lucide-react";

import { SiteFooter, SiteHeader } from "@repo/ui";

import { DocsSidebar } from "@/components/docs-sidebar";
import { getNavTree } from "@/lib/content";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav = getNavTree();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        brand={
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Cloud className="size-6 text-brand-600" />
            <span>Ti Kloud Docs</span>
          </Link>
        }
      />
      <div className="flex flex-1 flex-col lg:flex-row">
        <DocsSidebar nav={nav} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}

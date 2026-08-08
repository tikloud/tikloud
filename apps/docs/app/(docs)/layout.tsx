import { SiteFooter } from "@repo/ui";

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
      <div className="flex flex-1 flex-col lg:flex-row">
        <DocsSidebar nav={nav} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}

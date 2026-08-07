import Link from "next/link";

import { ArrowLeft, ArrowRight } from "@repo/ui/icons";

import type { NavDoc } from "@/lib/content";

function DocLink({
  doc,
  direction,
}: {
  doc: NavDoc;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/${doc.slug}`}
      className={`group flex max-w-[45%] flex-col gap-1 rounded-lg p-2 transition-colors hover:bg-brand-50 ${
        isPrev ? "items-start" : "items-end text-right"
      }`}
    >
      <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        {isPrev ? <ArrowLeft className="size-3" /> : null}
        {isPrev ? "Previous" : "Next"}
        {!isPrev ? <ArrowRight className="size-3" /> : null}
      </span>
      <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">
        {doc.title}
      </span>
    </Link>
  );
}

export function DocFooter({
  prev,
  next,
}: {
  prev: NavDoc | null;
  next: NavDoc | null;
}) {
  return (
    <nav className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
      {prev ? <DocLink doc={prev} direction="prev" /> : <span aria-hidden />}
      {next ? <DocLink doc={next} direction="next" /> : <span aria-hidden />}
    </nav>
  );
}

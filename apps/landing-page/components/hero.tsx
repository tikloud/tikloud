import Link from "next/link";

import { cn } from "@repo/ui";
import { Heading } from "@repo/ui";
import { ArrowRight, Cloud } from "@repo/ui/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
          <Cloud className="size-4" />
          Ti Kloud — build &amp; ship
        </div>
        <Heading level={1} className="max-w-3xl text-balance">
          Cloud infrastructure, simplified for your team
        </Heading>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Ti Kloud brings your organization&apos;s apps together on one platform —
          authentication, databases, and dashboards that just work.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/waitlist"
            className={cn(
              "inline-flex h-12 items-center gap-2 rounded-lg bg-brand-600 px-6 text-base font-medium text-white transition-colors",
              "hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
            )}
          >
            Get early access
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/#features"
            className={cn(
              "inline-flex h-12 items-center gap-2 rounded-lg border border-brand-300 px-6 text-base font-medium text-slate-900 transition-colors",
              "hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
            )}
          >
            See what&apos;s inside
          </Link>
        </div>
      </div>
    </section>
  );
}

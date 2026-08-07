import Link from "next/link";

import { Cloud } from "@repo/ui/icons";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Cloud className="size-6 text-brand-600" />
          <span>Ti Kloud</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#features" className="transition-colors hover:text-brand-700">
            Features
          </Link>
          <Link
            href="/waitlist"
            className="rounded-lg bg-brand-600 px-4 py-2 text-white transition-colors hover:bg-brand-700"
          >
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}

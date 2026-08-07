import Link from "next/link";

import { Cloud } from "@repo/ui/icons";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-50 to-slate-50 px-4 py-12">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-xl font-semibold text-slate-900"
      >
        <Cloud className="size-7 text-brand-600" />
        Ti Kloud
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}

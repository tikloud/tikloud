import { requireUser } from "@repo/auth/server";
import { getOrCreateProfile, getProfile } from "@repo/db";

import { DashboardSidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();

  let profile = await getProfile(user.sub);
  if (!profile) {
    profile = await getOrCreateProfile(user.sub, user.email, user.name);
  }

  const displayName =
    profile.display_name ?? user.email?.split("@")[0] ?? "there";

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar displayName={displayName} email={user.email ?? ""} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

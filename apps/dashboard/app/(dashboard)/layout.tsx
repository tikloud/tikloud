import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/server";

import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .maybeSingle();

  const displayName =
    profile?.display_name ?? user.email?.split("@")[0] ?? "there";

  return (
    <div className="flex min-h-screen">
      <Sidebar displayName={displayName} email={user.email ?? ""} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

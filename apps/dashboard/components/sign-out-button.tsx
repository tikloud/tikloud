"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@repo/supabase/client";
import { Button } from "@repo/ui";
import { LogOut } from "@repo/ui/icons";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start text-slate-600 hover:text-red-600"
      onClick={handleSignOut}
    >
      <LogOut className="size-4" />
      Sign out
    </Button>
  );
}

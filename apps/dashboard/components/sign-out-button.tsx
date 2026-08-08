"use client";

import { Button } from "@repo/ui";
import { LogOut } from "@repo/ui/icons";

export function SignOutButton() {
  return (
    <form action="/auth/logout" method="POST">
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="w-full justify-start text-slate-600 hover:text-red-600"
      >
        <LogOut className="size-4" />
        Sign out
      </Button>
    </form>
  );
}

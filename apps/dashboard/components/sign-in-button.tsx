"use client";

import { Button } from "@repo/ui";

export function SignInButton({ next }: { next: string }) {
  return (
    <Button
      className="w-full"
      onClick={() => {
        window.location.assign(`/auth/login?next=${encodeURIComponent(next)}`);
      }}
    >
      Sign in with Ti Kloud
    </Button>
  );
}

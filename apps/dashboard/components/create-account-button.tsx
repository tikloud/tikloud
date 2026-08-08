"use client";

import { Button } from "@repo/ui";

export function CreateAccountButton() {
  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={() => {
        window.location.assign("/auth/login?mode=register");
      }}
    >
      Create account
    </Button>
  );
}

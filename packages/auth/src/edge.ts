import type { NextRequest } from "next/server";

import { SESSION_COOKIE_NAME, verifySession } from "./session";

export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) {
    return false;
  }
  const payload = await verifySession(raw);
  return payload !== null;
}

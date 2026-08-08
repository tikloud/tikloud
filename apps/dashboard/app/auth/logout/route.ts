import { NextResponse } from "next/server";

import {
  SESSION_COOKIE_NAME,
  buildLogoutUrl,
  getSessionPayload,
} from "@repo/auth/server";

export async function POST() {
  const session = await getSessionPayload();
  const logoutUrl = await buildLogoutUrl(session?.idToken ?? undefined);

  const response = NextResponse.redirect(logoutUrl);
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

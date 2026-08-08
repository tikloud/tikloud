import { NextResponse, type NextRequest } from "next/server";

import { buildAuthorizationUrl } from "@repo/auth/server";

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next");
  const mode =
    request.nextUrl.searchParams.get("mode") === "register"
      ? "register"
      : "login";

  const { url, oidcCookie } = await buildAuthorizationUrl({ next, mode });

  const response = NextResponse.redirect(url);
  response.cookies.set(oidcCookie);
  return response;
}

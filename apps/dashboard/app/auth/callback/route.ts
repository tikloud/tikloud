import { NextResponse, type NextRequest } from "next/server";

import { OIDC_COOKIE_NAME, completeAuthentication } from "@repo/auth/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const result = await completeAuthentication({
    code,
    state,
    error,
    oidcCookie: request.cookies.get(OIDC_COOKIE_NAME)?.value ?? null,
  });

  if (!result.ok) {
    const failure = NextResponse.redirect(`${origin}/login?error=auth`);
    failure.cookies.delete(OIDC_COOKIE_NAME);
    return failure;
  }

  const response = NextResponse.redirect(`${origin}${result.next}`);
  response.cookies.set(result.sessionCookie);
  response.cookies.delete(OIDC_COOKIE_NAME);
  return response;
}

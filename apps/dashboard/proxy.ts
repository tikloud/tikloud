import { NextResponse, type NextRequest } from "next/server";

import { isAuthenticated } from "@repo/auth/edge";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authenticated = await isAuthenticated(request);

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isOidcRoute = pathname.startsWith("/auth/");

  if (!authenticated && !isAuthRoute && !isOidcRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

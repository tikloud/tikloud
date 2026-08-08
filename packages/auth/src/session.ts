import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "tikloud.session";
export const OIDC_COOKIE_NAME = "tikloud.oidc";

export const SESSION_TTL_SECONDS = 60 * 60 * 8;
export const OIDC_TTL_SECONDS = 60 * 10;

export interface SessionCookieOptions {
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
  path: string;
  maxAge: number;
}

export interface SessionUser {
  sub: string;
  email: string | null;
  name: string | null;
}

export interface SessionPayload extends SessionUser {
  idToken?: string;
}

export interface OidcStatePayload {
  state: string;
  codeVerifier: string;
  next: string;
}

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export function cookieOptions(maxAge: number): SessionCookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    idToken: payload.idToken,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS)
    .sign(getSecretKey());
}

export async function verifySession(
  raw: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(raw, getSecretKey(), {
      algorithms: ["HS256"],
    });
    if (!payload.sub) {
      return null;
    }
    return {
      sub: payload.sub,
      email: typeof payload.email === "string" ? payload.email : null,
      name: typeof payload.name === "string" ? payload.name : null,
      idToken:
        typeof payload.idToken === "string" ? payload.idToken : undefined,
    };
  } catch {
    return null;
  }
}

export async function signOidcState(
  payload: OidcStatePayload,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + OIDC_TTL_SECONDS)
    .sign(getSecretKey());
}

export async function verifyOidcState(
  raw: string,
): Promise<OidcStatePayload | null> {
  try {
    const { payload } = await jwtVerify(raw, getSecretKey(), {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.state !== "string" ||
      typeof payload.codeVerifier !== "string" ||
      typeof payload.next !== "string"
    ) {
      return null;
    }
    return {
      state: payload.state,
      codeVerifier: payload.codeVerifier,
      next: payload.next,
    };
  } catch {
    return null;
  }
}

export function sanitizeNext(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }
  return next;
}

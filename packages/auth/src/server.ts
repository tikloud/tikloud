import { randomBytes, randomUUID } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generators, Issuer, type Client } from "openid-client";

import {
  OIDC_COOKIE_NAME,
  OIDC_TTL_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  cookieOptions,
  sanitizeNext,
  signOidcState,
  signSession,
  verifyOidcState,
  verifySession,
  type OidcStatePayload,
  type SessionCookieOptions,
  type SessionPayload,
  type SessionUser,
} from "./session";

export type { SessionPayload, SessionUser } from "./session";

export { SESSION_COOKIE_NAME, OIDC_COOKIE_NAME } from "./session";

interface Config {
  keycloakUrl?: string;
  realm?: string;
  clientId?: string;
  clientSecret?: string;
  authUrl?: string;
}

function getConfig(): Config {
  return {
    keycloakUrl: process.env.KEYCLOAK_URL,
    realm: process.env.KEYCLOAK_REALM,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    authUrl: process.env.AUTH_URL,
  };
}

function redirectUri(): string {
  const { authUrl } = getConfig();
  if (!authUrl) {
    throw new Error("AUTH_URL is not set");
  }
  return `${authUrl}/auth/callback`;
}

let cachedClient: Promise<Client> | null = null;

function getClient(): Promise<Client> {
  if (!cachedClient) {
    cachedClient = (async () => {
      const { keycloakUrl, realm, clientId, clientSecret } = getConfig();
      if (!keycloakUrl || !realm || !clientId || !clientSecret) {
        throw new Error(
          "KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID and KEYCLOAK_CLIENT_SECRET must be set",
        );
      }
      const issuer = await Issuer.discover(`${keycloakUrl}/realms/${realm}`);
      return new issuer.Client({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uris: [redirectUri()],
        response_types: ["code"],
      });
    })();
  }
  return cachedClient;
}

export interface LoginRedirect {
  url: string;
  oidcCookie: {
    name: string;
    value: string;
    options: SessionCookieOptions;
  };
}

export async function buildAuthorizationUrl({
  next,
  mode = "login",
}: {
  next: string | null;
  mode?: "login" | "register";
}): Promise<LoginRedirect> {
  const client = await getClient();

  const state = `${randomUUID()}-${randomBytes(12).toString("hex")}`;
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  const oidcPayload: OidcStatePayload = {
    state,
    codeVerifier,
    next: sanitizeNext(next),
  };
  const oidcToken = await signOidcState(oidcPayload);

  let url = client.authorizationUrl({
    scope: "openid email profile",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  if (mode === "register") {
    url = url.replace(
      "/protocol/openid-connect/auth",
      "/protocol/openid-connect/registrations",
    );
  }

  return {
    url,
    oidcCookie: {
      name: OIDC_COOKIE_NAME,
      value: oidcToken,
      options: cookieOptions(OIDC_TTL_SECONDS),
    },
  };
}

export type AuthenticationResult =
  | {
      ok: true;
      next: string;
      sessionCookie: {
        name: string;
        value: string;
        options: SessionCookieOptions;
      };
    }
  | { ok: false };

export async function completeAuthentication({
  code,
  state,
  error,
  oidcCookie,
}: {
  code: string | null;
  state: string | null;
  error: string | null;
  oidcCookie: string | null;
}): Promise<AuthenticationResult> {
  if (error || !code || !state || !oidcCookie) {
    return { ok: false };
  }

  const oidcState = await verifyOidcState(oidcCookie);
  if (!oidcState || oidcState.state !== state) {
    return { ok: false };
  }

  try {
    const client = await getClient();
    const tokenSet = await client.callback(
      redirectUri(),
      { code },
      { state, code_verifier: oidcState.codeVerifier },
    );

    const claims = tokenSet.claims();
    const sub = typeof claims.sub === "string" ? claims.sub : "";
    if (!sub) {
      return { ok: false };
    }

    const sessionPayload: SessionPayload = {
      sub,
      email: typeof claims.email === "string" ? claims.email : null,
      name: typeof claims.name === "string" ? claims.name : null,
      idToken: tokenSet.id_token,
    };
    const sessionValue = await signSession(sessionPayload);

    return {
      ok: true,
      next: oidcState.next,
      sessionCookie: {
        name: SESSION_COOKIE_NAME,
        value: sessionValue,
        options: cookieOptions(SESSION_TTL_SECONDS),
      },
    };
  } catch {
    return { ok: false };
  }
}

export async function getSessionPayload(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) {
    return null;
  }
  return verifySession(raw);
}

export async function getSession(): Promise<SessionUser | null> {
  const payload = await getSessionPayload();
  if (!payload) {
    return null;
  }
  return { sub: payload.sub, email: payload.email, name: payload.name };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getSession();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function buildLogoutUrl(idToken?: string): Promise<string> {
  const client = await getClient();
  const params: Record<string, string> = {};
  if (idToken) {
    params.id_token_hint = idToken;
  }
  if (getConfig().authUrl) {
    params.post_logout_redirect_uri = `${getConfig().authUrl}/login`;
  }
  return client.endSessionUrl(params);
}

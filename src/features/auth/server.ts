import { NextResponse } from "next/server";
import type { AuthTokens } from "./types";

export const ACCESS_TOKEN_COOKIE = "balto_access_token";
export const REFRESH_TOKEN_COOKIE = "balto_refresh_token";

const refreshTokenMaxAgeSeconds = 60 * 60 * 24 * 7;

export function getBackendUrl(path: string) {
  const baseUrl = process.env.BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error("BACKEND_API_URL is not configured.");
  }

  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBaseUrl}${cleanPath}`;
}

export function setAuthCookies(response: NextResponse, tokens: AuthTokens) {
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: new Date(tokens.expiresAt),
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: refreshTokenMaxAgeSeconds,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}

export async function refreshAuthTokens(refreshToken: string) {
  const response = await fetch(getBackendUrl("/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AuthTokens;
}

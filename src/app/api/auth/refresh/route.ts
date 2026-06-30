import { NextRequest, NextResponse } from "next/server";
import {
  clearAuthCookies,
  REFRESH_TOKEN_COOKIE,
  refreshAuthTokens,
  setAuthCookies,
} from "@/features/auth/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    const response = NextResponse.json(
      { error: "Sesion expirada.", code: "SESSION_EXPIRED" },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  const tokens = await refreshAuthTokens(refreshToken);

  if (!tokens) {
    const response = NextResponse.json(
      { error: "Sesion expirada.", code: "SESSION_EXPIRED" },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  const response = NextResponse.json({ ok: true });
  setAuthCookies(response, tokens);
  return response;
}

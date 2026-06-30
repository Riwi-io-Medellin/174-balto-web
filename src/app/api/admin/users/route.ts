import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  clearAuthCookies,
  getBackendUrl,
  REFRESH_TOKEN_COOKIE,
  refreshAuthTokens,
  setAuthCookies,
} from "@/features/auth/server";
import { tokenHasAdminRole } from "@/features/auth/token";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  let activeAccessToken = accessToken;
  let usersResponse = activeAccessToken && tokenHasAdminRole(activeAccessToken)
    ? await getUsersWithToken(activeAccessToken)
    : null;
  let refreshed = false;

  if (usersResponse?.status === 401 && refreshToken) {
    const tokens = await refreshAuthTokens(refreshToken);

    if (tokens && tokenHasAdminRole(tokens.accessToken)) {
      refreshed = true;
      activeAccessToken = tokens.accessToken;
      usersResponse = await getUsersWithToken(tokens.accessToken);
      const response = await proxyUsersResponse(usersResponse);
      setAuthCookies(response, tokens);
      return response;
    }
  }

  if (!usersResponse && refreshToken) {
    const tokens = await refreshAuthTokens(refreshToken);

    if (tokens && tokenHasAdminRole(tokens.accessToken)) {
      refreshed = true;
      activeAccessToken = tokens.accessToken;
      usersResponse = await getUsersWithToken(tokens.accessToken);
      const response = await proxyUsersResponse(usersResponse);
      setAuthCookies(response, tokens);
      return response;
    }
  }

  if (activeAccessToken && !tokenHasAdminRole(activeAccessToken)) {
    return NextResponse.json(
      { error: "Se requiere rol administrador.", code: "ADMIN_ROLE_REQUIRED" },
      { status: 403 },
    );
  }

  if (!usersResponse || usersResponse.status === 401) {
    const response = NextResponse.json(
      { error: "Sesion expirada.", code: "SESSION_EXPIRED" },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  const response = await proxyUsersResponse(usersResponse);
  if (refreshed) {
    response.headers.set("x-balto-session", "refreshed");
  }
  return response;
}

function getUsersWithToken(accessToken: string) {
  return fetch(getBackendUrl("/users/"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
}

async function proxyUsersResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(
    { error: "Respuesta inesperada del backend.", code: "UNEXPECTED_RESPONSE" },
    { status: response.ok ? 502 : response.status },
  );
}

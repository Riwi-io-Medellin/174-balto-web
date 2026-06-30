import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  clearAuthCookies,
  getBackendUrl,
  REFRESH_TOKEN_COOKIE,
  refreshAuthTokens,
  setAuthCookies,
} from "@/features/auth/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  let usersResponse = accessToken
    ? await getUsersWithToken(accessToken)
    : null;
  let refreshed = false;

  if (usersResponse?.status === 401 && refreshToken) {
    const tokens = await refreshAuthTokens(refreshToken);

    if (tokens) {
      refreshed = true;
      usersResponse = await getUsersWithToken(tokens.accessToken);
      const response = await proxyUsersResponse(usersResponse);
      setAuthCookies(response, tokens);
      return response;
    }
  }

  if (!usersResponse && refreshToken) {
    const tokens = await refreshAuthTokens(refreshToken);

    if (tokens) {
      refreshed = true;
      usersResponse = await getUsersWithToken(tokens.accessToken);
      const response = await proxyUsersResponse(usersResponse);
      setAuthCookies(response, tokens);
      return response;
    }
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

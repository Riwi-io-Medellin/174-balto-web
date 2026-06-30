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

type BackendInit = {
  method?: string;
  body?: string;
};

export async function proxyBackendJson(
  request: NextRequest,
  path: string,
  init: BackendInit = {},
) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  const backendPath = path.includes("?") ? path : `${path}${request.nextUrl.search}`;

  let activeAccessToken = accessToken;
  let backendResponse = activeAccessToken && tokenHasAdminRole(activeAccessToken)
    ? await fetchBackendJson(backendPath, activeAccessToken, init)
    : null;

  if ((!backendResponse || backendResponse.status === 401) && refreshToken) {
    const tokens = await refreshAuthTokens(refreshToken);

    if (tokens && tokenHasAdminRole(tokens.accessToken)) {
      activeAccessToken = tokens.accessToken;
      backendResponse = await fetchBackendJson(backendPath, tokens.accessToken, init);
      const response = await toJsonResponse(backendResponse);
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

  if (!backendResponse || backendResponse.status === 401) {
    const response = NextResponse.json(
      { error: "Sesion expirada.", code: "SESSION_EXPIRED" },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  return toJsonResponse(backendResponse);
}

function fetchBackendJson(path: string, accessToken: string, init: BackendInit) {
  return fetch(getBackendUrl(path), {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: init.body,
    cache: "no-store",
  });
}

async function toJsonResponse(response: Response) {
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

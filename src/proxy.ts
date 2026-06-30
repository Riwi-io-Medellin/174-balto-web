import { NextResponse, type NextRequest } from "next/server";

const ACCESS_TOKEN_COOKIE = "balto_access_token";
const REFRESH_TOKEN_COOKIE = "balto_refresh_token";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE);
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE);

  if (pathname.startsWith("/dashboard") && !hasAccessToken && !hasRefreshToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && (hasAccessToken || hasRefreshToken)) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};

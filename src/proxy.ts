import { NextResponse, type NextRequest } from "next/server";
import { tokenHasAdminRole } from "@/features/auth/token";

const ACCESS_TOKEN_COOKIE = "balto_access_token";
const REFRESH_TOKEN_COOKIE = "balto_refresh_token";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE);
  const isAdmin = accessToken ? tokenHasAdminRole(accessToken) : false;

  if (pathname.startsWith("/dashboard") && !isAdmin) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    if (accessToken || hasRefreshToken) {
      loginUrl.searchParams.set("error", "admin_required");
    }
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && isAdmin) {
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

import { NextRequest, NextResponse } from "next/server";
import {
  clearAuthCookies,
  getBackendUrl,
  REFRESH_TOKEN_COOKIE,
} from "@/features/auth/server";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (refreshToken) {
    await fetch(getBackendUrl("/auth/logout"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }).catch(() => undefined);
  }

  const response = NextResponse.json({ ok: true });
  clearAuthCookies(response);
  return response;
}

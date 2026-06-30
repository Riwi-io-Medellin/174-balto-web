import { NextResponse } from "next/server";
import { getBackendUrl, setAuthCookies } from "@/features/auth/server";
import type { AuthErrorResponse, AuthTokens } from "@/features/auth/types";

export async function POST(request: Request) {
  try {
    const credentials = await request.json();
    const backendResponse = await fetch(getBackendUrl("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });

    if (!backendResponse.ok) {
      const fallback: AuthErrorResponse = {
        error: "Credenciales invalidas.",
        code: "LOGIN_FAILED",
      };
      const error = await readJsonOrFallback(backendResponse, fallback);
      return NextResponse.json(error, { status: backendResponse.status });
    }

    const tokens = (await backendResponse.json()) as AuthTokens;
    const response = NextResponse.json({ ok: true });
    setAuthCookies(response, tokens);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message.includes("BACKEND_API_URL")) {
      return NextResponse.json(
        {
          error: "BACKEND_API_URL no esta configurada.",
          code: "API_URL_NOT_CONFIGURED",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: "No fue posible conectar con el backend de autenticacion.",
        code: "AUTH_SERVICE_UNAVAILABLE",
      },
      { status: 503 },
    );
  }
}

async function readJsonOrFallback<T>(response: Response, fallback: T) {
  try {
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

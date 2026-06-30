import type { User } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function listUsers() {
  const response = await fetch("/api/admin/users", {
    cache: "no-store",
  });

  if (!response.ok) {
    const fallback = {
      error: "No fue posible cargar usuarios.",
      code: response.status === 401 ? "SESSION_EXPIRED" : "USERS_FETCH_FAILED",
    };
    const error = await readJsonOrFallback(response, fallback);
    throw new ApiError(error.error, error.code, response.status);
  }

  return (await response.json()) as User[];
}

async function readJsonOrFallback<T>(response: Response, fallback: T) {
  try {
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

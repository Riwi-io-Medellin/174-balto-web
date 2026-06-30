import { ApiError } from "@/features/users/api";
import type {
  BusinessVerification,
  VerificationStatus,
  WalkerVerification,
} from "./types";

export function listBusinessVerifications() {
  return fetchJson<BusinessVerification[]>("/api/admin/verification/businesses");
}

export function listWalkerVerifications() {
  return fetchJson<WalkerVerification[]>("/api/admin/verification/walkers");
}

export function updateBusinessVerificationStatus(
  businessId: string,
  verificationStatus: VerificationStatus,
) {
  return fetchJson<BusinessVerification>(
    `/api/admin/verification/businesses/${businessId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ verificationStatus }),
    },
  );
}

export function updateWalkerVerificationStatus(
  walkerId: string,
  verificationStatus: VerificationStatus,
) {
  return fetchJson<WalkerVerification>(
    `/api/admin/verification/walkers/${walkerId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ verificationStatus }),
    },
  );
}

async function fetchJson<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const fallback = {
      error: "No fue posible completar la accion.",
      code: response.status === 401 ? "SESSION_EXPIRED" : "REQUEST_FAILED",
    };
    const error = await readJsonOrFallback(response, fallback);
    throw new ApiError(error.error, error.code, response.status);
  }

  return (await response.json()) as T;
}

async function readJsonOrFallback<T>(response: Response, fallback: T) {
  try {
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

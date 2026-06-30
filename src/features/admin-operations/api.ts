import { ApiError } from "@/features/users/api";
import type {
  AdminAuditLog,
  AdminCommunityAlert,
  AdminFilters,
  AdminUser,
  AdminWalker,
  AlertStatus,
  EntityAction,
} from "./types";

export function listAdminUsers(filters: AdminFilters) {
  return fetchJson<AdminUser[]>(`/api/admin/operations/users${toQuery(filters, ["search", "status", "role", "from", "to"])}`);
}

export function listAdminWalkers(filters: AdminFilters) {
  return fetchJson<AdminWalker[]>(`/api/admin/operations/walkers${toQuery(filters, ["search", "status", "verificationStatus", "from", "to"])}`);
}

export function listAdminAlerts(filters: AdminFilters) {
  return fetchJson<AdminCommunityAlert[]>(`/api/admin/operations/alerts${toQuery(filters, ["search", "status", "alertType", "from", "to"])}`);
}

export function listAdminAuditLogs() {
  return fetchJson<AdminAuditLog[]>("/api/admin/operations/audit?take=25");
}

export function updateAdminUser(
  userId: string,
  action: EntityAction,
  reason: string,
  confirmImpact: boolean,
) {
  return fetchJson<AdminUser>(`/api/admin/operations/users/${userId}/action`, {
    method: "PATCH",
    body: JSON.stringify({ action, reason, confirmImpact }),
  });
}

export function updateAdminWalker(
  walkerId: string,
  action: EntityAction,
  reason: string,
  confirmImpact: boolean,
) {
  return fetchJson<AdminWalker>(`/api/admin/operations/walkers/${walkerId}/action`, {
    method: "PATCH",
    body: JSON.stringify({ action, reason, confirmImpact }),
  });
}

export function moderateAdminAlert(
  alertId: string,
  status: AlertStatus,
  reason: string,
  expectedUpdatedAt: string,
  confirmImpact: boolean,
) {
  return fetchJson<AdminCommunityAlert>(
    `/api/admin/operations/alerts/${alertId}/moderation`,
    {
      method: "PATCH",
      body: JSON.stringify({ status, reason, expectedUpdatedAt, confirmImpact }),
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
      error: "No fue posible completar la operacion.",
      code: response.status === 401 ? "SESSION_EXPIRED" : "ADMIN_OPERATION_FAILED",
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

function toQuery(filters: AdminFilters, keys: Array<keyof AdminFilters>) {
  const params = new URLSearchParams();

  for (const key of keys) {
    const value = filters[key];
    if (value) params.set(key, value);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function tokenHasAdminRole(token: string) {
  const [, payload] = token.split(".");
  if (!payload) return false;

  try {
    const decodedPayload = JSON.parse(decodeBase64Url(payload)) as Record<string, unknown>;
    const roleClaim =
      decodedPayload.role ??
      decodedPayload.roles ??
      decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

    return roles.some(
      (role) => typeof role === "string" && role.toLowerCase() === "admin",
    );
  } catch {
    return false;
  }
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

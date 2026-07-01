const defaultAdminEmails = ["admin@balto.io"];

export function tokenHasAdminAccess(token: string) {
  return tokenHasAdminRole(token) || tokenHasAdminEmail(token);
}

export function tokenHasAdminRole(token: string) {
  const decodedPayload = decodeTokenPayload(token);
  if (!decodedPayload) return false;

  const roleClaim =
    decodedPayload.role ??
    decodedPayload.roles ??
    decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

  return roles.some(
    (role) => typeof role === "string" && role.toLowerCase() === "admin",
  );
}

function tokenHasAdminEmail(token: string) {
  const decodedPayload = decodeTokenPayload(token);
  if (!decodedPayload) return false;

  const emailClaim =
    decodedPayload.email ??
    decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  if (typeof emailClaim !== "string") return false;

  return getAdminEmails().includes(emailClaim.toLowerCase());
}

function decodeTokenPayload(token: string) {
  const [, payload] = token.split(".");
  if (!payload) return null;

  try {
    return JSON.parse(decodeBase64Url(payload)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getAdminEmails() {
  const configuredEmails = process.env.DASHBOARD_ADMIN_EMAILS
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return configuredEmails?.length ? configuredEmails : defaultAdminEmails;
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

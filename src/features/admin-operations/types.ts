export type AdminStatus = "active" | "suspended" | "deleted";
export type RiskLevel = "low" | "medium" | "high";
export type EntityAction = "suspend" | "reactivate" | "delete";
export type AlertStatus = "active" | "under_review" | "resolved" | "dismissed" | "false_report";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string | null;
  role: "user" | "walker";
  status: AdminStatus;
  riskLevel: RiskLevel;
  createdAt: string;
};

export type AdminWalker = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  workLocation: string | null;
  verificationStatus: string;
  status: AdminStatus;
  riskLevel: RiskLevel;
  isAcceptingBookings: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminCommunityAlert = {
  id: string;
  reporterUserId: string;
  reporterName: string;
  alertType: "lost" | "found" | string;
  petName: string;
  species: string | null;
  description: string;
  lastSeenLocation: string | null;
  evidenceUrl: string | null;
  status: AlertStatus;
  riskLevel: RiskLevel;
  moderationReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminAuditLog = {
  id: string;
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  reason: string;
  createdAt: string;
};

export type AdminFilters = {
  search: string;
  status: string;
  role: string;
  alertType: string;
  verificationStatus: string;
  from: string;
  to: string;
};

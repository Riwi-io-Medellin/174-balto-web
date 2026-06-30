import type { VerificationStatus } from "../types";

const labels: Record<VerificationStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
};

const styles: Record<VerificationStatus, string> = {
  pending: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  rejected: "border-red-400/30 bg-red-400/10 text-red-200",
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  return (
    <span className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

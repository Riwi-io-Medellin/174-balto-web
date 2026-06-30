import type { VerificationStatus } from "../types";

const actions: Array<{ label: string; status: VerificationStatus }> = [
  { label: "Aprobar", status: "approved" },
  { label: "Pendiente", status: "pending" },
  { label: "Rechazar", status: "rejected" },
];

export function StatusActions({
  currentStatus,
  disabled,
  onChange,
}: {
  currentStatus: VerificationStatus;
  disabled: boolean;
  onChange: (status: VerificationStatus) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.status}
          type="button"
          disabled={disabled || currentStatus === action.status}
          onClick={() => onChange(action.status)}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

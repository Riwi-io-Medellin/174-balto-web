import type { VerificationStatus } from "../types";

const actions: Array<{ label: string; status: VerificationStatus }> = [
  { label: "Aprobar", status: "approved" },
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
          className={
            action.status === "approved"
              ? "rounded-md bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-45"
              : "rounded-md border border-red-400/30 bg-red-400/10 px-3.5 py-2 text-xs font-semibold text-red-100 transition hover:border-red-300/50 hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-45"
          }
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

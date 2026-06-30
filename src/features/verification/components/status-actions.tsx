import { useLanguage, type TranslationKey } from "@/features/i18n";
import type { VerificationStatus } from "../types";

const actions: Array<{ labelKey: TranslationKey; status: VerificationStatus }> = [
  { labelKey: "verification.approve", status: "approved" },
  { labelKey: "verification.reject", status: "rejected" },
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
  const { t } = useLanguage();

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
              ? "rounded-2xl bg-[#68d391] px-4 py-2 text-xs font-black text-[#153f2a] transition hover:-translate-y-0.5 hover:bg-[#4fc47b] disabled:cursor-not-allowed disabled:opacity-45"
              : "rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-2 text-xs font-black text-[#b91c1c] transition hover:-translate-y-0.5 hover:border-[#fca5a5] hover:bg-[#ffe4e6] disabled:cursor-not-allowed disabled:opacity-45"
          }
        >
          {t(action.labelKey)}
        </button>
      ))}
    </div>
  );
}

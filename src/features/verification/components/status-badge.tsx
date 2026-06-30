import { useLanguage, type TranslationKey } from "@/features/i18n";
import type { VerificationStatus } from "../types";

const labels: Record<VerificationStatus, TranslationKey> = {
  pending: "verification.pending",
  approved: "verification.approved",
  rejected: "verification.rejected",
};

const styles: Record<VerificationStatus, string> = {
  pending: "border-[#f6c86a]/45 bg-[#fff7e6] text-[#8d5b13]",
  approved: "border-[#68d391]/45 bg-[#eafbf0] text-[#2f8a5b]",
  rejected: "border-[#fecaca] bg-[#fff1f2] text-[#b91c1c]",
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  const { t } = useLanguage();

  return (
    <span className={`rounded-2xl border px-3 py-1.5 text-xs font-black ${styles[status]}`}>
      {t(labels[status])}
    </span>
  );
}

"use client";

import { useState } from "react";
import { ClipboardList, ShieldCheck } from "lucide-react";
import { AdminOperationsPanel } from "@/features/admin-operations";
import { useLanguage } from "@/features/i18n";
import { VerificationPanel } from "@/features/verification/components/verification-panel";

type DashboardTab = "operations" | "verification";

export function DashboardOverview() {
  const { language, t } = useLanguage();
  const copy = language === "en"
    ? {
        operations: "Operations",
        verification: "Verification",
      }
    : {
        operations: "Operacion",
        verification: "Verificacion",
      };
  const [activeTab, setActiveTab] = useState<DashboardTab>("operations");

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-white bg-white p-2 shadow-sm">
        <DashboardTabButton
          active={activeTab === "operations"}
          icon={ClipboardList}
          label={copy.operations}
          onClick={() => setActiveTab("operations")}
        />
        <DashboardTabButton
          active={activeTab === "verification"}
          icon={ShieldCheck}
          label={t("dashboard.verificationTab")}
          onClick={() => setActiveTab("verification")}
        />
      </div>

      {activeTab === "verification" ? <VerificationPanel /> : <AdminOperationsPanel />}
    </section>
  );
}

function DashboardTabButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof ClipboardList;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-black transition ${
        active
          ? "bg-[#6d7cff] text-white shadow-lg shadow-[#6d7cff]/18"
          : "text-[#687280] hover:bg-[#eef1ff] hover:text-[#16215c]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

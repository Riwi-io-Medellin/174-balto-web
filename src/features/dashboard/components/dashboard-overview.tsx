"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Users2 } from "lucide-react";
import { useLanguage } from "@/features/i18n";
import { ApiError, listUsers } from "@/features/users/api";
import { UsersTable } from "@/features/users/components/users-table";
import { VerificationPanel } from "@/features/verification/components/verification-panel";
import type { User } from "@/features/users/types";

type DashboardTab = "users" | "verification";

export function DashboardOverview() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DashboardTab>("users");
  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: listUsers,
  });
  const users = usersQuery.data;
  const visibleUsers = users ?? [];
  const metrics = useMemo(() => getUserMetrics(users ?? []), [users]);

  useEffect(() => {
    if (usersQuery.error instanceof ApiError && usersQuery.error.code === "SESSION_EXPIRED") {
      router.replace("/login?next=/dashboard");
    }
  }, [router, usersQuery.error]);

  return (
    <section className="space-y-6">
      <div className="rounded-[1.7rem] border border-white bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#6d7cff]">
          {t("dashboard.eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-black text-[#16215c]">
          {t("dashboard.title")}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#687280]">
          {t("dashboard.description")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-white bg-white p-2 shadow-sm">
        <DashboardTabButton
          active={activeTab === "users"}
          icon={Users2}
          label={t("dashboard.usersTab")}
          onClick={() => setActiveTab("users")}
        />
        <DashboardTabButton
          active={activeTab === "verification"}
          icon={ShieldCheck}
          label={t("dashboard.verificationTab")}
          onClick={() => setActiveTab("verification")}
        />
      </div>

      {activeTab === "verification" ? (
        <VerificationPanel />
      ) : (
        <section className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard label={t("dashboard.metricUsers")} value={metrics.total} />
            <MetricCard label={t("dashboard.metricNewMonth")} value={metrics.newThisMonth} />
            <MetricCard label={t("dashboard.metricWithLocation")} value={metrics.withLocation} />
            <MetricCard label={t("dashboard.metricWithPhoto")} value={metrics.withPhoto} />
          </div>

          <section className="rounded-[1.7rem] border border-white bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-xl font-black text-[#16215c]">
                {t("dashboard.usersTitle")}
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#687280]">
                {t("dashboard.usersDescription")}
              </p>
            </div>

            {usersQuery.isPending ? (
              <DashboardLoading />
            ) : usersQuery.isError ? (
              <DashboardError />
            ) : (
              <UsersTable users={visibleUsers} />
            )}
          </section>
        </section>
      )}
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
  icon: typeof Users2;
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

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm">
      <p className="text-3xl font-black text-[#16215c]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[#687280]">{label}</p>
    </article>
  );
}

function DashboardLoading() {
  const { t } = useLanguage();

  return (
    <div className="rounded-[1.5rem] border border-[#e5e7eb] bg-[#fbfcff] p-6 text-sm font-semibold text-[#687280]">
      {t("common.loading")}...
    </div>
  );
}

function DashboardError() {
  const { t } = useLanguage();

  return (
    <div className="rounded-[1.5rem] border border-[#fecaca] bg-[#fff1f2] p-6">
      <h3 className="text-lg font-black text-[#b91c1c]">
        {t("dashboard.loadErrorTitle")}
      </h3>
      <p className="mt-2 text-sm font-semibold text-[#b91c1c]/80">
        {t("dashboard.genericRetry")}
      </p>
    </div>
  );
}

function getUserMetrics(users: User[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return {
    total: users.length,
    newThisMonth: users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
    }).length,
    withLocation: users.filter((user) => Boolean(user.location || user.address)).length,
    withPhoto: users.filter((user) => Boolean(user.photoUrl)).length,
  };
}

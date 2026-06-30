"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Activity, MapPin, PawPrint, ShieldCheck, Users2 } from "lucide-react";
import { VerificationPanel } from "@/features/verification/components/verification-panel";
import { ApiError, listUsers } from "@/features/users/api";
import { UsersTable } from "@/features/users/components/users-table";
import { useLanguage, type TranslationKey } from "@/features/i18n";

type DashboardTab = "users" | "verification";

export function DashboardOverview() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DashboardTab>("users");
  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: listUsers,
  });

  useEffect(() => {
    if (
      usersQuery.error instanceof ApiError &&
      usersQuery.error.code === "SESSION_EXPIRED"
    ) {
      router.replace("/login?next=/dashboard");
    }
  }, [router, usersQuery.error]);

  if (usersQuery.isPending) {
    return <DashboardLoading />;
  }

  if (usersQuery.isError) {
    return (
      <section className="rounded-[1.7rem] border border-[#fecaca] bg-[#fff1f2] p-6 shadow-sm">
        <h2 className="text-lg font-black text-[#b91c1c]">
          {t("dashboard.loadErrorTitle")}
        </h2>
        <p className="mt-2 text-sm font-semibold text-[#b91c1c]/80">
          {t("dashboard.genericRetry")}
        </p>
        <button
          type="button"
          onClick={() => usersQuery.refetch()}
          className="mt-5 rounded-2xl bg-[#16215c] px-4 py-2 text-sm font-black text-white"
        >
          {t("common.retry")}
        </button>
      </section>
    );
  }

  const users = usersQuery.data;
  const metrics = buildMetrics(users, t);

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-sm">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#eef1ff] blur-3xl" />
        <div className="absolute bottom-0 right-40 h-36 w-36 rounded-full bg-[#e8fbf8] blur-3xl" />
        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#6d7cff]">
            {t("dashboard.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#16215c]">
            {t("dashboard.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-[#526071]">
            {t("dashboard.description")}
          </p>
        </div>
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
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#16215c]/6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef1ff] text-[#6d7cff]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-2xl font-black text-[#16215c]">{value}</p>
                <p className="mt-1 text-sm font-semibold text-[#687280]">{label}</p>
              </article>
            ))}
          </div>

          <section className="rounded-[1.7rem] border border-white bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-[#16215c]">
                  {t("dashboard.usersTitle")}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#687280]">
                  {t("dashboard.usersDescription")}
                </p>
              </div>
              <span className="rounded-2xl border border-[#68d391]/45 bg-[#eafbf0] px-3 py-1 text-sm font-black text-[#2f8a5b]">
                {users.length} {t("common.records")}
              </span>
            </div>
            <UsersTable users={users} />
          </section>
        </>
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

function DashboardLoading() {
  return (
    <section className="space-y-6">
      <div className="h-44 animate-pulse rounded-[2rem] bg-white" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-32 animate-pulse rounded-[1.5rem] bg-white" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-[1.7rem] bg-white" />
    </section>
  );
}

function buildMetrics(
  users: Awaited<ReturnType<typeof listUsers>>,
  t: (key: TranslationKey) => string,
) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const newThisMonth = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear
    );
  }).length;
  const withLocation = users.filter((user) => Boolean(user.location)).length;
  const withPhoto = users.filter((user) => Boolean(user.photoUrl)).length;

  return [
    { label: t("dashboard.metricUsers"), value: String(users.length), icon: Users2 },
    { label: t("dashboard.metricNewMonth"), value: String(newThisMonth), icon: Activity },
    { label: t("dashboard.metricWithLocation"), value: String(withLocation), icon: MapPin },
    { label: t("dashboard.metricWithPhoto"), value: String(withPhoto), icon: PawPrint },
  ];
}

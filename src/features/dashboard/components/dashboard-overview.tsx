"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Activity, MapPin, PawPrint, ShieldCheck, Users2 } from "lucide-react";
import { VerificationPanel } from "@/features/verification/components/verification-panel";
import { ApiError, listUsers } from "@/features/users/api";
import { UsersTable } from "@/features/users/components/users-table";

type DashboardTab = "users" | "verification";

export function DashboardOverview() {
  const router = useRouter();
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
      <section className="rounded-lg border border-red-400/20 bg-red-400/10 p-6">
        <h2 className="text-lg font-semibold text-red-100">
          No fue posible cargar el dashboard
        </h2>
        <p className="mt-2 text-sm text-red-100/80">
          {usersQuery.error instanceof Error
            ? usersQuery.error.message
            : "Intenta nuevamente."}
        </p>
        <button
          type="button"
          onClick={() => usersQuery.refetch()}
          className="mt-5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-zinc-950"
        >
          Reintentar
        </button>
      </section>
    );
  }

  const users = usersQuery.data;
  const metrics = buildMetrics(users);

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase text-zinc-400">Panel operativo</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Gestion de usuarios y actividad inicial.
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-300">
          El dashboard consume datos reales disponibles del backend y queda
          preparado para sumar metricas administrativas dedicadas.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-2">
        <DashboardTabButton
          active={activeTab === "users"}
          icon={Users2}
          label="Usuarios"
          onClick={() => setActiveTab("users")}
        />
        <DashboardTabButton
          active={activeTab === "verification"}
          icon={ShieldCheck}
          label="Verificaciones"
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
                className="rounded-lg border border-white/10 bg-white/5 p-5"
              >
                <Icon className="h-5 w-5 text-[#7cb7b7]" />
                <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-sm text-zinc-400">{label}</p>
              </article>
            ))}
          </div>

          <section className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">Usuarios</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Gestion inicial basada en el endpoint existente de usuarios.
                </p>
              </div>
              <span className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                {users.length} registros
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
      className={`inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition ${
        active
          ? "bg-white text-zinc-950"
          : "text-zinc-300 hover:bg-white/10 hover:text-white"
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
      <div className="h-44 animate-pulse rounded-lg bg-white/5" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-32 animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-lg bg-white/5" />
    </section>
  );
}

function buildMetrics(users: Awaited<ReturnType<typeof listUsers>>) {
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
    { label: "Usuarios", value: String(users.length), icon: Users2 },
    { label: "Nuevos este mes", value: String(newThisMonth), icon: Activity },
    { label: "Con ubicacion", value: String(withLocation), icon: MapPin },
    { label: "Con foto", value: String(withPhoto), icon: PawPrint },
  ];
}

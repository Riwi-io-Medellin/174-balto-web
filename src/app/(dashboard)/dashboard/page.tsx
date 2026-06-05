import { BarChart3, PawPrint, Settings2, Users2 } from "lucide-react";

const stats = [
  { label: "Registered pets", value: "248", icon: PawPrint },
  { label: "Active users", value: "1.2k", icon: Users2 },
  { label: "Open tasks", value: "18", icon: BarChart3 },
  { label: "System settings", value: "7", icon: Settings2 },
];

export default function DashboardPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
            Dashboard overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Admin console ready for API-backed workflows.
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-300">
            This area is separated from the public site so authentication,
            account management, and operational screens can grow independently.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <article
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <Icon className="h-5 w-5 text-zinc-400" />
              <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-sm text-zinc-400">{label}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Next steps</h3>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          <li>Wire ASP.NET auth tokens or cookies into the infrastructure layer.</li>
          <li>Move dashboard data fetching to React Query.</li>
          <li>Build feature modules under `src/features` as the UI grows.</li>
        </ul>
      </aside>
    </section>
  );
}

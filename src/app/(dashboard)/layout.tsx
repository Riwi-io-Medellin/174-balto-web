export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              Admin area
            </p>
            <h1 className="text-lg font-semibold">Front End Pets</h1>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
            Auth protected
          </span>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

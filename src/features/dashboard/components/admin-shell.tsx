"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <div className="mb-8 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-5 py-4">
          <div>
            <p className="text-xs uppercase text-zinc-400">Administracion</p>
            <h1 className="text-lg font-semibold">Balto</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-sm text-zinc-300 transition hover:border-white/25 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

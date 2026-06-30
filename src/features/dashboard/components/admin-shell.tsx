"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { LanguageToggle, useLanguage } from "@/features/i18n";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { t } = useLanguage();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[#16215c]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 sm:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.7rem] border border-white bg-white/86 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-4">
            <Image
              src="/balto-app-icon.png"
              alt="Balto"
              width={48}
              height={48}
              className="rounded-2xl shadow-[0_14px_28px_rgba(109,124,255,0.18)]"
              priority
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d7cff]">
                {t("dashboard.privateBackoffice")}
              </p>
              <h1 className="mt-1 text-xl font-black text-[#16215c]">Balto</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle compact />
            <span className="hidden items-center gap-2 rounded-2xl bg-[#eafbf0] px-3 py-2 text-xs font-black text-[#2f8a5b] sm:inline-flex">
              <ShieldCheck className="h-4 w-4" />
              {t("dashboard.adminSession")}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-[#dfe5ef] bg-white px-4 text-sm font-black text-[#16215c] transition hover:border-[#6d7cff]/40 hover:text-[#6d7cff] focus:outline-none focus:ring-2 focus:ring-[#6d7cff]/30"
            >
              <LogOut className="h-4 w-4" />
              {t("dashboard.logout")}
            </button>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

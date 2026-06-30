"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/features/i18n";

type LoginState = "idle" | "submitting" | "error";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [state, setState] = useState<LoginState>("idle");
  const [message, setMessage] = useState("");
  const adminRequired = searchParams.get("error") === "admin_required";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setState("error");
      setMessage(t("auth.error"));
      return;
    }

    const nextPath = searchParams.get("next") || "/dashboard";
    router.replace(nextPath.startsWith("/") ? nextPath : "/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[2rem] border border-white bg-white p-7 shadow-xl shadow-[#16215c]/8"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/balto-app-icon.png"
          alt="Balto"
          width={54}
          height={54}
          className="rounded-2xl shadow-[0_14px_28px_rgba(109,124,255,0.18)]"
          priority
        />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d7cff]">
            {t("auth.privateAccess")}
          </p>
          <h1 className="mt-1 text-2xl font-black text-[#16215c]">
            {t("auth.backoffice")}
          </h1>
        </div>
      </div>

      <p className="mt-5 rounded-2xl bg-[#eef1ff] px-4 py-3 text-sm font-semibold leading-6 text-[#526071]">
        {t("auth.description")}
      </p>

      {adminRequired ? (
        <p className="mt-4 rounded-2xl border border-[#f6c86a]/45 bg-[#fff7e6] px-4 py-3 text-sm font-semibold text-[#8d5b13]">
          {t("auth.adminRequired")}
        </p>
      ) : null}

      <label className="mt-6 block text-sm font-black text-[#16215c]">
        {t("auth.email")}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] px-4 text-sm text-[#16215c] outline-none transition focus:border-[#6d7cff] focus:bg-white focus:ring-4 focus:ring-[#6d7cff]/12"
        />
      </label>

      <label className="mt-4 block text-sm font-black text-[#16215c]">
        {t("auth.password")}
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-2xl border border-[#dfe5ef] bg-[#fbfcff] px-4 text-sm text-[#16215c] outline-none transition focus:border-[#6d7cff] focus:bg-white focus:ring-4 focus:ring-[#6d7cff]/12"
        />
      </label>

      {state === "error" ? (
        <p className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm font-semibold text-[#b91c1c]">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#6d7cff] px-4 text-sm font-black text-white shadow-lg shadow-[#6d7cff]/22 transition hover:-translate-y-0.5 hover:bg-[#5a69f0] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LogIn className="h-4 w-4" />
        {state === "submitting" ? t("auth.submitting") : t("auth.submit")}
      </button>

      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#687280]">
        <ShieldCheck className="h-4 w-4 text-[#68d391]" />
        {t("auth.protectedSession")}
      </div>
    </form>
  );
}

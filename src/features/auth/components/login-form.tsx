"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";

type LoginState = "idle" | "submitting" | "error";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<LoginState>("idle");
  const [message, setMessage] = useState("");

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
      setMessage("No fue posible iniciar sesion con esas credenciales.");
      return;
    }

    const nextPath = searchParams.get("next") || "/dashboard";
    router.replace(nextPath.startsWith("/") ? nextPath : "/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#607f7f] text-white">
        <LockKeyhole className="h-5 w-5" />
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-semibold text-zinc-950">
          Backoffice Balto
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Acceso privado para administracion y gestion operativa.
        </p>
      </div>

      <label className="mt-6 block text-sm font-medium text-zinc-700">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-11 w-full rounded-md border border-zinc-300 px-3 text-sm text-zinc-950 outline-none transition focus:border-[#607f7f] focus:ring-2 focus:ring-[#607f7f]/15"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-zinc-700">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-11 w-full rounded-md border border-zinc-300 px-3 text-sm text-zinc-950 outline-none transition focus:border-[#607f7f] focus:ring-2 focus:ring-[#607f7f]/15"
        />
      </label>

      {state === "error" ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#607f7f] px-4 text-sm font-semibold text-white transition hover:bg-[#4f6c6c] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LogIn className="h-4 w-4" />
        {state === "submitting" ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}

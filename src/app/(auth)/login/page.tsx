import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import { LanguageToggle } from "@/features/i18n";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6fb] px-6 py-10">
      <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
        <LanguageToggle />
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}

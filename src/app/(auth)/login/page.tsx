import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6fb] px-6 py-10">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}

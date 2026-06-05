import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  "Public landing page for users",
  "Admin-only dashboard for operations",
  "ASP.NET API as the source of truth for auth",
];

const benefits = [
  {
    title: "API-first auth",
    description: "The backend owns identity, session handling, and access control.",
    icon: ShieldCheck,
  },
  {
    title: "Tailwind UI",
    description: "Fast styling with reusable utilities and consistent design tokens.",
    icon: Sparkles,
  },
  {
    title: "Clean structure",
    description: "App routes, shared code, and infrastructure live in separate layers.",
    icon: CheckCircle2,
  },
];

export default function LandingPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 lg:flex-row lg:items-center lg:py-28">
      <div className="max-w-2xl space-y-8">
        <span className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm">
          Next.js + ASP.NET Identity
        </span>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            A clean public site and admin dashboard for the pets platform.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600">
            This scaffold separates presentation, shared utilities, and API
            infrastructure so the app can grow without turning into a pile of
            one-off components.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Open dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#architecture"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
          >
            See architecture
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        id="architecture"
        className="grid flex-1 gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        {benefits.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-2xl bg-zinc-50 p-5">
            <Icon className="mb-4 h-5 w-5 text-zinc-950" />
            <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

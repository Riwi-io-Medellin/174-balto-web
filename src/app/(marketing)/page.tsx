import {
  Download,
  MapPin,
  PawPrint,
  ShieldCheck,
  Smartphone,
  Star,
} from "lucide-react";

const apkUrl = process.env.NEXT_PUBLIC_APK_URL ?? "/downloads/balto.apk";
const appVersion = process.env.NEXT_PUBLIC_APP_VERSION ?? "local";

const audiences = [
  {
    title: "Duenos",
    description: "Perfiles, paseos y seguimiento para el cuidado diario.",
    icon: PawPrint,
  },
  {
    title: "Walkers",
    description: "Disponibilidad, historial y reputacion en un solo flujo.",
    icon: MapPin,
  },
  {
    title: "Negocios",
    description: "Servicios pet care conectados con usuarios de la app.",
    icon: Star,
  },
];

export default function LandingPage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:py-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-md border border-[#607f7f]/25 bg-white px-3 py-2 text-sm font-medium text-[#607f7f] shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            App movil para el ecosistema pet care
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-zinc-950 sm:text-6xl">
              Balto conecta paseos, mascotas y servicios cerca de ti.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Descarga la app Android y prueba una experiencia pensada para
              duenos, walkers y negocios del ecosistema pet care.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={apkUrl}
              className="inline-flex items-center gap-2 rounded-md bg-[#607f7f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4f6c6c]"
            >
              <Download className="h-4 w-4" />
              Descargar APK
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {audiences.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <Icon className="h-5 w-5 text-[#3a80c2]" />
                <h2 className="mt-4 text-base font-semibold text-zinc-950">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-[2rem] border border-zinc-900 bg-zinc-950 p-3 shadow-2xl">
            <div className="rounded-[1.35rem] bg-[#f7faf9] p-4">
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-md bg-zinc-300" />
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase text-[#607f7f]">
                      Balto
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-zinc-950">
                      Paseo activo
                    </h2>
                  </div>
                  <Smartphone className="h-6 w-6 text-[#1baa71]" />
                </div>

                <div className="mt-6 rounded-lg bg-[#e7f0f0] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#607f7f] text-white">
                      <PawPrint className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-950">
                        Max esta en ruta
                      </p>
                      <p className="text-xs text-zinc-600">
                        Walker confirmado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="h-2 rounded-md bg-[#3a80c2]" />
                  <div className="h-2 w-4/5 rounded-md bg-[#1baa71]" />
                  <div className="h-2 w-3/5 rounded-md bg-[#d05a24]" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-xs text-zinc-500">Version</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-950">
                    {appVersion}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-xs text-zinc-500">Estado</p>
                  <p className="mt-1 text-lg font-semibold text-[#1baa71]">
                    Local
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

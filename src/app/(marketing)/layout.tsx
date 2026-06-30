import Image from "next/image";
import { Download } from "lucide-react";

const apkUrl = process.env.NEXT_PUBLIC_APK_URL ?? "/downloads/balto.apk";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb]/80 bg-[#fbfcff]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#inicio"
            className="flex items-center gap-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6d7cff]"
            aria-label="Ir al inicio de Balto"
          >
            <Image
              src="/balto-app-icon.png"
              alt=""
              width={44}
              height={44}
              className="rounded-2xl shadow-[0_16px_35px_rgba(109,124,255,0.18)]"
              priority
            />
            <span className="text-xl font-black leading-none text-[#16215c]">
              Balto
            </span>
          </a>

          <a
            href={apkUrl}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#6d7cff] px-4 text-sm font-black text-white shadow-lg shadow-[#6d7cff]/25 transition hover:-translate-y-0.5 hover:bg-[#5a69f0] focus:outline-none focus:ring-2 focus:ring-[#6d7cff] focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Descargar APK
          </a>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#e5e7eb] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/balto-app-icon.png"
              alt=""
              width={36}
              height={36}
              className="rounded-xl"
            />
            <span className="font-black text-[#16215c]">Balto</span>
          </div>
          <a
            href={apkUrl}
            className="inline-flex h-11 w-fit items-center gap-2 rounded-2xl border border-[#dfe5ef] px-4 text-sm font-black text-[#16215c] transition hover:border-[#6d7cff]/40 hover:text-[#6d7cff]"
          >
            <Download className="h-4 w-4" />
            Descargar APK
          </a>
        </div>
      </footer>
    </div>
  );
}

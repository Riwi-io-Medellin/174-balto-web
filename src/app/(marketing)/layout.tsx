import Link from "next/link";

const apkUrl = process.env.NEXT_PUBLIC_APK_URL ?? "/downloads/balto.apk";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7faf9]">
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold uppercase text-[#607f7f]">
            Balto
          </Link>
          <a
            href={apkUrl}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-[#607f7f] hover:text-[#607f7f]"
          >
            Descargar APK
          </a>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

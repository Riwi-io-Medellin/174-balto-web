import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Balto",
    template: "%s | Balto",
  },
  description: "Balto mobile app download landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-50 text-zinc-950" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

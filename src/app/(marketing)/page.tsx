"use client";

import Image from "next/image";
import {
  Bell,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Download,
  Heart,
  HeartHandshake,
  MapPin,
  Navigation,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { useLanguage } from "@/features/i18n";

const apkUrl = process.env.NEXT_PUBLIC_APK_URL ?? "/downloads/balto.apk";

const images = {
  hero:
    "https://images.pexels.com/photos/5748620/pexels-photo-5748620.jpeg?auto=compress&cs=tinysrgb&w=1200",
  walking:
    "https://images.pexels.com/photos/62379/pexels-photo-62379.jpeg?auto=compress&cs=tinysrgb&w=1200",
  cat:
    "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=900",
  puppies:
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=900",
  vet:
    "https://images.pexels.com/photos/6235020/pexels-photo-6235020.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/balto-app-icon.png"
        alt="Balto"
        width={46}
        height={46}
        className="rounded-2xl shadow-[0_16px_35px_rgba(109,124,255,0.2)]"
        priority
      />
      <div>
        <p
          className={`text-2xl font-black leading-none ${
            light ? "text-white" : "text-[#16215c]"
          }`}
        >
          Balto
        </p>
      </div>
    </div>
  );
}

function PetPhoto({
  src,
  alt,
  className = "",
  shape = "42% 58% 48% 52% / 52% 38% 62% 48%",
}: {
  src: string;
  alt: string;
  className?: string;
  shape?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={900}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
      style={{ borderRadius: shape }}
    />
  );
}

function AppPreview() {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div className="absolute -left-14 top-10 hidden h-36 w-36 rotate-[-8deg] overflow-hidden border-[8px] border-white bg-white shadow-2xl shadow-[#16215c]/15 md:block">
        <PetPhoto
          src={images.cat}
          alt={t("marketing.altCatHome")}
          shape="38% 62% 45% 55% / 46% 42% 58% 54%"
        />
      </div>

      <div className="absolute -right-10 bottom-28 z-20 hidden rounded-3xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-[#16215c]/12 backdrop-blur lg:block">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eafbf0] text-[#2f8a5b]">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-black text-[#16215c]">
              {t("marketing.previewSafeWalk")}
            </p>
            <p className="text-[11px] font-semibold text-[#687280]">
              {t("marketing.previewVerifiedWalker")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative rounded-[2.8rem] border border-[#16215c]/15 bg-[#16215c] p-3 shadow-2xl shadow-[#6d7cff]/25">
        <div className="overflow-hidden rounded-[2.25rem] bg-[#fbfcff]">
          <div className="flex items-center justify-between bg-white px-5 pb-2 pt-4 text-[11px] font-black text-[#16215c]">
            <span>9:41</span>
            <span className="h-1.5 w-16 rounded-full bg-[#e5e7eb]" />
            <span>100%</span>
          </div>

          <div className="space-y-4 px-4 pb-5 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6d7cff]">
                  {t("marketing.previewNow")}
                </p>
                <h2 className="mt-1 text-xl font-black text-[#16215c]">
                  {t("marketing.previewWalking")}
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eafbf0] px-2.5 py-1 text-[11px] font-black text-[#2f8a5b]">
                <span className="h-2 w-2 rounded-full bg-[#68d391] motion-safe:animate-pulse" />
                {t("marketing.previewLive")}
              </span>
            </div>

            <div className="relative h-36 overflow-hidden rounded-[1.7rem] bg-[#eafbf0]">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(#cdeedd 1px, transparent 1px), linear-gradient(90deg, #cdeedd 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 280 145"
                className="relative h-full w-full"
                fill="none"
              >
                <path
                  d="M24 116 C70 118 72 50 124 55 C174 60 176 104 252 30"
                  stroke="#68d391"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
                <circle
                  cx="24"
                  cy="116"
                  r="8"
                  fill="#fff"
                  stroke="#68d391"
                  strokeWidth="4"
                />
                <circle
                  cx="124"
                  cy="55"
                  r="7"
                  fill="#fff"
                  stroke="#7baaf7"
                  strokeWidth="4"
                />
                <circle
                  cx="252"
                  cy="30"
                  r="9"
                  fill="#68d391"
                  stroke="#fff"
                  strokeWidth="4"
                />
              </svg>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#16215c] shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-[#68d391]" />
                {t("marketing.previewPark")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-3">
                <p className="text-[11px] font-semibold text-[#687280]">
                  {t("marketing.previewTime")}
                </p>
                <p className="mt-1 text-lg font-black text-[#16215c]">
                  28:47
                </p>
              </div>
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-3">
                <p className="text-[11px] font-semibold text-[#687280]">
                  {t("marketing.previewDistance")}
                </p>
                <p className="mt-1 text-lg font-black text-[#16215c]">
                  2.45 km
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#edf5ff] font-black text-[#3a80c2]">
                  AG
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#16215c]">
                    {t("marketing.previewWalker")}
                  </p>
                  <p className="text-xs text-[#687280]">
                    {t("marketing.previewWalkerRating")}
                  </p>
                </div>
                <Star className="h-5 w-5 fill-[#f6c86a] text-[#f6c86a]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { t } = useLanguage();
  const featureCards = [
    {
      title: t("marketing.featureScheduleTitle"),
      description: t("marketing.featureScheduleText"),
      icon: CalendarCheck,
    },
    {
      title: t("marketing.featureRouteTitle"),
      description: t("marketing.featureRouteText"),
      icon: Navigation,
    },
    {
      title: t("marketing.featureVerifiedTitle"),
      description: t("marketing.featureVerifiedText"),
      icon: ShieldCheck,
    },
    {
      title: t("marketing.featureServicesTitle"),
      description: t("marketing.featureServicesText"),
      icon: Stethoscope,
    },
  ];
  const careHighlights = [
    t("marketing.carePetProfile"),
    t("marketing.careReminders"),
    t("marketing.careHistory"),
    t("marketing.careCommunity"),
  ];
  const heroStats = [
    [t("marketing.statLiveRouteTitle"), t("marketing.statLiveRouteText")],
    [t("marketing.statKycTitle"), t("marketing.statKycText")],
    [t("marketing.statPetCareTitle"), t("marketing.statPetCareText")],
  ];
  const routeSteps = [
    t("marketing.routeHome"),
    t("marketing.routePark"),
    t("marketing.routeBack"),
  ];
  const serviceCards = [
    {
      title: t("marketing.clearProfilesTitle"),
      text: t("marketing.clearProfilesText"),
      icon: Users,
    },
    {
      title: t("marketing.usefulRemindersTitle"),
      text: t("marketing.usefulRemindersText"),
      icon: Bell,
    },
    {
      title: t("marketing.trustFirstTitle"),
      text: t("marketing.trustFirstText"),
      icon: ShieldCheck,
    },
    {
      title: t("marketing.allInOneTitle"),
      text: t("marketing.allInOneText"),
      icon: HeartHandshake,
    },
  ];

  return (
    <main className="overflow-hidden bg-[#fbfcff] text-[#16215c]">
      <section
        id="inicio"
        className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-5 py-12 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:py-16"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-[#eef1ff] blur-3xl" />
          <div className="absolute right-10 top-28 h-80 w-80 rounded-full bg-[#e8fbf8] blur-3xl" />
          <div className="absolute bottom-8 left-1/3 h-72 w-72 rounded-full bg-[#fff7e6] blur-3xl" />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6d7cff]/15 bg-white px-3 py-2 text-sm font-black text-[#6d7cff] shadow-sm">
            <Sparkles className="h-4 w-4" />
            {t("marketing.badge")}
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-[#16215c] sm:text-6xl lg:text-7xl">
            {t("marketing.heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526071]">
            {t("marketing.heroDescription")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={apkUrl}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#6d7cff] px-6 text-base font-black text-white shadow-xl shadow-[#6d7cff]/25 transition hover:-translate-y-1 hover:bg-[#5a69f0]"
            >
              <Download className="h-5 w-5" />
              {t("common.downloadApk")}
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroStats.map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white bg-white/75 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-lg font-black text-[#16215c]">{title}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#687280]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-2 top-1 hidden h-40 w-40 rotate-6 overflow-hidden border-[10px] border-white shadow-2xl shadow-[#16215c]/12 sm:block">
            <PetPhoto
              src={images.puppies}
              alt={t("marketing.altPuppies")}
              shape="55% 45% 47% 53% / 48% 58% 42% 52%"
            />
          </div>
          <AppPreview />
        </div>
      </section>

      <section id="paseos" className="px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[480px]">
            <div className="absolute left-0 top-4 h-[360px] w-[74%] overflow-hidden shadow-2xl shadow-[#16215c]/12">
              <PetPhoto
                src={images.walking}
                alt={t("marketing.altWalking")}
                shape="33% 67% 50% 50% / 48% 38% 62% 52%"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[58%] rounded-[2rem] border border-white bg-white p-4 shadow-2xl shadow-[#16215c]/12">
              <div className="rounded-[1.4rem] bg-[#eafbf0] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#2f8a5b]">
                    {t("marketing.walkStatus")}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#2f8a5b]">
                    {t("marketing.live")}
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {routeSteps.map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-[#68d391]">
                        {index + 1}
                      </span>
                      <div className="h-2 flex-1 rounded-full bg-white">
                        <div
                          className="h-full rounded-full bg-[#68d391]"
                          style={{ width: `${52 + index * 18}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#68d391]">
              {t("marketing.walkEyebrow")}
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-[#16215c] sm:text-5xl">
              {t("marketing.walkTitle")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#526071]">
              {t("marketing.walkDescription")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featureCards.slice(0, 3).map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-[1.7rem] border border-[#e5e7eb] bg-white p-5 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#6d7cff]" />
                  <h3 className="mt-4 text-lg font-black text-[#16215c]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#687280]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cuidado" className="bg-white px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#5fd6cc]">
              {t("marketing.careEyebrow")}
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-[#16215c] sm:text-5xl">
              {t("marketing.careTitle")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#526071]">
              {t("marketing.careDescription")}
            </p>

            <div className="mt-8 space-y-3">
              {careHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-[#fbfcff] p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8fbf8] text-[#16857d]">
                    <Heart className="h-5 w-5" />
                  </span>
                  <span className="font-bold text-[#16215c]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute right-0 top-0 h-[330px] w-[68%] overflow-hidden shadow-2xl shadow-[#16215c]/12">
              <PetPhoto
                src={images.cat}
                alt={t("marketing.altCat")}
                shape="58% 42% 60% 40% / 44% 54% 46% 56%"
              />
            </div>
            <div className="absolute bottom-8 left-0 h-[300px] w-[58%] overflow-hidden border-[10px] border-white shadow-2xl shadow-[#16215c]/12">
              <PetPhoto
                src={images.puppies}
                alt={t("marketing.altPuppies")}
                shape="37% 63% 44% 56% / 52% 38% 62% 48%"
              />
            </div>
            <div className="absolute bottom-0 right-6 max-w-xs rounded-[2rem] bg-[#16215c] p-5 text-white shadow-2xl shadow-[#16215c]/20">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#5fd6cc]" />
                <p className="text-sm font-black">{t("marketing.aiLabel")}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/80">
                {t("marketing.aiText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f6c86a]">
                {t("marketing.servicesEyebrow")}
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-[#16215c] sm:text-5xl">
                {t("marketing.servicesTitle")}
              </h2>
            </div>
            <p className="text-lg leading-8 text-[#526071]">
              {t("marketing.servicesDescription")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[440px] overflow-hidden rounded-[2.5rem] bg-[#fcf8ee] p-6">
              <PetPhoto
                src={images.vet}
                alt={t("marketing.altVet")}
                className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]"
                shape="36% 64% 52% 48% / 52% 46% 54% 48%"
              />
              <div className="absolute bottom-8 left-8 max-w-sm rounded-[1.7rem] bg-white/92 p-5 shadow-xl backdrop-blur">
                <Stethoscope className="h-6 w-6 text-[#b56e00]" />
                <h3 className="mt-3 text-xl font-black text-[#16215c]">
                  {t("marketing.servicesCardTitle")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#687280]">
                  {t("marketing.servicesCardText")}
                </p>
              </div>
            </div>

            <div className="grid gap-5">
              {serviceCards.map(({ title, text, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-[1.7rem] border border-[#e5e7eb] bg-white p-5 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#6d7cff]" />
                  <h3 className="mt-4 text-lg font-black text-[#16215c]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#687280]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apk" className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] bg-[#6d7cff] text-white shadow-2xl shadow-[#6d7cff]/20">
          <div className="grid items-center gap-0 lg:grid-cols-[1fr_0.76fr]">
            <div className="p-6 sm:p-10">
              <BrandMark light />
              <h2 className="mt-8 max-w-3xl text-4xl font-black tracking-normal sm:text-5xl">
                {t("marketing.apkTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">
                {t("marketing.apkDescription")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={apkUrl}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-black text-[#6d7cff] shadow-lg transition hover:-translate-y-1"
                >
                  <Download className="h-5 w-5" />
                  {t("common.downloadApk")}
                </a>
              </div>
            </div>

            <div className="relative min-h-[460px] bg-[#eef1ff]">
              <PetPhoto
                src={images.hero}
                alt={t("marketing.altHero")}
                className="absolute inset-0"
                shape="0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16215c]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-[1.7rem] bg-white/92 p-5 text-[#16215c] shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <Image
                    src="/balto-app-icon.png"
                    alt=""
                    width={56}
                    height={56}
                    className="rounded-2xl"
                  />
                  <div>
                    <p className="text-xl font-black">
                      {t("marketing.apkFileName")}
                    </p>
                    <p className="text-sm font-semibold text-[#687280]">
                      {t("marketing.apkInstall")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./language-provider";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();
  const options = [
    { value: "es" as const, label: "ES", title: t("common.spanish") },
    { value: "en" as const, label: "EN", title: t("common.english") },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-2xl border border-[#dfe5ef] bg-white p-1 shadow-sm ${
        compact ? "h-11" : "h-12"
      }`}
      aria-label={t("common.language")}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6d7cff]">
        <Languages className="h-4 w-4" aria-hidden="true" />
      </span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.title}
          aria-pressed={language === option.value}
          onClick={() => setLanguage(option.value)}
          className={`h-9 rounded-xl px-3 text-xs font-black transition ${
            language === option.value
              ? "bg-[#16215c] text-white shadow-sm"
              : "text-[#687280] hover:bg-[#eef1ff] hover:text-[#16215c]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

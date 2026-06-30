"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  languages,
  translations,
  type Language,
  type TranslationKey,
} from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const defaultLanguage: Language = "es";
const storageKey = "balto-language";
const languageChangeEvent = "balto-language-change";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(storageKey, language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    writeLanguage(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    writeLanguage(language === "es" ? "en" : "es");
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: (key) => translations[language][key],
    }),
    [language, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider.");
  }

  return context;
}

function isLanguage(value: string | null): value is Language {
  return languages.includes(value as Language);
}

function getLanguageSnapshot(): Language {
  return readLanguage();
}

function getServerLanguageSnapshot(): Language {
  return defaultLanguage;
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener(languageChangeEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(languageChangeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function writeLanguage(language: Language) {
  window.localStorage.setItem(storageKey, language);
  window.dispatchEvent(new Event(languageChangeEvent));
}

function readLanguage(): Language {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const storedLanguage = window.localStorage.getItem(storageKey);

  if (isLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return window.navigator.language.toLowerCase().startsWith("en")
    ? "en"
    : defaultLanguage;
}

import type { Translation } from "@/types";
import { useCallback, useEffect, useState } from "react";

export type LanguageCode = "en" | "km" | "fr";

const STORAGE_KEY = "kampot_lang";

export const languageNames: Record<LanguageCode, string> = {
  en: "English",
  km: "ភាសាខ្មែរ",
  fr: "Français",
};

function getStoredLang(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "km" || stored === "fr") return stored;
  } catch {
    // ignore
  }
  return "en";
}

/** Standalone t() function — finds translation by key and returns text for given lang */
export function t(
  key: string,
  translations: Translation[],
  lang: LanguageCode = "en",
): string {
  const found = translations.find((tr) => tr.key === key);
  if (!found) return key;
  return found[lang] || found.en || key;
}

/** React hook for language management */
export function useLanguage() {
  const [lang, setLangState] = useState<LanguageCode>(getStoredLang);

  const setLang = useCallback((newLang: LanguageCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  }, []);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const v = e.newValue as LanguageCode;
        if (v === "en" || v === "km" || v === "fr") setLangState(v);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const tFn = useCallback(
    (key: string, translations: Translation[]) => t(key, translations, lang),
    [lang],
  );

  return { lang, setLang, t: tFn };
}

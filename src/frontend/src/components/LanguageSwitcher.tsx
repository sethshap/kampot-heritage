import { type LanguageCode, useLanguage } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LANGUAGE_OPTIONS: { code: LanguageCode; flag: string; label: string }[] =
  [
    { code: "en", flag: "🇬🇧", label: "EN" },
    { code: "km", flag: "🇰🇭", label: "KH" },
    { code: "fr", flag: "🇫🇷", label: "FR" },
  ];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current =
    LANGUAGE_OPTIONS.find((o) => o.code === lang) ?? LANGUAGE_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative" data-ocid="language.switcher">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-ocid="language.dropdown_trigger"
        aria-label={`Language: ${current.label}`}
        className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted border border-transparent hover:border-border transition-all duration-150"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs font-semibold tracking-wide">
          {current.label}
        </span>
        <ChevronDown
          size={12}
          className={`text-muted-foreground transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 w-28 bg-card border border-border rounded-lg shadow-lg py-1 z-50"
          data-ocid="language.dropdown"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              aria-current={lang === opt.code ? "true" : undefined}
              onClick={() => {
                setLang(opt.code);
                setOpen(false);
              }}
              data-ocid={`language.${opt.code}`}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-100 ${
                lang === opt.code
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="text-base">{opt.flag}</span>
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

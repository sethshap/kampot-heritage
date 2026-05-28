import { useEffect, useState } from "react";

const TITLE = {
  en: "How to Install",
  km: "របៀបដំឡើង",
  fr: "Comment installer",
} as const;

const SUBTITLE = {
  en: "Get Kampot Heritage on your device — works offline, loads instantly.",
  km: "ទទួលបានកម្ពុជា Heritage នៅលើឧបករណ៍របស់អ្នក — ដំណើរការដោយគ្មានអ៊ីនធឺណិត ផ្ទុកដោយរហ័ស។",
  fr: "Installez Kampot Heritage sur votre appareil — fonctionne hors ligne, chargement instantané.",
} as const;

type Lang = "en" | "km" | "fr";

type Platform = {
  id: string;
  icon: string;
  title: string;
  badge: string;
  steps: string[];
  color: string;
};

const PLATFORMS: Platform[] = [
  {
    id: "android",
    icon: "🤖",
    title: "Android",
    badge: "Chrome",
    color: "oklch(0.55 0.18 148)",
    steps: [
      "Open this page in Chrome",
      "Tap the ⋮ three-dot menu (top right)",
      '"Add to Home Screen" → tap',
      '"Install" → confirm',
    ],
  },
  {
    id: "iphone",
    icon: "🍎",
    title: "iPhone / iPad",
    badge: "Safari",
    color: "oklch(0.50 0.14 260)",
    steps: [
      "Open this page in Safari",
      "Tap the Share button (□↑) at the bottom",
      '"Add to Home Screen" → tap',
      '"Add" in the top right → done',
    ],
  },
  {
    id: "desktop",
    icon: "🖥️",
    title: "Desktop",
    badge: "Chrome / Edge",
    color: "oklch(0.52 0.16 45)",
    steps: [
      "Look for the ⊕ install icon in the address bar",
      '"Install Kampot Heritage" → click',
      '"Install" in the popup → confirm',
      "App opens in its own window instantly",
    ],
  },
];

function detectPlatform(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "iphone";
  if (/Android/.test(ua)) return "android";
  if (/Windows|Macintosh|Linux/.test(ua) && !/Mobile/.test(ua))
    return "desktop";
  return null;
}

function PlatformCard({
  platform,
  highlight,
}: {
  platform: Platform;
  highlight: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
        highlight
          ? "border-primary shadow-lg scale-[1.02]"
          : "border-border bg-card"
      }`}
      data-ocid={`how-to-install.${platform.id}_card`}
    >
      {highlight && (
        <div
          className="absolute top-3 right-3 text-xs font-semibold font-body text-white rounded-full px-2 py-0.5"
          style={{ background: platform.color }}
        >
          Your device
        </div>
      )}
      <div
        className="px-6 py-5 flex items-center gap-3"
        style={{
          background: highlight
            ? `linear-gradient(135deg, ${platform.color}22, ${platform.color}08)`
            : undefined,
        }}
      >
        <span className="text-3xl" role="img" aria-label={platform.title}>
          {platform.icon}
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {platform.title}
          </h3>
          <span className="text-xs font-body text-muted-foreground bg-muted rounded px-1.5 py-0.5">
            {platform.badge}
          </span>
        </div>
      </div>
      <ol className="px-6 pb-6 space-y-3">
        {platform.steps.map((step, idx) => (
          <li
            key={`${platform.id}-step-${idx}`}
            className="flex items-start gap-3"
          >
            <span
              className="shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold font-body mt-0.5"
              style={{ background: platform.color }}
            >
              {idx + 1}
            </span>
            <span className="text-sm font-body text-foreground leading-relaxed">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HowToInstall() {
  const [lang, setLang] = useState<Lang>("en");
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kampot_lang") as Lang | null;
    if (stored && (stored === "en" || stored === "km" || stored === "fr"))
      setLang(stored);

    const onStorage = () => {
      const l = localStorage.getItem("kampot_lang") as Lang | null;
      if (l && (l === "en" || l === "km" || l === "fr")) setLang(l);
    };
    window.addEventListener("storage", onStorage);
    setDetectedPlatform(detectPlatform());
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section
      id="how-to-install"
      className="py-20 bg-muted/30"
      data-ocid="how-to-install.section"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground">
          Progressive Web App
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl font-bold mb-3 text-foreground">
          {TITLE[lang]}
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 text-sm max-w-lg mx-auto leading-relaxed">
          {SUBTITLE[lang]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLATFORMS.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              highlight={detectedPlatform === platform.id}
            />
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground font-body mt-8">
          💡 Works on all modern browsers · No app store required · Updates
          automatically
        </p>
      </div>
    </section>
  );
}

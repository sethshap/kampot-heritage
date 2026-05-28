import { X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISS_KEY = "kampot_pwa_banner_dismissed";

const INSTALL_TEXT = {
  en: {
    msg: "Install Kampot Heritage on your device for offline access",
    install: "Install",
    success: "Installing… Thank you!",
  },
  km: {
    msg: "ដំឡើងកម្ពុជា Heritage នៅលើឧបករណ៍របស់អ្នកដើម្បីចូលប្រើដោយគ្មានអ៊ីនធឺណិត",
    install: "ដំឡើង",
    success: "កំពុងដំឡើង… សូមអរគុណ!",
  },
  fr: {
    msg: "Installez Kampot Heritage sur votre appareil pour un accès hors ligne",
    install: "Installer",
    success: "Installation… Merci !",
  },
} as const;

type Lang = keyof typeof INSTALL_TEXT;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPromptBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("kampot_lang") as Lang | null;
    if (stored && stored in INSTALL_TEXT) setLang(stored);

    const onStorage = () => {
      const l = localStorage.getItem("kampot_lang") as Lang | null;
      if (l && l in INSTALL_TEXT) setLang(l);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setTimeout(() => setVisible(false), 2500);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  if (!visible) return null;

  const copy = INSTALL_TEXT[lang];

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between gap-3 px-4 py-3 text-white shadow-lg"
      style={{ background: "oklch(0.38 0.14 35)" }}
      role="banner"
      data-ocid="pwa.install_banner"
    >
      <span className="text-sm font-body leading-snug flex-1 min-w-0 truncate">
        📲 {installed ? copy.success : copy.msg}
      </span>
      {!installed && (
        <button
          type="button"
          onClick={handleInstall}
          className="shrink-0 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full px-4 py-1 text-sm font-semibold font-body transition-colors duration-150"
          data-ocid="pwa.install_button"
        >
          {copy.install}
        </button>
      )}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss install banner"
        className="shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-150"
        data-ocid="pwa.close_button"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

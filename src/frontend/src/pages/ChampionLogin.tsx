import { createActor } from "@/backend";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { OnboardingStatus, UserRole } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { AlertCircle, ArrowRight, Loader2, Phone, Star, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Lang = "en" | "km" | "fr";

const T = {
  title: {
    en: "Champion Login",
    km: "ចូលជាអ្នកជើងឯក",
    fr: "Connexion Champion",
  },
  subtitle: {
    en: "Enter your registered phone number to access your Champion Portal.",
    km: "បញ្ចូលលេខទូរស័ព្ទដែលបានចុះឈ្មោះរបស់អ្នក ដើម្បីចូលទៅ Portal អ្នកជើងឯក។",
    fr: "Entrez votre numéro de téléphone enregistré pour accéder à votre portail Champion.",
  },
  phonePlaceholder: {
    en: "+855 12 345 678",
    km: "+855 12 345 678",
    fr: "+855 12 345 678",
  },
  phoneLabel: {
    en: "Phone Number",
    km: "លេខទូរស័ព្ទ",
    fr: "Numéro de Téléphone",
  },
  loginButton: {
    en: "Access My Portal",
    km: "ចូល Portal របស់ខ្ញុំ",
    fr: "Accéder à Mon Portail",
  },
  notFound: {
    en: "No champion found with this phone number. Please check your number or apply at 'Become a Champion'.",
    km: "រកមិនឃើញអ្នកជើងឯកដែលមានលេខទូរស័ព្ទនេះ។ សូមពិនិត្យលេខ ឬដាក់ពាក្យ 'ក្លាយជាអ្នកជើងឯក'។",
    fr: "Aucun champion trouvé avec ce numéro. Vérifiez votre numéro ou postulez via 'Devenir Champion'.",
  },
  notChampion: {
    en: "This account is not registered as a Champion.",
    km: "គណនីនេះមិនបានចុះឈ្មោះជាអ្នកជើងឯកទេ។",
    fr: "Ce compte n'est pas enregistré en tant que Champion.",
  },
  pending: {
    en: "Your application is pending approval. A staff member will contact you.",
    km: "ពាក្យសុំរបស់អ្នកកំពុងរង់ចាំការអនុម័ត។ បុគ្គលិករបស់យើងនឹងទំនាក់ទំនងអ្នក។",
    fr: "Votre demande est en attente d'approbation. Un membre du personnel vous contactera.",
  },
  rejected: {
    en: "Your application was not approved. Please contact us.",
    km: "ពាក្យសុំរបស់អ្នកមិនបានអនុម័ត។ សូមទំនាក់ទំនងយើង។",
    fr: "Votre demande n'a pas été approuvée. Veuillez nous contacter.",
  },
  phoneRequired: {
    en: "Please enter your phone number.",
    km: "សូមបញ្ចូលលេខទូរស័ព្ទ។",
    fr: "Veuillez entrer votre numéro de téléphone.",
  },
  becomeChampion: {
    en: "Become a Champion",
    km: "ក្លាយជាអ្នកជើងឯក",
    fr: "Devenir Champion",
  },
  contactUs: {
    en: "Contact Us",
    km: "ទំនាក់ទំនង",
    fr: "Nous Contacter",
  },
  backToHome: {
    en: "Back to Home",
    km: "ត្រឡប់ទៅផ្ទះ",
    fr: "Retour à l'Accueil",
  },
  loading: {
    en: "Verifying…",
    km: "កំពុងផ្ទៀងផ្ទាត់…",
    fr: "Vérification…",
  },
};

function tl(key: keyof typeof T, lang: Lang): string {
  return T[key][lang];
}

type LoginState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "not_found" }
  | { status: "not_champion" }
  | { status: "pending" }
  | { status: "rejected" }
  | { status: "error"; message: string };

export default function ChampionLogin() {
  const [lang, _setLang] = useState<Lang>(() => {
    return (localStorage.getItem("kampot_lang") as Lang | null) ?? "en";
  });
  const [phone, setPhone] = useState("");
  const [loginState, setLoginState] = useState<LoginState>({ status: "idle" });
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();

  const isActorReady = !!actor && !isFetching;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = phone.trim();
    if (!trimmed) {
      setLoginState({ status: "error", message: tl("phoneRequired", lang) });
      return;
    }
    if (!isActorReady) {
      setLoginState({ status: "loading" });
      return;
    }

    setLoginState({ status: "loading" });
    try {
      const user = await actor.getUserByPhone(trimmed);
      if (!user) {
        setLoginState({ status: "not_found" });
        return;
      }
      if (user.role !== UserRole.champion) {
        setLoginState({ status: "not_champion" });
        return;
      }
      if (user.onboardingStatus === OnboardingStatus.pending) {
        setLoginState({ status: "pending" });
        return;
      }
      if (user.onboardingStatus === OnboardingStatus.rejected) {
        setLoginState({ status: "rejected" });
        return;
      }
      // Approved champion — store ID in sessionStorage and redirect
      sessionStorage.setItem("champion_id", user.id.toString());
      localStorage.setItem("kampot_lang", lang);
      navigate("/champion/dashboard");
    } catch {
      setLoginState({
        status: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  }

  const isLoading = loginState.status === "loading";

  function ErrorBanner({
    message,
    action,
  }: {
    message: string;
    action?: { label: string; href: string };
  }) {
    return (
      <div
        data-ocid="champion_login.error_state"
        className="flex flex-col gap-2 bg-destructive/10 border border-destructive/30 rounded-xl p-4"
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive font-body leading-snug">
            {message}
          </p>
        </div>
        {action && (
          <a
            href={action.href}
            className="text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80 ml-7"
          >
            {action.label} →
          </a>
        )}
      </div>
    );
  }

  function renderError() {
    switch (loginState.status) {
      case "not_found":
        return (
          <ErrorBanner
            message={tl("notFound", lang)}
            action={{
              label: tl("becomeChampion", lang),
              href: "/become-a-champion",
            }}
          />
        );
      case "not_champion":
        return <ErrorBanner message={tl("notChampion", lang)} />;
      case "pending":
        return <ErrorBanner message={tl("pending", lang)} />;
      case "rejected":
        return (
          <ErrorBanner
            message={tl("rejected", lang)}
            action={{
              label: tl("contactUs", lang),
              href: "https://wa.me/85569859870",
            }}
          />
        );
      case "error":
        return <ErrorBanner message={loginState.message} />;
      default:
        return null;
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="champion_login.page"
    >
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="/"
            className="font-display text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Kampot Heritage
          </a>
          {/* Language switcher + close */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Back to home"
              data-ocid="champion_login.close_button"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-br from-primary/90 to-primary px-6 py-8 text-primary-foreground text-center">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display font-bold mb-1">
                {tl("title", lang)}
              </h1>
              <p className="text-primary-foreground/75 text-sm font-body leading-snug">
                {tl("subtitle", lang)}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="champion-phone"
                  className="text-sm font-semibold text-foreground font-body"
                >
                  {tl("phoneLabel", lang)}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="champion-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setLoginState({ status: "idle" });
                    }}
                    placeholder={tl("phonePlaceholder", lang)}
                    autoComplete="tel"
                    data-ocid="champion_login.phone_input"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {renderError()}

              <button
                type="submit"
                data-ocid="champion_login.submit_button"
                disabled={isLoading || !isActorReady}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-body font-semibold rounded-xl py-3 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {tl("loading", lang)}
                  </>
                ) : (
                  <>
                    {tl("loginButton", lang)}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <a
                href="/"
                data-ocid="champion_login.back_link"
                className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                ← {tl("backToHome", lang)}
              </a>
            </form>
          </div>

          {/* Not yet a champion? */}
          <p className="text-center text-sm text-muted-foreground font-body mt-6">
            Not yet a champion?{" "}
            <a
              href="/become-a-champion"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              Apply here
            </a>
          </p>
        </div>
      </main>
      <FloatingContactButtons />
    </div>
  );
}

import { c as createLucideIcon, r as reactExports, d as useNavigate, j as jsxRuntimeExports, I as LanguageSwitcher, X, J as FloatingContactButtons } from "./index-DzwzmQd8.js";
import { u as useActor, U as UserRole, O as OnboardingStatus, c as createActor } from "./backend-BGqH3Hc2.js";
import { S as Star } from "./star-BSZ70W1g.js";
import { P as Phone } from "./phone-DctjWWXA.js";
import { L as LoaderCircle } from "./loader-circle-5P3w27aN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
const T = {
  title: {
    en: "Champion Login",
    km: "ចូលជាអ្នកជើងឯក",
    fr: "Connexion Champion"
  },
  subtitle: {
    en: "Enter your registered phone number to access your Champion Portal.",
    km: "បញ្ចូលលេខទូរស័ព្ទដែលបានចុះឈ្មោះរបស់អ្នក ដើម្បីចូលទៅ Portal អ្នកជើងឯក។",
    fr: "Entrez votre numéro de téléphone enregistré pour accéder à votre portail Champion."
  },
  phonePlaceholder: {
    en: "+855 12 345 678",
    km: "+855 12 345 678",
    fr: "+855 12 345 678"
  },
  phoneLabel: {
    en: "Phone Number",
    km: "លេខទូរស័ព្ទ",
    fr: "Numéro de Téléphone"
  },
  loginButton: {
    en: "Access My Portal",
    km: "ចូល Portal របស់ខ្ញុំ",
    fr: "Accéder à Mon Portail"
  },
  notFound: {
    en: "No champion found with this phone number. Please check your number or apply at 'Become a Champion'.",
    km: "រកមិនឃើញអ្នកជើងឯកដែលមានលេខទូរស័ព្ទនេះ។ សូមពិនិត្យលេខ ឬដាក់ពាក្យ 'ក្លាយជាអ្នកជើងឯក'។",
    fr: "Aucun champion trouvé avec ce numéro. Vérifiez votre numéro ou postulez via 'Devenir Champion'."
  },
  notChampion: {
    en: "This account is not registered as a Champion.",
    km: "គណនីនេះមិនបានចុះឈ្មោះជាអ្នកជើងឯកទេ។",
    fr: "Ce compte n'est pas enregistré en tant que Champion."
  },
  pending: {
    en: "Your application is pending approval. A staff member will contact you.",
    km: "ពាក្យសុំរបស់អ្នកកំពុងរង់ចាំការអនុម័ត។ បុគ្គលិករបស់យើងនឹងទំនាក់ទំនងអ្នក។",
    fr: "Votre demande est en attente d'approbation. Un membre du personnel vous contactera."
  },
  rejected: {
    en: "Your application was not approved. Please contact us.",
    km: "ពាក្យសុំរបស់អ្នកមិនបានអនុម័ត។ សូមទំនាក់ទំនងយើង។",
    fr: "Votre demande n'a pas été approuvée. Veuillez nous contacter."
  },
  phoneRequired: {
    en: "Please enter your phone number.",
    km: "សូមបញ្ចូលលេខទូរស័ព្ទ។",
    fr: "Veuillez entrer votre numéro de téléphone."
  },
  becomeChampion: {
    en: "Become a Champion",
    km: "ក្លាយជាអ្នកជើងឯក",
    fr: "Devenir Champion"
  },
  contactUs: {
    en: "Contact Us",
    km: "ទំនាក់ទំនង",
    fr: "Nous Contacter"
  },
  backToHome: {
    en: "Back to Home",
    km: "ត្រឡប់ទៅផ្ទះ",
    fr: "Retour à l'Accueil"
  },
  loading: {
    en: "Verifying…",
    km: "កំពុងផ្ទៀងផ្ទាត់…",
    fr: "Vérification…"
  }
};
function tl(key, lang) {
  return T[key][lang];
}
function ChampionLogin() {
  const [lang, _setLang] = reactExports.useState(() => {
    return localStorage.getItem("kampot_lang") ?? "en";
  });
  const [phone, setPhone] = reactExports.useState("");
  const [loginState, setLoginState] = reactExports.useState({ status: "idle" });
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const isActorReady = !!actor && !isFetching;
  async function handleLogin(e) {
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
      sessionStorage.setItem("champion_id", user.id.toString());
      localStorage.setItem("kampot_lang", lang);
      navigate("/champion/dashboard");
    } catch {
      setLoginState({
        status: "error",
        message: "An unexpected error occurred. Please try again."
      });
    }
  }
  const isLoading = loginState.status === "loading";
  function ErrorBanner({
    message,
    action
  }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "champion_login.error_state",
        className: "flex flex-col gap-2 bg-destructive/10 border border-destructive/30 rounded-xl p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-body leading-snug", children: message })
          ] }),
          action && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: action.href,
              className: "text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80 ml-7",
              children: [
                action.label,
                " →"
              ]
            }
          )
        ]
      }
    );
  }
  function renderError() {
    switch (loginState.status) {
      case "not_found":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorBanner,
          {
            message: tl("notFound", lang),
            action: {
              label: tl("becomeChampion", lang),
              href: "/become-a-champion"
            }
          }
        );
      case "not_champion":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: tl("notChampion", lang) });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: tl("pending", lang) });
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorBanner,
          {
            message: tl("rejected", lang),
            action: {
              label: tl("contactUs", lang),
              href: "https://wa.me/85569859870"
            }
          }
        );
      case "error":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBanner, { message: loginState.message });
      default:
        return null;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "champion_login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/",
              className: "font-display text-xl font-semibold text-primary hover:text-primary/80 transition-colors",
              children: "Kampot Heritage"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitcher, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate("/"),
                "aria-label": "Back to home",
                "data-ocid": "champion_login.close_button",
                className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-primary/90 to-primary px-6 py-8 text-primary-foreground text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary-foreground/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-7 h-7 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold mb-1", children: tl("title", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-sm font-body leading-snug", children: tl("subtitle", lang) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "p-6 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "champion-phone",
                    className: "text-sm font-semibold text-foreground font-body",
                    children: tl("phoneLabel", lang)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "champion-phone",
                      type: "tel",
                      value: phone,
                      onChange: (e) => {
                        setPhone(e.target.value);
                        setLoginState({ status: "idle" });
                      },
                      placeholder: tl("phonePlaceholder", lang),
                      autoComplete: "tel",
                      "data-ocid": "champion_login.phone_input",
                      className: "w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors",
                      disabled: isLoading
                    }
                  )
                ] })
              ] }),
              renderError(),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  "data-ocid": "champion_login.submit_button",
                  disabled: isLoading || !isActorReady,
                  className: "flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-body font-semibold rounded-xl py-3 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
                  children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    tl("loading", lang)
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    tl("loginButton", lang),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "/",
                  "data-ocid": "champion_login.back_link",
                  className: "text-center text-sm text-muted-foreground hover:text-foreground transition-colors font-body",
                  children: [
                    "← ",
                    tl("backToHome", lang)
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground font-body mt-6", children: [
            "Not yet a champion?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/become-a-champion",
                className: "text-primary font-semibold hover:underline underline-offset-2",
                children: "Apply here"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingContactButtons, {})
      ]
    }
  );
}
export {
  ChampionLogin as default
};

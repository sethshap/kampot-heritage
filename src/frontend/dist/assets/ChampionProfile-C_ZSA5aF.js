import { c as createLucideIcon, K as useParams, u as useLanguage, d as useNavigate, b as bigintToNumber, j as jsxRuntimeExports, L as Link, I as LanguageSwitcher, X, J as FloatingContactButtons, B as Button, U as Users, f as formatKhr } from "./index-DzwzmQd8.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BGqH3Hc2.js";
import { C as Card, a as CardContent } from "./card-C_MFbrfg.js";
import { S as Skeleton } from "./skeleton-BeFdBAXY.js";
import { S as ShoppingBag } from "./shopping-bag-CuUe7BAL.js";
import { T as TrendingUp, A as Award } from "./trending-up-sBFPvY4q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function useApprovedChampions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["approvedChampions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedChampions();
    },
    enabled: !!actor && !isFetching
  });
}
function useChampionMetrics(championId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["championMetrics", String(championId)],
    queryFn: async () => {
      if (!actor || championId === null) return null;
      return actor.getChampionMetrics(championId);
    },
    enabled: !!actor && !isFetching && championId !== null
  });
}
function ChampionInitialsAvatar({ name }) {
  const initials = name.split(" ").map((w) => w[0] ?? "").slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-72 sm:h-80 bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-7xl font-display font-bold text-primary", children: initials }) });
}
function MetricCard({ icon, label, value, sub, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: sub })
  ] }) });
}
function ChampionProfile() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { data: champions, isLoading: championsLoading } = useApprovedChampions();
  const champion = (champions == null ? void 0 : champions.find((c) => String(c.id) === id)) ?? null;
  const championBigInt = champion ? champion.id : null;
  const { data: metrics, isLoading: metricsLoading } = useChampionMetrics(championBigInt);
  const isLoading = championsLoading;
  const getName = (c) => {
    if (lang === "km" && c.fullNameKm) return c.fullNameKm;
    if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
    return c.fullNameEn;
  };
  const getBio = (c) => {
    return (lang === "km" ? c.bioKm : lang === "fr" ? c.bioFr : c.bioEn) ?? c.bioEn ?? "";
  };
  const sponsorCount = metrics ? bigintToNumber(metrics.sponsorCount) : 0;
  const bottlesSold = metrics ? bigintToNumber(metrics.bottlesSold) : 0;
  const earningsKhr = metrics ? bigintToNumber(metrics.totalEarningsKhr) : 0;
  const earningsUsd = metrics ? metrics.totalEarningsUsd : 0;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-50 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "font-display font-bold text-lg text-foreground",
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
              "data-ocid": "champion-profile.close_button",
              className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-2xl mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-1/2 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingContactButtons, {})
    ] });
  }
  if (!isLoading && !champion) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-50 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "font-display font-bold text-lg text-foreground",
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
              "data-ocid": "champion-profile.close_button",
              className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "container mx-auto px-4 py-24 max-w-lg text-center",
          "data-ocid": "champion-profile.not_found",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6", children: "🌿" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Champion not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-8", children: "This champion may no longer be active or the link may be incorrect." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "champion-profile.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
              "Back to Champions Gallery"
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingContactButtons, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "champion-profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-50 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm",
              "data-ocid": "champion-profile.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "font-display font-bold text-lg text-foreground",
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
                "data-ocid": "champion-profile.close_button",
                className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden mb-8 shadow-md", children: champion.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: champion.avatarUrl,
              alt: getName(champion),
              className: "w-full h-72 sm:h-80 object-cover",
              loading: "eager"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionInitialsAvatar, { name: getName(champion) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-4",
                "data-ocid": "champion-profile.name",
                children: getName(champion)
              }
            ),
            getBio(champion) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-muted-foreground font-body text-base leading-relaxed",
                "data-ocid": "champion-profile.bio",
                children: getBio(champion)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10",
              "data-ocid": "champion-profile.metrics",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricCard,
                  {
                    ocid: "champion-profile.sponsors_card",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
                    label: "Sponsors",
                    value: sponsorCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground", children: "First supporter!" }) : sponsorCount,
                    sub: sponsorCount > 0 ? `${sponsorCount} hotel${sponsorCount !== 1 ? "s" : ""} supporting` : "Be the first!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricCard,
                  {
                    ocid: "champion-profile.bottles_card",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5" }),
                    label: "Bottles Sold",
                    value: bottlesSold.toLocaleString("en-US"),
                    sub: "bottles of Kampot Heritage Soap"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MetricCard,
                  {
                    ocid: "champion-profile.earnings_card",
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
                    label: "Total Earned",
                    value: metricsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: formatKhr(earningsKhr) }),
                    sub: earningsUsd > 0 ? `($${earningsUsd.toFixed(2)} USD)` : void 0
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-xl p-5 mb-8 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-body text-muted-foreground leading-relaxed", children: [
              "Every order you place through",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: getName(champion) }),
              " ",
              "contributes directly to their income — helping them build financial independence and eventually sponsor the next champion."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "w-full text-base",
              "data-ocid": "champion-profile.support_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/hotel/select?champion=${String(champion.id)}`, children: [
                "Support ",
                getName(champion),
                " — Order Now"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingContactButtons, {})
      ]
    }
  );
}
export {
  ChampionProfile as default
};

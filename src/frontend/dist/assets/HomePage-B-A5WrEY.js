import { j as jsxRuntimeExports, B as Button, L as Link, u as useLanguage, a as useCart, r as reactExports, C as CartDrawer, b as bigintToNumber, f as formatKhr, S as ShoppingCart, M as Minus, P as Plus } from "./index-DzwzmQd8.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BGqH3Hc2.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-Cu4nxCFy.js";
import { B as Badge } from "./badge-BLsWhtHR.js";
import { C as Card, a as CardContent } from "./card-C_MFbrfg.js";
import { S as Skeleton } from "./skeleton-BeFdBAXY.js";
import { u as useTranslations } from "./useTranslations-D3DJerXi.js";
function useActiveProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["activeProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveProducts();
    },
    enabled: !!actor && !isFetching
  });
}
function useImpactStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["impactStats"],
    queryFn: async () => {
      if (!actor)
        return {
          championsEmpowered: 0n,
          totalCommunityEarningsKhr: 0n,
          localValueCirculatedKhr: 0n
        };
      return actor.getImpactStats();
    },
    enabled: !!actor && !isFetching
  });
}
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
function useAllChampionMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allChampionMetrics"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllChampionMetrics();
    },
    enabled: !!actor && !isFetching
  });
}
function HeroSection() {
  const { t, isLoading } = useTranslations();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-[92vh] flex items-center justify-center overflow-hidden",
      style: {
        background: "linear-gradient(135deg, oklch(0.45 0.14 35) 0%, oklch(0.52 0.16 45) 40%, oklch(0.62 0.18 60) 100%)"
      },
      "data-ocid": "hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center opacity-20",
            style: {
              backgroundImage: "url('/assets/generated/hero-soap.dim_1200x600.jpg')"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-5",
            style: {
              backgroundImage: "repeating-linear-gradient(45deg, oklch(0.96 0.01 75) 0, oklch(0.96 0.01 75) 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-4 py-20 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body tracking-widest uppercase text-white/90", children: "🌿 100% CAMBODIAN • ETHICALLY MADE" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-96 mx-auto bg-white/20" }) : "Turning Local Lives Into Local Livelihoods" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl sm:text-2xl font-semibold text-white/90 mb-6 drop-shadow", children: "Every bottle of Kampot Heritage Soap keeps Cambodian spending inside Cambodia — in the hands of champions rebuilding their lives." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full bg-white/20" }) : t("hero_subheadline") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "lg",
                className: "bg-white text-primary hover:bg-white/90 font-semibold text-base px-8 py-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105",
                "data-ocid": "hero.become_champion_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/become-a-champion", children: "Become a Champion →" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "lg",
                className: "border-white/60 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-200",
                "data-ocid": "hero.order_now_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#products", children: "Order Now ↓" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto", children: [
            { value: "💸 $49.3M+", label: "Lost yearly to imports" },
            { value: "🌿 100%", label: "Locally produced" },
            { value: "🏆 $150–200", label: "Monthly champion income" }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-white", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/70 font-body mt-1", children: stat.label })
          ] }, stat.label)) })
        ] })
      ]
    }
  );
}
function ImpactNumbersSection() {
  const { t } = useTranslations();
  const cards = [
    { amount: "$45.6M", label: t("to_thailand"), flag: "🇹🇭" },
    { amount: "$3.7M+", label: t("to_vietnam"), flag: "🇻🇳" },
    { amount: "$49.3M+", label: t("total_loss"), flag: "💸" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-20",
      style: { background: "oklch(0.14 0.015 50)" },
      "data-ocid": "impact.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body tracking-widest uppercase mb-2 text-white/40", children: "The Problem We're Solving" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-display text-xl sm:text-2xl font-bold mb-2 text-white/90 uppercase tracking-wider max-w-3xl mx-auto leading-tight", children: t("economic_loss_title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-white/50 text-sm mb-8 font-body", children: "Yearly on soap & cleaning products alone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8", children: cards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white/5 border border-white/10 rounded-2xl p-8 text-center",
            "data-ocid": `impact.card.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: card.flag }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl sm:text-5xl font-bold text-white mb-2", children: card.amount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/70 text-sm font-body uppercase tracking-wider", children: card.label })
            ]
          },
          card.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "max-w-2xl mx-auto rounded-2xl border border-white/20 p-6 mb-8 text-center",
            style: { background: "oklch(0.20 0.025 50)" },
            "data-ocid": "impact.families_stat",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl sm:text-4xl font-bold text-white mb-2", children: "245,000 – 326,000" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/70 text-sm font-body leading-relaxed", children: "Cambodian families impacted every year by economic leakage from foreign soap imports — money that could stay in Cambodia." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap justify-center gap-3 mb-4",
            "data-ocid": "impact.badges",
            children: [
              { icon: "👩‍👧‍👦", label: "Women & Family Focused" },
              { icon: "🤝", label: "Ethical Production" },
              { icon: "♻️", label: "Sustainable Impact" }
            ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 bg-primary/80 border border-primary/60 rounded-full px-5 py-2 text-white font-body text-sm font-semibold tracking-wide",
                "data-ocid": `impact.badge.${badge.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-hidden": "true", children: badge.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.label })
                ]
              },
              badge.label
            ))
          }
        )
      ] })
    }
  );
}
const FEATURES = [
  {
    icon: "🦟",
    title: "Repels Flies",
    desc: "Natural lemongrass oil keeps insects away"
  },
  {
    icon: "✨",
    title: "Superior Cleaning",
    desc: "Deep clean without harsh chemicals"
  },
  {
    icon: "🤲",
    title: "Softens Hands",
    desc: "Vegetable glycerin for gentle care"
  },
  {
    icon: "🌿",
    title: "Smells Amazing",
    desc: "Fresh lemongrass scent all day"
  },
  {
    icon: "✅",
    title: "Quality Controlled",
    desc: "Every batch tested before shipping"
  }
];
function HowItWorksSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "features.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground", children: "The Difference" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-display text-3xl sm:text-4xl font-bold mb-12 text-foreground", children: "Why Kampot Heritage Soap?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl p-6 text-center border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-200",
        "data-ocid": `features.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: f.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground mb-1", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: f.desc })
        ]
      },
      f.title
    )) })
  ] }) });
}
const INGREDIENTS = [
  { name: "Lemongrass Oil", icon: "🌿" },
  { name: "Kampot Sea Salt", icon: "🧂" },
  { name: "Vegetable Glycerin", icon: "🪷" },
  { name: "No Harsh Chemicals", icon: "🚫" }
];
function IngredientsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16",
      style: { background: "oklch(0.94 0.018 75)" },
      "data-ocid": "ingredients.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold mb-10 text-foreground", children: "What's Inside" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4", children: INGREDIENTS.map((ing) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "inline-flex items-center gap-2 bg-white border border-border rounded-full px-6 py-3 shadow-sm text-foreground font-body text-sm font-medium",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ing.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ing.name })
            ]
          },
          ing.name
        )) })
      ] })
    }
  );
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-1/3" })
  ] });
}
function ProductsSection() {
  const { t } = useTranslations();
  const { lang } = useLanguage();
  const { data: products, isLoading } = useActiveProducts();
  const { addItem, updateQuantity, items: cartItems } = useCart();
  const [cartOpen, setCartOpen] = reactExports.useState(false);
  const getName = (p) => {
    if (lang === "km" && p.nameKm) return p.nameKm;
    if (lang === "fr" && p.nameFr) return p.nameFr;
    return p.nameEn;
  };
  const getDesc = (p) => {
    if (lang === "km" && p.descriptionKm) return p.descriptionKm;
    if (lang === "fr" && p.descriptionFr) return p.descriptionFr;
    return p.descriptionEn ?? "";
  };
  function getQty(p) {
    var _a;
    return ((_a = cartItems.find((i) => i.productId === p.id.toString())) == null ? void 0 : _a.quantity) ?? 0;
  }
  function handleAddToCart(p) {
    addItem({
      productId: p.id.toString(),
      nameEn: p.nameEn,
      nameKm: p.nameKm,
      nameFr: p.nameFr,
      quantity: 1,
      unitPriceKhr: bigintToNumber(p.retailPriceKhr),
      unitPriceUsd: p.retailPriceUsd,
      commissionKhr: bigintToNumber(p.championCommissionKhr)
    });
  }
  function handleSetQty(p, qty) {
    if (qty <= 0) {
      updateQuantity(p.id.toString(), 0);
    } else {
      const existing = cartItems.find((i) => i.productId === p.id.toString());
      if (!existing) {
        handleAddToCart(p);
      } else {
        updateQuantity(p.id.toString(), qty);
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, { open: cartOpen, onClose: () => setCartOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "products",
        className: "py-20 bg-background",
        "data-ocid": "products.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground", children: "Kampot Heritage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-display text-3xl sm:text-4xl font-bold mb-12 text-foreground", children: "Available Sizes" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {})
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto", children: (products ?? []).map((p, i) => {
            const qty = getQty(p);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "bg-card border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden",
                "data-ocid": `products.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: "font-body text-xs uppercase tracking-wider",
                        children: [
                          p.unitSize,
                          " ",
                          p.unitMeasurement
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: p.skuCode })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-3", children: getName(p) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body leading-relaxed mb-6", children: getDesc(p) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-4 mb-4",
                      style: { background: "oklch(0.96 0.018 75)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body uppercase tracking-wider mb-1", children: "Retail Price" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CurrencyDisplay,
                          {
                            khr: bigintToNumber(p.retailPriceKhr),
                            usd: p.retailPriceUsd,
                            size: "lg"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: "🏆" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-body", children: [
                      t("earns_champion"),
                      ":"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground font-body", children: formatKhr(bigintToNumber(p.championCommissionKhr)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "($",
                      p.championCommissionUsd.toFixed(2),
                      ")"
                    ] })
                  ] }),
                  qty === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      className: "w-full font-semibold",
                      onClick: () => handleAddToCart(p),
                      "data-ocid": `products.add_to_cart.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                        "Add to Cart"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between bg-primary/5 rounded-xl p-2 border border-primary/20",
                      "data-ocid": `products.quantity_controls.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            className: "w-9 h-9 p-0 rounded-full",
                            onClick: () => handleSetQty(p, qty - 1),
                            "aria-label": "Decrease quantity",
                            "data-ocid": `products.decrement.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground min-w-[2.5rem] text-center", children: qty }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            className: "w-9 h-9 p-0 rounded-full",
                            onClick: () => handleSetQty(p, qty + 1),
                            "aria-label": "Increase quantity",
                            "data-ocid": `products.increment.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                          }
                        )
                      ]
                    }
                  ),
                  qty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "w-full mt-2 text-primary border-primary/40",
                      onClick: () => setCartOpen(true),
                      "data-ocid": `products.view_cart.${i + 1}`,
                      children: [
                        "View Cart (",
                        qty,
                        " in cart)"
                      ]
                    }
                  )
                ] })
              },
              String(p.id)
            );
          }) })
        ] })
      }
    )
  ] });
}
const MISSION_BADGES = [
  { icon: "👩‍👧‍👦", label: "Women & Family Focused" },
  { icon: "🤝", label: "Ethical Production" },
  { icon: "♻️", label: "Sustainable Impact" }
];
function MissionStatementSection() {
  const { t } = useTranslations();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-24",
      style: {
        background: "linear-gradient(135deg, oklch(0.52 0.13 40) 0%, oklch(0.44 0.11 35) 100%)"
      },
      "data-ocid": "mission-statement.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-white/80 font-body text-base leading-relaxed mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("income_goal") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: t("pay_forward") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap justify-center gap-3 mt-8",
            "data-ocid": "mission.badges",
            children: MISSION_BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm rounded-full px-5 py-2.5 text-white font-body text-sm font-semibold tracking-wide",
                "data-ocid": `mission.badge.${badge.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-hidden": "true", children: badge.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.label })
                ]
              },
              badge.label
            ))
          }
        )
      ] })
    }
  );
}
function ImpactDashboardSection() {
  const { data: stats, isLoading } = useImpactStats();
  const statCards = [
    {
      label: "🏆 Champion Goal: 10",
      value: isLoading ? null : String((stats == null ? void 0 : stats.championsEmpowered) ?? 0n),
      subtitle: "Be one of our first 10 champions",
      icon: "🏆"
    },
    {
      label: "💰 Community Target: 6,000,000 ៛/month",
      value: isLoading ? null : formatKhr(bigintToNumber((stats == null ? void 0 : stats.totalCommunityEarningsKhr) ?? 0n)),
      subtitle: "Building sustainable monthly income for champions",
      icon: "💰"
    },
    {
      label: "🔄 Local Value Goal",
      value: isLoading ? null : formatKhr(bigintToNumber((stats == null ? void 0 : stats.localValueCirculatedKhr) ?? 0n)),
      subtitle: "Keep it all in Cambodia",
      icon: "🔄"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-muted/40", "data-ocid": "impact-dashboard.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground", children: "Real Impact, Real Champions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-display text-3xl sm:text-4xl font-bold mb-2 text-foreground", children: "Our Impact" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground font-body mb-12 text-sm", children: "Live figures from our champion network" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto", children: statCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl p-8 text-center border border-border shadow-sm",
        "data-ocid": `impact-dashboard.${card.label.toLowerCase().replace(/ /g, "_")}.card`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: card.icon }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 mx-auto mb-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-accent mb-2", children: card.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-body uppercase tracking-wider mb-2", children: card.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: card.subtitle })
        ]
      },
      card.label
    )) })
  ] }) });
}
function ChampionInitials({ name }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full h-48 flex items-center justify-center font-display text-4xl font-bold text-white",
      style: { background: "oklch(0.52 0.13 40)" },
      children: initials
    }
  );
}
function ChampionMetricChips({
  metrics
}) {
  const sponsors = metrics ? Number(metrics.sponsorCount) : 0;
  const bottles = metrics ? Number(metrics.bottlesSold) : 0;
  const earningsKhr = metrics ? Number(metrics.totalEarningsKhr) : 0;
  const earningsUsd = metrics ? metrics.totalEarningsUsd : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-medium", children: [
      "🏆",
      " ",
      sponsors === 0 ? "First supporter!" : `${sponsors} sponsor${sponsors !== 1 ? "s" : ""}`
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-foreground text-xs font-body font-medium", children: [
      "🧴 ",
      bottles.toLocaleString("en-US"),
      " bottles sold"
    ] }),
    earningsKhr > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: formatKhr(earningsKhr) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs opacity-70", children: [
        "(",
        `$${earningsUsd.toFixed(2)}`,
        ")"
      ] })
    ] })
  ] });
}
function ChampionsGallerySection() {
  const { t } = useTranslations();
  const { lang } = useLanguage();
  const { data: champions, isLoading } = useApprovedChampions();
  const { data: allMetrics } = useAllChampionMetrics();
  const metricsMap = new Map(
    (allMetrics ?? []).map((m) => [String(m.championId), m])
  );
  const getName = (c) => {
    if (lang === "km" && c.fullNameKm) return c.fullNameKm;
    if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
    return c.fullNameEn;
  };
  const getBio = (c) => {
    const raw = (lang === "km" ? c.bioKm : lang === "fr" ? c.bioFr : c.bioEn) ?? c.bioEn ?? "";
    return raw.length > 120 ? `${raw.slice(0, 117)}…` : raw;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "champions-gallery",
      className: "py-20 bg-background",
      "data-ocid": "champions-gallery.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground", children: "The People Behind Every Bottle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-display text-3xl sm:text-4xl font-bold mb-12 text-foreground", children: t("meet_our_champions") }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-2xl border border-border overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full mt-2" })
              ] })
            ]
          },
          i
        )) }) : !champions || champions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-16",
            "data-ocid": "champions-gallery.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🌱" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mb-6", children: "Be the first champion in our network!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  "data-ocid": "champions-gallery.become_champion_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/become-a-champion", children: "Become a Champion" })
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto", children: champions.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "bg-card border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
            "data-ocid": `champions-gallery.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/champion/${String(c.id)}`, children: c.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: c.avatarUrl,
                  alt: getName(c),
                  className: "w-full h-48 object-cover",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionInitials, { name: getName(c) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: `/champion/${String(c.id)}`,
                    className: "hover:text-primary transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-2", children: getName(c) })
                  }
                ),
                getBio(c) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body leading-relaxed mb-3", children: getBio(c) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionMetricChips, { metrics: metricsMap.get(String(c.id)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      variant: "outline",
                      className: "flex-1",
                      size: "sm",
                      "data-ocid": `champions-gallery.view_profile_link.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/champion/${String(c.id)}`, children: "View Profile" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      className: "flex-1",
                      size: "sm",
                      "data-ocid": `champions-gallery.support_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/hotel/select?champion=${String(c.id)}`, children: "Support" })
                    }
                  )
                ] })
              ] })
            ]
          },
          String(c.id)
        )) })
      ] })
    }
  );
}
const TARGET_MARKETS = [
  { icon: "🍽️", label: "Restaurants" },
  { icon: "🏨", label: "Hotels" },
  { icon: "🌴", label: "Resorts" },
  { icon: "☕", label: "Cafes" },
  { icon: "🛒", label: "Retailers" }
];
function TargetMarketsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-16 bg-card border-y border-border",
      "data-ocid": "target-markets.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground", children: "Perfect For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center font-display text-2xl sm:text-3xl font-bold mb-10 text-foreground", children: "Who We Serve" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4 max-w-3xl mx-auto", children: TARGET_MARKETS.map((market, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-2 bg-background border border-border rounded-2xl px-8 py-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-w-[110px]",
            "data-ocid": `target-markets.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", role: "img", "aria-label": market.label, children: market.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold text-foreground", children: market.label })
            ]
          },
          market.label
        )) })
      ] })
    }
  );
}
function HomeFooter() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "py-12 text-center border-t border-border",
      style: { background: "oklch(0.18 0.02 50)" },
      "data-ocid": "footer.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "font-semibold rounded-full px-8 bg-amber-500 text-white hover:bg-amber-600 border-0",
              "data-ocid": "footer.order_now_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#products", children: "ORDER NOW" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "lg",
              type: "button",
              className: "font-semibold rounded-full px-8 border-white text-white hover:bg-white hover:text-foreground",
              "data-ocid": "footer.enquire_button",
              onClick: () => window.open(
                "mailto:hello@kampotheritage.com?subject=Enquiry",
                "_blank"
              ),
              children: "ENQUIRE"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-white/90 mb-3", children: "Build a stronger Cambodia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm font-body tracking-widest uppercase mb-8", children: "100% Cambodian • Ethically Made • Community Powered" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-6 text-white/30 text-xs font-body", children: [
          "© ",
          year,
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-white/60 transition-colors",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    }
  );
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactNumbersSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TargetMarketsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MissionStatementSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IngredientsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactDashboardSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionsGallerySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HomeFooter, {})
  ] });
}
export {
  HomePage as default
};

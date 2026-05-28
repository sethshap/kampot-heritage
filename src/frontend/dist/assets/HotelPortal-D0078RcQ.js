import { c as createLucideIcon, u as useLanguage, d as useNavigate, r as reactExports, j as jsxRuntimeExports, X, B as Button, b as bigintToNumber, f as formatKhr, D as Dialog, m as DialogContent, o as DialogHeader, p as DialogTitle, q as DialogFooter, Y as Separator, L as Link, a as useCart, R as Routes, O as Route } from "./index-DzwzmQd8.js";
import { u as useActor, a as useQuery, C as ChampionSelectionMethod, c as createActor, P as PreferredLanguage, U as UserRole } from "./backend-BGqH3Hc2.js";
import { m as makeApi } from "./api-DkfV3Yfa.js";
import { B as Badge } from "./badge-BLsWhtHR.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-C_MFbrfg.js";
import { I as Input, L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-YVq2fIQY.js";
import { S as Skeleton } from "./skeleton-BeFdBAXY.js";
import { C as CurrencyDisplay } from "./CurrencyDisplay-Cu4nxCFy.js";
import { C as CircleCheckBig, Q as QrCode } from "./qr-code-5hHf5Hbw.js";
import { S as ShoppingBag } from "./shopping-bag-CuUe7BAL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
function getChampionName$3(c, lang) {
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}
function getChampionBio$2(c, lang) {
  if (lang === "km" && c.bioKm) return c.bioKm;
  if (lang === "fr" && c.bioFr) return c.bioFr;
  return c.bioEn ?? "";
}
function AvatarInitials({
  name,
  size = "lg"
}) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const cls = size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${cls} rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0`,
      children: initials
    }
  );
}
const ui$3 = {
  en: {
    rememberTitle: "I remember my champion",
    rememberSub: "Search by name or use a remembered QR code",
    browseTitle: "Browse all champions",
    browseSub: "Choose a champion to support. Every order changes a life.",
    staffTitle: "A staff member is helping me",
    staffSub: "Contact Kampot Heritage staff to place an order on your behalf",
    searchPlaceholder: "Search champion name...",
    sortMostEarned: "Most Earned",
    sortNewest: "Newest",
    sortRandom: "Random",
    selectBtn: "Support This Champion",
    confirmTitle: "Confirm Your Champion",
    confirmBtn: "Select This Champion",
    cancelBtn: "Cancel",
    contactStaff: "Contact staff at +855 12 345 678 or staff@kampotheritage.com",
    noResults: "No champions found matching your search."
  },
  km: {
    rememberTitle: "ខ្ញុំចាំអ្នកជើងឯករបស់ខ្ញុំ",
    rememberSub: "ស្វែងរកតាមឈ្មោះ ឬប្រើកូដ QR",
    browseTitle: "រកមើលអ្នកជើងឯកទាំងអស់",
    browseSub: "ជ្រើសរើសអ្នកជើងឯកដើម្បីគាំទ្រ។ រាល់ការបញ្ជាទិញផ្លាស់ប្តូរជីវិតមួយ។",
    staffTitle: "បុគ្គលិកកំពុងជួយខ្ញុំ",
    staffSub: "ទាក់ទងបុគ្គលិក Kampot Heritage ដើម្បីដាក់ការបញ្ជាទិញជំនួស",
    searchPlaceholder: "ស្វែងរកឈ្មោះអ្នកជើងឯក...",
    sortMostEarned: "រកបានច្រើនបំផុត",
    sortNewest: "ថ្មីបំផុត",
    sortRandom: "ចៃដន្យ",
    selectBtn: "គាំទ្រអ្នកជើងឯកនេះ",
    confirmTitle: "បញ្ជាក់អ្នកជើងឯករបស់អ្នក",
    confirmBtn: "ជ្រើសរើសអ្នកជើងឯកនេះ",
    cancelBtn: "បោះបង់",
    contactStaff: "ទាក់ទងបុគ្គលិកតាម +855 12 345 678",
    noResults: "រកមិនឃើញអ្នកជើងឯកដែលត្រូវនឹងការស្វែងរក។"
  },
  fr: {
    rememberTitle: "Je me souviens de mon champion",
    rememberSub: "Rechercher par nom ou utiliser un QR code mémorisé",
    browseTitle: "Parcourir tous les champions",
    browseSub: "Choisissez un champion à soutenir. Chaque commande change une vie.",
    staffTitle: "Un membre du personnel m'aide",
    staffSub: "Contactez le personnel de Kampot Heritage pour passer une commande en votre nom",
    searchPlaceholder: "Rechercher un champion...",
    sortMostEarned: "Plus gagné",
    sortNewest: "Plus récent",
    sortRandom: "Aléatoire",
    selectBtn: "Soutenir ce champion",
    confirmTitle: "Confirmez votre champion",
    confirmBtn: "Sélectionner ce champion",
    cancelBtn: "Annuler",
    contactStaff: "Contactez le personnel au +855 12 345 678 ou staff@kampotheritage.com",
    noResults: "Aucun champion trouvé correspondant à votre recherche."
  }
};
function ChampionSelection({ onChampionSelected }) {
  const { lang } = useLanguage();
  const l = ui$3[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const { data: allMetrics } = useQuery({
    queryKey: ["allChampionMetrics"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllChampionMetrics();
    },
    enabled: !!actor && !isFetching
  });
  const metricsById = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    if (allMetrics) {
      for (const m of allMetrics) {
        map.set(m.championId.toString(), m);
      }
    }
    return map;
  }, [allMetrics]);
  const [champions, setChampions] = reactExports.useState([]);
  const [loadingChampions, setLoadingChampions] = reactExports.useState(false);
  const [expanded, setExpanded] = reactExports.useState("browse");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sortMode, setSortMode] = reactExports.useState("newest");
  const [confirmChampion, setConfirmChampion] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    setLoadingChampions(true);
    makeApi(actor).getApprovedChampions().then(setChampions).catch(() => {
    }).finally(() => setLoadingChampions(false));
  }, [actor, isFetching]);
  const filteredBySearch = reactExports.useMemo(() => {
    const q = searchQuery.toLowerCase();
    return champions.filter(
      (c) => c.fullNameEn.toLowerCase().includes(q) || (c.fullNameKm ?? "").includes(q) || (c.fullNameFr ?? "").toLowerCase().includes(q)
    );
  }, [champions, searchQuery]);
  const sortedBrowse = reactExports.useMemo(() => {
    const list = [...champions];
    if (sortMode === "newest")
      return list.sort((a, b) => Number(b.createdAt - a.createdAt));
    if (sortMode === "random") return list.sort(() => Math.random() - 0.5);
    return list;
  }, [champions, sortMode]);
  const CHAMPION_KEY2 = "hotel_selected_champion_id";
  function handleConfirm() {
    if (!confirmChampion) return;
    localStorage.setItem(CHAMPION_KEY2, confirmChampion.champion.id.toString());
    onChampionSelected(confirmChampion.champion, confirmChampion.method);
    setConfirmChampion(null);
  }
  function OptionCard({
    id,
    emoji,
    title,
    sub,
    children
  }) {
    const isOpen = expanded === id;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `border-2 transition-all duration-200 cursor-pointer ${isOpen ? "border-primary shadow-md" : "border-border hover:border-primary/50"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full text-left px-6 py-5 flex items-start gap-4",
              onClick: () => setExpanded(isOpen ? null : id),
              "data-ocid": `hotel.champion_select.${id}_option`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl mt-0.5", children: emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: sub })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-lg mt-1", children: isOpen ? "▲" : "▼" })
              ]
            }
          ),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 pt-2 border-t border-border", children })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate("/"),
        "aria-label": "Back to home",
        "data-ocid": "hotel.champion_select.close_button",
        className: "fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: [
        "🌿",
        " ",
        lang === "km" ? "ជ្រើសរើសអ្នកជើងឯក" : lang === "fr" ? "Sélectionnez un Champion" : "Select a Champion"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: lang === "km" ? "រាល់ការបញ្ជាទិញគឺជាការជួយដល់ជីវិត" : lang === "fr" ? "Chaque commande soutient un champion qui reconstruit sa vie" : "Every order directly supports a champion rebuilding their life" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OptionCard,
        {
          id: "remember",
          emoji: "🔍",
          title: l.rememberTitle,
          sub: l.rememberSub,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: l.searchPlaceholder,
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "border-input",
                "data-ocid": "hotel.champion_select.search_input"
              }
            ),
            loadingChampions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }, i)) }),
            !loadingChampions && searchQuery && filteredBySearch.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: l.noResults }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredBySearch.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full text-left flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors",
                onClick: () => setConfirmChampion({
                  champion: c,
                  method: ChampionSelectionMethod.remembered
                }),
                "data-ocid": `hotel.champion_select.search_result.item.${filteredBySearch.indexOf(c) + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarInitials, { name: c.fullNameEn, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: getChampionName$3(c, lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: getChampionBio$2(c, lang).slice(0, 80) })
                  ] })
                ]
              },
              c.id.toString()
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OptionCard,
        {
          id: "browse",
          emoji: "🏆",
          title: l.browseTitle,
          sub: l.browseSub,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["newest", "earned", "random"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: sortMode === mode ? "default" : "outline",
                size: "sm",
                onClick: () => setSortMode(mode),
                "data-ocid": `hotel.champion_select.sort_${mode}`,
                children: mode === "newest" ? l.sortNewest : mode === "earned" ? l.sortMostEarned : l.sortRandom
              },
              mode
            )) }),
            loadingChampions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }, i)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[560px] overflow-y-auto pr-1", children: sortedBrowse.map((c, idx) => {
              const metrics = metricsById.get(c.id.toString());
              const sponsors = metrics ? bigintToNumber(metrics.sponsorCount) : 0;
              const bottles = metrics ? bigintToNumber(metrics.bottlesSold) : 0;
              const earningsKhr = metrics ? bigintToNumber(metrics.totalEarningsKhr) : 0;
              const earningsUsd = metrics ? metrics.totalEarningsUsd : 0;
              const isNew = sponsors === 0 && bottles === 0 && earningsKhr === 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col rounded-xl border border-border bg-card hover:border-primary/60 hover:shadow-md hover:scale-[1.02] transition-all duration-200 overflow-hidden",
                  "data-ocid": `hotel.champion_select.browse_list.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-6 pb-3 bg-muted/20", children: c.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: c.avatarUrl,
                        alt: getChampionName$3(c, lang),
                        loading: "lazy",
                        className: "w-20 h-20 rounded-full object-cover border-4 border-background shadow-sm"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarInitials, { name: c.fullNameEn, size: "lg" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 px-4 pb-4 pt-2 gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base text-foreground text-center leading-snug", children: getChampionName$3(c, lang) }),
                      isNew ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "🌱 New Champion" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium", children: [
                          "🏆 ",
                          sponsors,
                          " sponsor",
                          sponsors !== 1 ? "s" : ""
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-accent/20 text-foreground text-xs font-medium", children: [
                          "🧴 ",
                          bottles.toLocaleString("en-US")
                        ] }),
                        earningsKhr > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: formatKhr(earningsKhr) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
                            "($",
                            earningsUsd.toFixed(2),
                            ")"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center line-clamp-2 flex-1", children: getChampionBio$2(c, lang).slice(0, 120) || " " }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          size: "sm",
                          variant: "default",
                          className: "w-full mt-1",
                          onClick: () => setConfirmChampion({
                            champion: c,
                            method: ChampionSelectionMethod.browsed_list
                          }),
                          "data-ocid": `hotel.champion_select.support_button.${idx + 1}`,
                          children: l.selectBtn
                        }
                      )
                    ] })
                  ]
                },
                c.id.toString()
              );
            }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OptionCard, { id: "staff", emoji: "👥", title: l.staffTitle, sub: l.staffSub, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: l.contactStaff }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!confirmChampion,
        onOpenChange: () => setConfirmChampion(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "hotel.champion_confirm.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: l.confirmTitle }) }),
          confirmChampion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarInitials,
              {
                name: confirmChampion.champion.fullNameEn,
                size: "lg"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg text-foreground", children: getChampionName$3(confirmChampion.champion, lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mt-1", children: confirmChampion.method === ChampionSelectionMethod.remembered ? lang === "km" ? "ចាំ" : lang === "fr" ? "Mémorisé" : "Remembered" : lang === "km" ? "រកមើល" : lang === "fr" ? "Parcouru" : "Browsed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: getChampionBio$2(confirmChampion.champion, lang) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setConfirmChampion(null),
                "data-ocid": "hotel.champion_confirm.cancel_button",
                children: l.cancelBtn
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleConfirm,
                "data-ocid": "hotel.champion_confirm.confirm_button",
                children: l.confirmBtn
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function getChampionName$2(c, lang) {
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}
function getProductName$1(p, lang) {
  if (lang === "km") return p.nameKm;
  if (lang === "fr") return p.nameFr;
  return p.nameEn;
}
function generateTxRef() {
  const ts = Date.now();
  const rand = Math.floor(1e3 + Math.random() * 9e3);
  return `KHMP-${ts}-${rand}`;
}
const businessTypes = [
  "Hotel",
  "Restaurant",
  "Resort",
  "Cafe",
  "Retailer",
  "Individual"
];
const ui$2 = {
  en: {
    title: "Complete Your Order",
    step1: "Customer Info",
    step2: "Payment",
    step3: "Confirmed",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    businessName: "Business Name",
    businessNamePlaceholder: "Hotel / Restaurant name",
    businessNameOptional: "Business Name (optional)",
    phone: "Phone Number",
    phonePlaceholder: "+855 XX XXX XXXX",
    email: "Email Address (optional)",
    emailPlaceholder: "your@email.com",
    deliveryAddress: "Delivery Address",
    deliveryPlaceholder: "Street, district, city",
    businessType: "Business Type",
    continueTo: "Continue to Payment",
    orderSummary: "Order Summary",
    supports: "Your order supports",
    champion: "Champion",
    total: "Total",
    paymentTitle: "Pay with ABA PayWay",
    txRef: "Transaction Reference",
    abaInstructions: "Open ABA Mobile app → Scan QR code → Confirm payment → Return here and click Confirm Payment.",
    confirmPayment: "Confirm Payment Received",
    processing: "Processing…",
    successTitle: "Order Confirmed! 🎉",
    successMessage: (name, ref) => `Thank you for supporting ${name}! Your order ${ref} has been placed and payment confirmed.`,
    thankYou: (name) => `Thank you for supporting ${name}`,
    anotherOrder: "Place another order",
    viewHistory: "View order history",
    error: "Order failed. Please try again.",
    required: "This field is required",
    orderNumber: "Order Reference",
    totalPaid: "Total Paid"
  },
  km: {
    title: "បញ្ចប់ការបញ្ជាទិញ",
    step1: "ព័ត៌មានអតិថិជន",
    step2: "ការទូទាត់",
    step3: "បានបញ្ជាក់",
    fullName: "ឈ្មោះពេញ",
    fullNamePlaceholder: "ឈ្មោះពេញរបស់អ្នក",
    businessName: "ឈ្មោះអាជីវកម្ម",
    businessNamePlaceholder: "ឈ្មោះសណ្ឋាគារ / ភោជនីយដ្ឋាន",
    businessNameOptional: "ឈ្មោះអាជីវកម្ម (ស្រេចចិត្ត)",
    phone: "លេខទូរស័ព្ទ",
    phonePlaceholder: "+855 XX XXX XXXX",
    email: "អ៊ីម៉ែល (ស្រេចចិត្ត)",
    emailPlaceholder: "your@email.com",
    deliveryAddress: "អាសយដ្ឋានដឹកជញ្ជូន",
    deliveryPlaceholder: "ផ្លូវ ស្រុក ទីក្រុង",
    businessType: "ប្រភេទអាជីវកម្ម",
    continueTo: "បន្តទៅការទូទាត់",
    orderSummary: "សង្ខេបការបញ្ជាទិញ",
    supports: "ការបញ្ជាទិញរបស់អ្នកគាំទ្រ",
    champion: "អ្នកជើងឯក",
    total: "សរុប",
    paymentTitle: "ទូទាត់ជាមួយ ABA PayWay",
    txRef: "លេខយោងប្រតិបត្តិការ",
    abaInstructions: "បើក ABA Mobile → ស្កែនកូដ QR → បញ្ជាក់ការទូទាត់ → ត្រឡប់មកចុច បញ្ជាក់ការទូទាត់។",
    confirmPayment: "បញ្ជាក់ការទូទាត់",
    processing: "កំពុងដំណើរការ...",
    successTitle: "ការបញ្ជាទិញបានបញ្ជាក់! 🎉",
    successMessage: (name, ref) => `អរគុណដែលបានគាំទ្រ ${name}! ការបញ្ជាទិញ ${ref} ត្រូវបានដាក់ហើយ។`,
    thankYou: (name) => `អរគុណដែលបានគាំទ្រ ${name}`,
    anotherOrder: "ដាក់ការបញ្ជាទិញម្ដងទៀត",
    viewHistory: "មើលប្រវត្តិការបញ្ជាទិញ",
    error: "ការបញ្ជាទិញបរាជ័យ។ សូមព្យាយាមម្ដងទៀត។",
    required: "វិញ្ញាសានេះត្រូវការ",
    orderNumber: "លេខការបញ្ជាទិញ",
    totalPaid: "ចំនួនទូទាត់សរុប"
  },
  fr: {
    title: "Finaliser votre commande",
    step1: "Infos client",
    step2: "Paiement",
    step3: "Confirmée",
    fullName: "Nom complet",
    fullNamePlaceholder: "Votre nom complet",
    businessName: "Nom de l'entreprise",
    businessNamePlaceholder: "Nom de l'hôtel / restaurant",
    businessNameOptional: "Nom de l'entreprise (optionnel)",
    phone: "Numéro de téléphone",
    phonePlaceholder: "+855 XX XXX XXXX",
    email: "Adresse e-mail (optionnelle)",
    emailPlaceholder: "votre@email.com",
    deliveryAddress: "Adresse de livraison",
    deliveryPlaceholder: "Rue, district, ville",
    businessType: "Type d'entreprise",
    continueTo: "Continuer vers le paiement",
    orderSummary: "Résumé de la commande",
    supports: "Votre commande soutient",
    champion: "Champion",
    total: "Total",
    paymentTitle: "Payer avec ABA PayWay",
    txRef: "Référence de transaction",
    abaInstructions: "Ouvrez ABA Mobile → Scannez le QR code → Confirmez le paiement → Revenez ici et cliquez sur Confirmer le paiement.",
    confirmPayment: "Confirmer le paiement reçu",
    processing: "Traitement…",
    successTitle: "Commande confirmée ! 🎉",
    successMessage: (name, ref) => `Merci de soutenir ${name} ! Votre commande ${ref} a été passée et le paiement confirmé.`,
    thankYou: (name) => `Merci de soutenir ${name}`,
    anotherOrder: "Passer une autre commande",
    viewHistory: "Voir l'historique",
    error: "La commande a échoué. Veuillez réessayer.",
    required: "Ce champ est requis",
    orderNumber: "Référence de commande",
    totalPaid: "Total payé"
  }
};
function StepIndicator({
  current,
  labels: labels2
}) {
  const steps = [
    { id: "info", label: labels2.step1 },
    { id: "payment", label: labels2.step2 },
    { id: "success", label: labels2.step3 }
  ];
  const order = ["info", "payment", "success"];
  const currentIdx = order.indexOf(current);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-8", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${i < currentIdx ? "bg-primary border-primary text-primary-foreground" : i === currentIdx ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"}`,
          children: i < currentIdx ? "✓" : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-[10px] font-medium ${i <= currentIdx ? "text-primary" : "text-muted-foreground"}`,
          children: s.label
        }
      )
    ] }),
    i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `flex-1 h-0.5 mx-2 mb-4 transition-colors ${i < currentIdx ? "bg-primary" : "bg-border"}`
      }
    )
  ] }, s.id)) });
}
function ChampionBanner({
  champion,
  lang,
  label,
  supportsLabel
}) {
  const name = getChampionName$2(champion, lang);
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6", children: [
    champion.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: champion.avatarUrl,
        alt: name,
        loading: "lazy",
        className: "w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-primary/30"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/20 text-primary font-bold text-xl flex items-center justify-center flex-shrink-0", children: initials }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium mt-0.5", children: [
        supportsLabel,
        " ",
        name
      ] })
    ] })
  ] });
}
function AbaQrPlaceholder({ amountKhr }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-6 px-4 rounded-xl border-2 border-[#2e7d32]/30 bg-[#2e7d32]/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#2e7d32] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-xs", children: "ABA" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#2e7d32] text-sm", children: "ABA PayWay" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-40 h-40 bg-card border-2 border-[#2e7d32]/40 rounded-xl flex flex-col items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-16 h-16 text-[#2e7d32]/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center font-mono", children: "Merchant: MERCHANT_ID_HERE" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-[#2e7d32]", children: [
        amountKhr.toLocaleString("en-US"),
        " ៛"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "API Key: ABA_API_KEY_HERE" })
    ] })
  ] });
}
function todayString() {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
}
function biweeklyEndDate() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}
function HotelCheckout({
  champion,
  cartItems,
  selectionMethod,
  onOrderComplete
}) {
  const { lang } = useLanguage();
  const l = ui$2[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [step, setStep] = reactExports.useState("info");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [confirmedOrderId, setConfirmedOrderId] = reactExports.useState(null);
  const [txRef] = reactExports.useState(() => generateTxRef());
  const [customerInfo, setCustomerInfo] = reactExports.useState({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    businessType: "Hotel"
  });
  const [formErrors, setFormErrors] = reactExports.useState({});
  const totalKhr = cartItems.reduce(
    (sum, item) => sum + bigintToNumber(item.product.wholesalePriceKhr) * item.quantity,
    0
  );
  const totalUsd = cartItems.reduce(
    (sum, item) => sum + item.product.wholesalePriceUsd * item.quantity,
    0
  );
  const champName = getChampionName$2(champion, lang);
  const hotelIdStr = localStorage.getItem("hotel_user_id");
  const isIndividual = customerInfo.businessType === "Individual";
  function validateInfo() {
    const errs = {};
    if (!customerInfo.fullName.trim()) errs.fullName = l.required;
    if (!isIndividual && !customerInfo.businessName.trim())
      errs.businessName = l.required;
    if (!customerInfo.phone.trim()) errs.phone = l.required;
    if (!customerInfo.deliveryAddress.trim()) errs.deliveryAddress = l.required;
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function handleInfoSubmit(e) {
    e.preventDefault();
    if (validateInfo()) setStep("payment");
  }
  function updateField(field, value) {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: void 0 }));
  }
  async function handleConfirmPayment() {
    if (!actor || isFetching) return;
    setLoading(true);
    setError(null);
    try {
      const api = makeApi(actor);
      const hotelId = hotelIdStr ? BigInt(hotelIdStr) : champion.id;
      const today = todayString();
      const cycleEnd = biweeklyEndDate();
      const orderId = await api.createOrder({
        hotelId,
        championId: champion.id,
        hotelSelectedChampionMethod: selectionMethod,
        payoutCycleStartDate: today,
        payoutCycleEndDate: cycleEnd,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: BigInt(item.quantity),
          unitPriceKhr: item.product.wholesalePriceKhr,
          unitPriceUsd: item.product.wholesalePriceUsd,
          championCommissionKhr: item.product.championCommissionKhr,
          championCommissionUsd: item.product.championCommissionUsd
        }))
      });
      await api.confirmPayment(orderId);
      setConfirmedOrderId(orderId);
      onOrderComplete();
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : l.error);
    } finally {
      setLoading(false);
    }
  }
  if (step === "success" && confirmedOrderId !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-lg mx-auto px-4 py-12 text-center",
        "data-ocid": "hotel.checkout.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: l.successTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-sm", children: l.successMessage(champName, txRef) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border text-left mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              champion.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: champion.avatarUrl,
                  alt: champName,
                  loading: "lazy",
                  className: "w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center", children: champName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: l.champion }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: champName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary", children: l.thankYou(champName) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: l.orderNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-medium text-foreground", children: txRef })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: l.totalPaid }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-foreground", children: [
                    totalKhr.toLocaleString("en-US"),
                    " ៛"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                    "($",
                    totalUsd.toFixed(2),
                    ")"
                  ] })
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate("/hotel/select-champion"),
                "data-ocid": "hotel.checkout.another_order_button",
                children: l.anotherOrder
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                asChild: true,
                "data-ocid": "hotel.checkout.view_history_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hotel", children: l.viewHistory })
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate("/"),
        "aria-label": "Back to home",
        "data-ocid": "hotel.checkout.close_button",
        className: "fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: l.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepIndicator,
      {
        current: step,
        labels: { step1: l.step1, step2: l.step2, step3: l.step3 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChampionBanner,
      {
        champion,
        lang,
        label: l.champion,
        supportsLabel: l.supports
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border mb-6",
        "data-ocid": "hotel.checkout.order_summary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
            l.orderSummary
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            cartItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between items-baseline text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    getProductName$1(item.product, lang),
                    " ×",
                    item.quantity
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CurrencyDisplay,
                    {
                      khr: bigintToNumber(item.product.wholesalePriceKhr) * item.quantity,
                      usd: item.product.wholesalePriceUsd * item.quantity,
                      size: "sm"
                    }
                  )
                ]
              },
              item.product.id.toString()
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: l.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-foreground", children: [
                  totalKhr.toLocaleString("en-US"),
                  " ៛"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                  "($",
                  totalUsd.toFixed(2),
                  ")"
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    step === "info" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", "data-ocid": "hotel.checkout.info_form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: "1" }),
        l.step1
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleInfoSubmit, noValidate: true, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "businessType", children: l.businessType }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "businessType",
              value: customerInfo.businessType,
              onChange: (e) => updateField("businessType", e.target.value),
              className: "w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "hotel.checkout.business_type_select",
              children: businessTypes.map((bt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: bt, children: bt }, bt))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fullName", children: [
            l.fullName,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "fullName",
              value: customerInfo.fullName,
              onChange: (e) => updateField("fullName", e.target.value),
              placeholder: l.fullNamePlaceholder,
              "aria-required": "true",
              "data-ocid": "hotel.checkout.full_name_input"
            }
          ),
          formErrors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "hotel.checkout.full_name_field_error",
              children: formErrors.fullName
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "businessName", children: [
            isIndividual ? l.businessNameOptional : l.businessName,
            !isIndividual && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: " *" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "businessName",
              value: customerInfo.businessName,
              onChange: (e) => updateField("businessName", e.target.value),
              placeholder: l.businessNamePlaceholder,
              "data-ocid": "hotel.checkout.business_name_input"
            }
          ),
          formErrors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "hotel.checkout.business_name_field_error",
              children: formErrors.businessName
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", children: [
            l.phone,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: customerInfo.phone,
              onChange: (e) => updateField("phone", e.target.value),
              placeholder: l.phonePlaceholder,
              "aria-required": "true",
              "data-ocid": "hotel.checkout.phone_input"
            }
          ),
          formErrors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "hotel.checkout.phone_field_error",
              children: formErrors.phone
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: l.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: customerInfo.email,
              onChange: (e) => updateField("email", e.target.value),
              placeholder: l.emailPlaceholder,
              "data-ocid": "hotel.checkout.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "deliveryAddress", children: [
            l.deliveryAddress,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "deliveryAddress",
              value: customerInfo.deliveryAddress,
              onChange: (e) => updateField("deliveryAddress", e.target.value),
              placeholder: l.deliveryPlaceholder,
              "aria-required": "true",
              "data-ocid": "hotel.checkout.delivery_address_input"
            }
          ),
          formErrors.deliveryAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "hotel.checkout.delivery_address_field_error",
              children: formErrors.deliveryAddress
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            className: "w-full",
            "data-ocid": "hotel.checkout.continue_button",
            children: l.continueTo
          }
        )
      ] }) })
    ] }),
    step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border",
        "data-ocid": "hotel.checkout.payment_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: "2" }),
            l.paymentTitle
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-muted/40 border border-border px-4 py-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: l.txRef }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold text-foreground", children: txRef })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                "KHR: ",
                totalKhr.toLocaleString("en-US")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AbaQrPlaceholder, { amountKhr: totalKhr }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-[#2e7d32]/5 border border-[#2e7d32]/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#2e7d32]", children: "📱 " }),
              l.abaInstructions
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-foreground", children: [
                totalKhr.toLocaleString("en-US"),
                " ៛"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "($",
                totalUsd.toFixed(2),
                " USD)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full py-3 rounded-xl font-bold text-base text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 bg-[#2e7d32]",
                "data-ocid": "hotel.checkout.aba_pay_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
                  "Pay with ABA PayWay"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2",
                "data-ocid": "hotel.checkout.error_state",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "lg",
                className: "w-full",
                onClick: handleConfirmPayment,
                disabled: loading || cartItems.length === 0,
                "data-ocid": "hotel.checkout.confirm_button",
                children: loading ? l.processing : l.confirmPayment
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                className: "w-full text-sm",
                onClick: () => setStep("info"),
                "data-ocid": "hotel.checkout.back_to_info_button",
                children: [
                  "← ",
                  l.step1
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function getChampionName$1(c, lang) {
  if (!c) return "";
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}
function getChampionBio$1(c, lang) {
  if (!c) return "";
  if (lang === "km" && c.bioKm) return c.bioKm;
  if (lang === "fr" && c.bioFr) return c.bioFr;
  return (c == null ? void 0 : c.bioEn) ?? "";
}
const ui$1 = {
  en: {
    welcomeBack: "Welcome back",
    yourChampion: "Your Supported Champion",
    changeChampion: "Change champion",
    placeOrder: "Place New Order",
    firstOrder: "Place your first order",
    firstOrderSub: "Choose a champion and make an impact today.",
    selectChampion: "Select a Champion",
    impactLabel: (name, months) => `You've helped provide approximately ${months} months of baseline income for ${name}`,
    orderHistory: "Order History",
    colDate: "Date",
    colChampion: "Champion",
    colTotal: "Total",
    colStatus: "Status",
    paid: "Paid",
    pending: "Pending",
    noOrders: "No orders yet.",
    loading: "Loading..."
  },
  km: {
    welcomeBack: "ស្វាគមន៍ត្រលប់មកវិញ",
    yourChampion: "អ្នកជើងឯកដែលអ្នកគាំទ្រ",
    changeChampion: "ប្តូរអ្នកជើងឯក",
    placeOrder: "ដាក់ការបញ្ជាទិញថ្មី",
    firstOrder: "ដាក់ការបញ្ជាទិញដំបូងរបស់អ្នក",
    firstOrderSub: "ជ្រើសរើសអ្នកជើងឯក ហើយបង្កើតផលប៉ះពាល់ថ្ងៃនេះ។",
    selectChampion: "ជ្រើសរើសអ្នកជើងឯក",
    impactLabel: (name, months) => `អ្នកបានជួយផ្តល់ប្រហែល ${months} ខែប្រាក់ចំណូលមូលដ្ឋានដល់ ${name}`,
    orderHistory: "ប្រវត្តិការបញ្ជាទិញ",
    colDate: "កាលបរិច្ឆេទ",
    colChampion: "អ្នកជើងឯក",
    colTotal: "សរុប",
    colStatus: "ស្ថានភាព",
    paid: "បានបង់",
    pending: "រង់ចាំ",
    noOrders: "មិនទាន់មានការបញ្ជាទិញ។",
    loading: "កំពុងផ្ទុក..."
  },
  fr: {
    welcomeBack: "Bon retour",
    yourChampion: "Votre champion soutenu",
    changeChampion: "Changer de champion",
    placeOrder: "Passer une nouvelle commande",
    firstOrder: "Passez votre première commande",
    firstOrderSub: "Choisissez un champion et faites une différence aujourd'hui.",
    selectChampion: "Sélectionner un champion",
    impactLabel: (name, months) => `Vous avez aidé à fournir environ ${months} mois de revenu de base pour ${name}`,
    orderHistory: "Historique des commandes",
    colDate: "Date",
    colChampion: "Champion",
    colTotal: "Total",
    colStatus: "Statut",
    paid: "Payé",
    pending: "En attente",
    noOrders: "Pas encore de commandes.",
    loading: "Chargement..."
  }
};
function HotelDashboard({
  currentChampion,
  onChangeChampion
}) {
  const { lang } = useLanguage();
  const l = ui$1[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [orders, setOrders] = reactExports.useState([]);
  const [loadingOrders, setLoadingOrders] = reactExports.useState(false);
  const [championsMap, setChampionsMap] = reactExports.useState(
    /* @__PURE__ */ new Map()
  );
  const hotelIdStr = localStorage.getItem("hotel_user_id");
  const hotelName = localStorage.getItem("hotel_user_name") ?? "";
  reactExports.useEffect(() => {
    if (!actor || isFetching || !hotelIdStr) return;
    setLoadingOrders(true);
    const api = makeApi(actor);
    Promise.all([
      api.getOrdersByHotel(BigInt(hotelIdStr)),
      api.getApprovedChampions()
    ]).then(([fetchedOrders, champions]) => {
      setOrders(fetchedOrders);
      const map = /* @__PURE__ */ new Map();
      for (const c of champions) map.set(c.id.toString(), c);
      setChampionsMap(map);
    }).catch(() => {
    }).finally(() => setLoadingOrders(false));
  }, [actor, isFetching, hotelIdStr]);
  const totalContributed = orders.reduce(
    (sum, o) => sum + bigintToNumber(o.totalAmountKhr),
    0
  );
  const monthsImpact = currentChampion ? (totalContributed / 6e5).toFixed(1) : "0";
  const champName = getChampionName$1(currentChampion, lang);
  if (!hotelIdStr) {
    navigate("/hotel/register");
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate("/"),
        "aria-label": "Back to home",
        "data-ocid": "hotel.dashboard.close_button",
        className: "fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: l.welcomeBack }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: hotelName })
    ] }),
    orders.length === 0 && !loadingOrders && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-2 border-dashed border-border",
        "data-ocid": "hotel.dashboard.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-14 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🌿" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: l.firstOrder }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: l.firstOrderSub }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => navigate("/hotel/select-champion"),
              "data-ocid": "hotel.dashboard.first_order_button",
              children: l.selectChampion
            }
          )
        ] })
      }
    ),
    (currentChampion || orders.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: l.yourChampion }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: currentChampion ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center", children: currentChampion.fullNameEn.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: champName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: getChampionBio$1(currentChampion, lang).slice(0, 80) })
            ] })
          ] }),
          totalContributed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground bg-primary/5 rounded-lg px-3 py-2 border border-primary/10", children: l.impactLabel(champName, monthsImpact) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: onChangeChampion,
              "data-ocid": "hotel.dashboard.change_champion_button",
              children: l.changeChampion
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onChangeChampion,
            "data-ocid": "hotel.dashboard.select_champion_button",
            children: l.selectChampion
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "h-full flex flex-col items-center justify-center py-10 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🛒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "lg",
            onClick: () => navigate(
              currentChampion ? "/hotel/order" : "/hotel/select-champion"
            ),
            "data-ocid": "hotel.dashboard.place_order_button",
            children: l.placeOrder
          }
        )
      ] }) })
    ] }),
    (orders.length > 0 || loadingOrders) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: l.orderHistory }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loadingOrders ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium", children: l.colDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-muted-foreground font-medium", children: l.colChampion }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-muted-foreground font-medium", children: l.colTotal }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 text-muted-foreground font-medium", children: l.colStatus })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: orders.map((order, idx) => {
          const champ = championsMap.get(
            order.championId.toString()
          );
          const champDisplayName = champ ? getChampionName$1(champ, lang) : order.championId.toString();
          const date = new Date(
            Number(order.orderDate) / 1e6
          ).toLocaleDateString();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border last:border-0 hover:bg-muted/20",
              "data-ocid": `hotel.dashboard.order_history.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: date }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: champDisplayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CurrencyDisplay,
                  {
                    khr: bigintToNumber(order.totalAmountKhr),
                    usd: order.totalAmountUsd,
                    size: "sm"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: order.khqrPaymentConfirmed ? "default" : "secondary",
                    children: order.khqrPaymentConfirmed ? l.paid : l.pending
                  }
                ) })
              ]
            },
            order.id.toString()
          );
        }) })
      ] }) }) })
    ] })
  ] });
}
const labels = {
  en: {
    title: "Hotel Registration",
    subtitle: "Register to order Kampot Heritage artisanal soap for your property",
    businessName: "Business Name",
    phone: "Phone Number",
    language: "Preferred Language",
    submit: "Register & Continue",
    required: "Required",
    phoneError: "This phone number is already registered.",
    generalError: "Registration failed. Please try again."
  },
  km: {
    title: "ចុះឈ្មោះសណ្ឋាគារ",
    subtitle: "ចុះឈ្មោះដើម្បីបញ្ជាទិញសាប៊ូដៃដែលមានប្រថាប់តាំងប្រពៃណីខ្មែរ",
    businessName: "ឈ្មោះអាជីវកម្ម",
    phone: "លេខទូរស័ព្ទ",
    language: "ភាសាដែលចូលចិត្ត",
    submit: "ចុះឈ្មោះ & បន្ត",
    required: "ត្រូវការ",
    phoneError: "លេខទូរស័ព្ទនេះត្រូវបានចុះឈ្មោះរួចហើយ។",
    generalError: "ការចុះឈ្មោះបរាជ័យ។ សូមព្យាយាមម្ដងទៀត។"
  },
  fr: {
    title: "Inscription Hôtel",
    subtitle: "Inscrivez-vous pour commander du savon artisanal Kampot Heritage pour votre établissement",
    businessName: "Nom de l'entreprise",
    phone: "Numéro de téléphone",
    language: "Langue préférée",
    submit: "S'inscrire & Continuer",
    required: "Requis",
    phoneError: "Ce numéro de téléphone est déjà enregistré.",
    generalError: "L'inscription a échoué. Veuillez réessayer."
  }
};
function HotelRegistration() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { actor, isFetching } = useActor(createActor);
  const l = labels[lang];
  const [businessName, setBusinessName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [prefLang, setPrefLang] = reactExports.useState(
    PreferredLanguage.en
  );
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!actor || isFetching) return;
    setLoading(true);
    setError(null);
    try {
      const api = makeApi(actor);
      const userId = await api.registerUser({
        fullNameEn: businessName,
        phoneNumber: phone,
        preferredLanguage: prefLang,
        role: UserRole.hotel
      });
      localStorage.setItem("hotel_user_id", userId.toString());
      localStorage.setItem("hotel_user_name", businessName);
      navigate("/hotel/select-champion");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("phone") || msg.toLowerCase().includes("already")) {
        setError(l.phoneError);
      } else {
        setError(l.generalError);
      }
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[80vh] flex items-center justify-center px-4 py-12 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate("/"),
        "aria-label": "Back to home",
        "data-ocid": "hotel.register.close_button",
        className: "fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md border-border shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏨" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-2xl text-foreground", children: l.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: l.subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "business-name",
              className: "text-foreground font-medium",
              children: [
                l.businessName,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "business-name",
              value: businessName,
              onChange: (e) => setBusinessName(e.target.value),
              required: true,
              placeholder: "Kampot River Lodge",
              className: "border-input",
              "data-ocid": "hotel.register.name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", className: "text-foreground font-medium", children: [
            l.phone,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              required: true,
              placeholder: "+855 12 345 678",
              className: "border-input",
              "data-ocid": "hotel.register.phone_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground font-medium", children: l.language }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: prefLang,
              onValueChange: (v) => setPrefLang(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "hotel.register.language_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PreferredLanguage.en, children: "English" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PreferredLanguage.km, children: "ភាសាខ្មែរ" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PreferredLanguage.fr, children: "Français" })
                ] })
              ]
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2",
            "data-ocid": "hotel.register.error_state",
            children: error
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: loading || !businessName || !phone,
            "data-ocid": "hotel.register.submit_button",
            children: loading ? "..." : l.submit
          }
        )
      ] }) })
    ] })
  ] });
}
function getProductName(p, lang) {
  if (lang === "km") return p.nameKm;
  if (lang === "fr") return p.nameFr;
  return p.nameEn;
}
function getChampionName(c, lang) {
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}
function getChampionBio(c, lang) {
  if (lang === "km" && c.bioKm) return c.bioKm;
  if (lang === "fr" && c.bioFr) return c.bioFr;
  return c.bioEn ?? "";
}
const ui = {
  en: {
    banner: (name) => `Every order supports ${name}, your local Kampot Heritage Champion`,
    earns: "Champion earns",
    cartTitle: "Your Order",
    proceedBtn: "Proceed to Checkout",
    emptyCart: "Add products to your order",
    total: "Total",
    unit: "unit",
    loadingProducts: "Loading products..."
  },
  km: {
    banner: (name) => `រាល់ការបញ្ជាទិញគាំទ្រ ${name} អ្នកជើងឯកនៅក្នុងតំបន់`,
    earns: "អ្នកជើងឯករកបាន",
    cartTitle: "ការបញ្ជាទិញរបស់អ្នក",
    proceedBtn: "ទៅការទូទាត់",
    emptyCart: "បន្ថែមផលិតផលទៅការបញ្ជាទិញ",
    total: "សរុប",
    unit: "ឯកតា",
    loadingProducts: "កំពុងផ្ទុក..."
  },
  fr: {
    banner: (name) => `Chaque commande soutient ${name}, votre champion Kampot Heritage local`,
    earns: "Le champion gagne",
    cartTitle: "Votre commande",
    proceedBtn: "Passer à la caisse",
    emptyCart: "Ajoutez des produits à votre commande",
    total: "Total",
    unit: "unité",
    loadingProducts: "Chargement..."
  }
};
function HotelStorefront({
  champion,
  selectionMethod: _sm,
  onProceedToCheckout
}) {
  const { lang } = useLanguage();
  const l = ui[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const globalCart = useCart();
  const [products, setProducts] = reactExports.useState([]);
  const [loadingProducts, setLoadingProducts] = reactExports.useState(false);
  const [quantities, setQuantities] = reactExports.useState(/* @__PURE__ */ new Map());
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    setLoadingProducts(true);
    makeApi(actor).getActiveProducts().then(setProducts).catch(() => {
    }).finally(() => setLoadingProducts(false));
  }, [actor, isFetching]);
  function updateQty(product, delta) {
    const key = product.id.toString();
    setQuantities((prev) => {
      const currentQty = prev.get(key) ?? 0;
      const newQty = Math.max(0, currentQty + delta);
      const next = new Map(prev);
      if (newQty === 0) {
        next.delete(key);
      } else {
        next.set(key, newQty);
      }
      if (newQty === 0) {
        globalCart.removeItem(key);
      } else if (currentQty === 0 && newQty > 0) {
        globalCart.addItem({
          productId: key,
          nameEn: product.nameEn,
          nameKm: product.nameKm,
          nameFr: product.nameFr,
          quantity: 1,
          unitPriceKhr: bigintToNumber(product.wholesalePriceKhr),
          unitPriceUsd: product.wholesalePriceUsd,
          commissionKhr: bigintToNumber(product.championCommissionKhr)
        });
      } else {
        globalCart.updateQuantity(key, newQty);
      }
      return next;
    });
  }
  function handleAddToCart(product) {
    const key = product.id.toString();
    const currentQty = quantities.get(key) ?? 0;
    if (currentQty === 0) {
      updateQty(product, 1);
    }
  }
  const cartItems = products.filter((p) => (quantities.get(p.id.toString()) ?? 0) > 0).map((p) => ({
    product: p,
    quantity: quantities.get(p.id.toString()) ?? 0
  }));
  const totalKhr = cartItems.reduce(
    (sum, item) => sum + bigintToNumber(item.product.wholesalePriceKhr) * item.quantity,
    0
  );
  const totalUsd = cartItems.reduce(
    (sum, item) => sum + item.product.wholesalePriceUsd * item.quantity,
    0
  );
  const champName = getChampionName(champion, lang);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate("/"),
        "aria-label": "Back to home",
        "data-ocid": "hotel.storefront.close_button",
        className: "fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/10 border border-primary/20 px-6 py-4 mb-8 flex items-start gap-4", children: [
      champion.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: champion.avatarUrl,
          alt: champName,
          loading: "lazy",
          className: "w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/30"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center flex-shrink-0", children: champion.fullNameEn.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: champName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: l.banner(champName) }),
        getChampionBio(champion, lang) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 italic", children: [
          '"',
          getChampionBio(champion, lang).slice(0, 120),
          '"'
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        loadingProducts && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }, i)) }),
        products.map((product, idx) => {
          const qty = quantities.get(product.id.toString()) ?? 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border hover:border-primary/40 transition-colors",
              "data-ocid": `hotel.storefront.product.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: getProductName(product, lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                      product.unitSize,
                      product.unitMeasurement
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CurrencyDisplay,
                    {
                      khr: bigintToNumber(product.wholesalePriceKhr),
                      usd: product.wholesalePriceUsd,
                      size: "md"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    "🏆 ",
                    l.earns,
                    ":",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                      bigintToNumber(
                        product.championCommissionKhr
                      ).toLocaleString("en-US"),
                      " ",
                      "៛"
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border border-border rounded-lg px-2 py-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "w-7 h-7 p-0 rounded-md",
                        onClick: () => updateQty(product, -1),
                        disabled: qty === 0,
                        "aria-label": "Decrease quantity",
                        "data-ocid": `hotel.storefront.product.decrement.${idx + 1}`,
                        children: "−"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-8 text-center font-semibold text-foreground text-base",
                        "data-ocid": `hotel.storefront.product.qty.${idx + 1}`,
                        children: qty
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "w-7 h-7 p-0 rounded-md",
                        onClick: () => updateQty(product, 1),
                        "aria-label": "Increase quantity",
                        "data-ocid": `hotel.storefront.product.increment.${idx + 1}`,
                        children: "+"
                      }
                    )
                  ] }),
                  qty === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "flex-1",
                      onClick: () => handleAddToCart(product),
                      "data-ocid": `hotel.storefront.product.add_button.${idx + 1}`,
                      children: [
                        "+",
                        " ",
                        l.unit === "unit" ? "Add to Cart" : lang === "km" ? "បន្ថែមទៅកន្ត្រក" : "Ajouter au panier"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 text-sm text-primary font-medium", children: [
                    "✓",
                    " ",
                    lang === "en" ? "In cart" : lang === "km" ? "នៅក្នុងកន្ត្រក" : "Dans le panier"
                  ] })
                ] })
              ] })
            },
            product.id.toString()
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border-border sticky top-20",
          "data-ocid": "hotel.storefront.cart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold flex items-center justify-between", children: [
              l.cartTitle,
              cartItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "ml-2", children: cartItems.reduce((s, i) => s + i.quantity, 0) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: cartItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: l.emptyCart }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              cartItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between items-baseline text-sm gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground truncate flex-1", children: [
                      getProductName(item.product, lang),
                      " ×",
                      item.quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CurrencyDisplay,
                      {
                        khr: bigintToNumber(item.product.wholesalePriceKhr) * item.quantity,
                        usd: item.product.wholesalePriceUsd * item.quantity,
                        size: "sm"
                      }
                    )
                  ]
                },
                item.product.id.toString()
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: l.total }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyDisplay, { khr: totalKhr, usd: totalUsd, size: "md" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "w-full mt-2",
                  onClick: () => {
                    onProceedToCheckout(cartItems);
                    navigate("/hotel/checkout");
                  },
                  "data-ocid": "hotel.storefront.checkout_button",
                  children: l.proceedBtn
                }
              )
            ] }) })
          ]
        }
      ) })
    ] })
  ] });
}
const CHAMPION_KEY = "hotel_selected_champion_id";
function HotelPortal() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const [selectedChampion, setSelectedChampion] = reactExports.useState(null);
  const [selectionMethod, setSelectionMethod] = reactExports.useState(ChampionSelectionMethod.browsed_list);
  const { clearCart } = useCart();
  const [cartItems, setCartItems] = reactExports.useState([]);
  const [championLoading, setChampionLoading] = reactExports.useState(true);
  const didRestoreRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching || didRestoreRef.current) return;
    didRestoreRef.current = true;
    const savedId = localStorage.getItem(CHAMPION_KEY);
    if (!savedId) {
      setChampionLoading(false);
      return;
    }
    makeApi(actor).getUserById(BigInt(savedId)).then((user) => {
      if (user && user.onboardingStatus === "approved") {
        setSelectedChampion(user);
        setSelectionMethod(ChampionSelectionMethod.remembered);
      } else {
        localStorage.removeItem(CHAMPION_KEY);
      }
    }).catch(() => {
      localStorage.removeItem(CHAMPION_KEY);
    }).finally(() => setChampionLoading(false));
  }, [actor, isFetching]);
  function handleChampionSelected(champion, method) {
    setSelectedChampion(champion);
    setSelectionMethod(method);
    localStorage.setItem(CHAMPION_KEY, champion.id.toString());
    navigate("/hotel/order");
  }
  function handleProceedToCheckout(items) {
    setCartItems(items);
    navigate("/hotel/checkout");
  }
  function handleOrderComplete() {
    clearCart();
    setCartItems([]);
    navigate("/hotel/dashboard");
  }
  function handleChangeChampion() {
    localStorage.removeItem(CHAMPION_KEY);
    setSelectedChampion(null);
    navigate("/hotel/select-champion");
  }
  function ChampionGate({ children }) {
    if (championLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground animate-pulse", children: "Loading…" }) });
    }
    if (!selectedChampion) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionSelection, { onChampionSelected: handleChampionSelected });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/",
        element: championLoading ? null : selectedChampion ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          HotelDashboard,
          {
            currentChampion: selectedChampion,
            onChangeChampion: handleChangeChampion
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionSelection, { onChampionSelected: handleChampionSelected })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/dashboard",
        element: championLoading ? null : selectedChampion ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          HotelDashboard,
          {
            currentChampion: selectedChampion,
            onChangeChampion: handleChangeChampion
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionSelection, { onChampionSelected: handleChampionSelected })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/register", element: /* @__PURE__ */ jsxRuntimeExports.jsx(HotelRegistration, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/select-champion",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionSelection, { onChampionSelected: handleChampionSelected })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/order",
        element: /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionGate, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          HotelStorefront,
          {
            champion: selectedChampion,
            selectionMethod,
            onProceedToCheckout: handleProceedToCheckout
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Route,
      {
        path: "/checkout",
        element: selectedChampion && cartItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          HotelCheckout,
          {
            champion: selectedChampion,
            cartItems,
            selectionMethod,
            onOrderComplete: handleOrderComplete
          }
        ) : selectedChampion ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          HotelStorefront,
          {
            champion: selectedChampion,
            selectionMethod,
            onProceedToCheckout: handleProceedToCheckout
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChampionSelection, { onChampionSelected: handleChampionSelected })
      }
    )
  ] });
}
export {
  HotelPortal as default
};

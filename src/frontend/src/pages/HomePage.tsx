import { type ChampionMetrics, createActor } from "@/backend";
import { CartDrawer } from "@/components/CartDrawer";
// HomePage — implemented in Phase 2
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "@/hooks/useTranslations";
import { useLanguage } from "@/lib/i18n";
import type { ImpactStats, Product, User } from "@/types";
import { bigintToNumber, formatKhr } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function useActiveProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["activeProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

function useImpactStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ImpactStats>({
    queryKey: ["impactStats"],
    queryFn: async () => {
      if (!actor)
        return {
          championsEmpowered: 0n,
          totalCommunityEarningsKhr: 0n,
          localValueCirculatedKhr: 0n,
        };
      return actor.getImpactStats();
    },
    enabled: !!actor && !isFetching,
  });
}

function useApprovedChampions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<User[]>({
    queryKey: ["approvedChampions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedChampions();
    },
    enabled: !!actor && !isFetching,
  });
}

function useAllChampionMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChampionMetrics[]>({
    queryKey: ["allChampionMetrics"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllChampionMetrics();
    },
    enabled: !!actor && !isFetching,
  });
}

function HeroSection() {
  const { t, isLoading } = useTranslations();
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.45 0.14 35) 0%, oklch(0.52 0.16 45) 40%, oklch(0.62 0.18 60) 100%)",
      }}
      data-ocid="hero.section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-soap.dim_1200x600.jpg')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.96 0.01 75) 0, oklch(0.96 0.01 75) 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="text-sm font-body tracking-widest uppercase text-white/90">
            🌿 100% CAMBODIAN • ETHICALLY MADE
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
          {isLoading ? (
            <Skeleton className="h-20 w-96 mx-auto bg-white/20" />
          ) : (
            "Turning Local Lives Into Local Livelihoods"
          )}
        </h1>
        <p className="font-display text-xl sm:text-2xl font-semibold text-white/90 mb-6 drop-shadow">
          Every bottle of Kampot Heritage Soap keeps Cambodian spending inside
          Cambodia — in the hands of champions rebuilding their lives.
        </p>
        <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body">
          {isLoading ? (
            <Skeleton className="h-16 w-full bg-white/20" />
          ) : (
            t("hero_subheadline")
          )}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8 py-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
            data-ocid="hero.become_champion_button"
          >
            <Link to="/become-a-champion">Become a Champion →</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/60 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-200"
            data-ocid="hero.order_now_button"
          >
            <a href="#products">Order Now ↓</a>
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "💸 $49.3M+", label: "Lost yearly to imports" },
            { value: "🌿 100%", label: "Locally produced" },
            { value: "🏆 $150–200", label: "Monthly champion income" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-display font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-white/70 font-body mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactNumbersSection() {
  const { t } = useTranslations();
  const cards = [
    { amount: "$45.6M", label: t("to_thailand"), flag: "🇹🇭" },
    { amount: "$3.7M+", label: t("to_vietnam"), flag: "🇻🇳" },
    { amount: "$49.3M+", label: t("total_loss"), flag: "💸" },
  ];
  return (
    <section
      className="py-20"
      style={{ background: "oklch(0.14 0.015 50)" }}
      data-ocid="impact.section"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-white/40">
          The Problem We're Solving
        </p>
        <h2 className="text-center font-display text-xl sm:text-2xl font-bold mb-2 text-white/90 uppercase tracking-wider max-w-3xl mx-auto leading-tight">
          {t("economic_loss_title")}
        </h2>
        <p className="text-center text-white/50 text-sm mb-8 font-body">
          Yearly on soap &amp; cleaning products alone
        </p>
        {/* Three-card grid — first */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              data-ocid={`impact.card.${i + 1}`}
            >
              <div className="text-4xl mb-3">{card.flag}</div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
                {card.amount}
              </div>
              <div className="text-white/70 text-sm font-body uppercase tracking-wider">
                {card.label}
              </div>
            </div>
          ))}
        </div>
        {/* Families Impact Stat */}
        <div
          className="max-w-2xl mx-auto rounded-2xl border border-white/20 p-6 mb-8 text-center"
          style={{ background: "oklch(0.20 0.025 50)" }}
          data-ocid="impact.families_stat"
        >
          <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            245,000 – 326,000
          </div>
          <div className="text-white/70 text-sm font-body leading-relaxed">
            Cambodian families impacted every year by economic leakage from
            foreign soap imports — money that could stay in Cambodia.
          </div>
        </div>
        {/* Badge pills below stat card */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-4"
          data-ocid="impact.badges"
        >
          {[
            { icon: "👩\u200d👧\u200d👦", label: "Women & Family Focused" },
            { icon: "🤝", label: "Ethical Production" },
            { icon: "♻️", label: "Sustainable Impact" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-2 bg-primary/80 border border-primary/60 rounded-full px-5 py-2 text-white font-body text-sm font-semibold tracking-wide"
              data-ocid={`impact.badge.${badge.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
            >
              <span role="img" aria-hidden="true">
                {badge.icon}
              </span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "🦟",
    title: "Repels Flies",
    desc: "Natural lemongrass oil keeps insects away",
  },
  {
    icon: "✨",
    title: "Superior Cleaning",
    desc: "Deep clean without harsh chemicals",
  },
  {
    icon: "🤲",
    title: "Softens Hands",
    desc: "Vegetable glycerin for gentle care",
  },
  {
    icon: "🌿",
    title: "Smells Amazing",
    desc: "Fresh lemongrass scent all day",
  },
  {
    icon: "✅",
    title: "Quality Controlled",
    desc: "Every batch tested before shipping",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 bg-background" data-ocid="features.section">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground">
          The Difference
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl font-bold mb-12 text-foreground">
          Why Kampot Heritage Soap?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="bg-card rounded-2xl p-6 text-center border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              data-ocid={`features.item.${i + 1}`}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INGREDIENTS = [
  { name: "Lemongrass Oil", icon: "🌿" },
  { name: "Kampot Sea Salt", icon: "🧂" },
  { name: "Vegetable Glycerin", icon: "🪷" },
  { name: "No Harsh Chemicals", icon: "🚫" },
];

function IngredientsSection() {
  return (
    <section
      className="py-16"
      style={{ background: "oklch(0.94 0.018 75)" }}
      data-ocid="ingredients.section"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl font-bold mb-10 text-foreground">
          What's Inside
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.name}
              className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-6 py-3 shadow-sm text-foreground font-body text-sm font-medium"
            >
              <span>{ing.icon}</span>
              <span>{ing.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-1/3" />
    </div>
  );
}

function ProductsSection() {
  const { t } = useTranslations();
  const { lang } = useLanguage();
  const { data: products, isLoading } = useActiveProducts();
  const { addItem, updateQuantity, items: cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const getName = (p: Product) => {
    if (lang === "km" && p.nameKm) return p.nameKm;
    if (lang === "fr" && p.nameFr) return p.nameFr;
    return p.nameEn;
  };

  const getDesc = (p: Product) => {
    if (lang === "km" && p.descriptionKm) return p.descriptionKm;
    if (lang === "fr" && p.descriptionFr) return p.descriptionFr;
    return p.descriptionEn ?? "";
  };

  function getQty(p: Product): number {
    return (
      cartItems.find((i) => i.productId === p.id.toString())?.quantity ?? 0
    );
  }

  function handleAddToCart(p: Product) {
    addItem({
      productId: p.id.toString(),
      nameEn: p.nameEn,
      nameKm: p.nameKm,
      nameFr: p.nameFr,
      quantity: 1,
      unitPriceKhr: bigintToNumber(p.retailPriceKhr),
      unitPriceUsd: p.retailPriceUsd,
      commissionKhr: bigintToNumber(p.championCommissionKhr),
    });
  }

  function handleSetQty(p: Product, qty: number) {
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

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <section
        id="products"
        className="py-20 bg-background"
        data-ocid="products.section"
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground">
            Kampot Heritage
          </p>
          <h2 className="text-center font-display text-3xl sm:text-4xl font-bold mb-12 text-foreground">
            Available Sizes
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {(products ?? []).map((p, i) => {
                const qty = getQty(p);
                return (
                  <Card
                    key={String(p.id)}
                    className="bg-card border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                    data-ocid={`products.item.${i + 1}`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant="secondary"
                          className="font-body text-xs uppercase tracking-wider"
                        >
                          {p.unitSize} {p.unitMeasurement}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-body">
                          {p.skuCode}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        {getName(p)}
                      </h3>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                        {getDesc(p)}
                      </p>
                      <div
                        className="rounded-xl p-4 mb-4"
                        style={{ background: "oklch(0.96 0.018 75)" }}
                      >
                        <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                          Retail Price
                        </div>
                        <CurrencyDisplay
                          khr={bigintToNumber(p.retailPriceKhr)}
                          usd={p.retailPriceUsd}
                          size="lg"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-5">
                        <span className="text-accent font-semibold">🏆</span>
                        <span className="text-muted-foreground font-body">
                          {t("earns_champion")}:
                        </span>
                        <span className="font-semibold text-foreground font-body">
                          {formatKhr(bigintToNumber(p.championCommissionKhr))}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          (${p.championCommissionUsd.toFixed(2)})
                        </span>
                      </div>

                      {/* Quantity selector + add to cart */}
                      {qty === 0 ? (
                        <Button
                          type="button"
                          className="w-full font-semibold"
                          onClick={() => handleAddToCart(p)}
                          data-ocid={`products.add_to_cart.${i + 1}`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      ) : (
                        <div
                          className="flex items-center justify-between bg-primary/5 rounded-xl p-2 border border-primary/20"
                          data-ocid={`products.quantity_controls.${i + 1}`}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-9 h-9 p-0 rounded-full"
                            onClick={() => handleSetQty(p, qty - 1)}
                            aria-label="Decrease quantity"
                            data-ocid={`products.decrement.${i + 1}`}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-display font-bold text-lg text-foreground min-w-[2.5rem] text-center">
                            {qty}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-9 h-9 p-0 rounded-full"
                            onClick={() => handleSetQty(p, qty + 1)}
                            aria-label="Increase quantity"
                            data-ocid={`products.increment.${i + 1}`}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {qty > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 text-primary border-primary/40"
                          onClick={() => setCartOpen(true)}
                          data-ocid={`products.view_cart.${i + 1}`}
                        >
                          View Cart ({qty} in cart)
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const MISSION_BADGES = [
  { icon: "👩‍👧‍👦", label: "Women & Family Focused" },
  { icon: "🤝", label: "Ethical Production" },
  { icon: "♻️", label: "Sustainable Impact" },
];

function MissionStatementSection() {
  const { t } = useTranslations();
  return (
    <section
      className="py-24"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.52 0.13 40) 0%, oklch(0.44 0.11 35) 100%)",
      }}
      data-ocid="mission-statement.section"
    >
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="space-y-4 text-white/80 font-body text-base leading-relaxed mb-10">
          <p>{t("income_goal")}</p>
          <p className="text-white/70 text-sm">{t("pay_forward")}</p>
        </div>
        {/* Mission Badges */}
        <div
          className="flex flex-wrap justify-center gap-3 mt-8"
          data-ocid="mission.badges"
        >
          {MISSION_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm rounded-full px-5 py-2.5 text-white font-body text-sm font-semibold tracking-wide"
              data-ocid={`mission.badge.${badge.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
            >
              <span role="img" aria-hidden="true">
                {badge.icon}
              </span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactDashboardSection() {
  const { data: stats, isLoading } = useImpactStats();
  const statCards = [
    {
      label: "🏆 Champion Goal: 10",
      value: isLoading ? null : String(stats?.championsEmpowered ?? 0n),
      subtitle: "Be one of our first 10 champions",
      icon: "🏆",
    },
    {
      label: "💰 Community Target: 6,000,000 ៛/month",
      value: isLoading
        ? null
        : formatKhr(bigintToNumber(stats?.totalCommunityEarningsKhr ?? 0n)),
      subtitle: "Building sustainable monthly income for champions",
      icon: "💰",
    },
    {
      label: "🔄 Local Value Goal",
      value: isLoading
        ? null
        : formatKhr(bigintToNumber(stats?.localValueCirculatedKhr ?? 0n)),
      subtitle: "Keep it all in Cambodia",
      icon: "🔄",
    },
  ];
  return (
    <section className="py-20 bg-muted/40" data-ocid="impact-dashboard.section">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground">
          Real Impact, Real Champions
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl font-bold mb-2 text-foreground">
          Our Impact
        </h2>
        <p className="text-center text-muted-foreground font-body mb-12 text-sm">
          Live figures from our champion network
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-card rounded-2xl p-8 text-center border border-border shadow-sm"
              data-ocid={`impact-dashboard.${card.label.toLowerCase().replace(/ /g, "_")}.card`}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              {isLoading ? (
                <Skeleton className="h-8 w-24 mx-auto mb-2" />
              ) : (
                <div className="font-display text-2xl font-bold text-accent mb-2">
                  {card.value}
                </div>
              )}
              <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
                {card.label}
              </div>
              <div className="text-sm text-muted-foreground font-body leading-relaxed">
                {card.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChampionInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-full h-48 flex items-center justify-center font-display text-4xl font-bold text-white"
      style={{ background: "oklch(0.52 0.13 40)" }}
    >
      {initials}
    </div>
  );
}

function ChampionMetricChips({
  metrics,
}: {
  metrics: ChampionMetrics | undefined;
}) {
  const sponsors = metrics ? Number(metrics.sponsorCount) : 0;
  const bottles = metrics ? Number(metrics.bottlesSold) : 0;
  const earningsKhr = metrics ? Number(metrics.totalEarningsKhr) : 0;
  const earningsUsd = metrics ? metrics.totalEarningsUsd : 0;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
        🏆{" "}
        {sponsors === 0
          ? "First supporter!"
          : `${sponsors} sponsor${sponsors !== 1 ? "s" : ""}`}
      </span>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-foreground text-xs font-body font-medium">
        🧴 {bottles.toLocaleString("en-US")} bottles sold
      </span>
      {earningsKhr > 0 && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body font-medium">
          <span className="text-foreground font-semibold">
            {formatKhr(earningsKhr)}
          </span>
          <span className="text-xs opacity-70">
            ({`$${earningsUsd.toFixed(2)}`})
          </span>
        </span>
      )}
    </div>
  );
}

function ChampionsGallerySection() {
  const { t } = useTranslations();
  const { lang } = useLanguage();
  const { data: champions, isLoading } = useApprovedChampions();
  const { data: allMetrics } = useAllChampionMetrics();

  const metricsMap = new Map<string, ChampionMetrics>(
    (allMetrics ?? []).map((m) => [String(m.championId), m]),
  );

  const getName = (c: User) => {
    if (lang === "km" && c.fullNameKm) return c.fullNameKm;
    if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
    return c.fullNameEn;
  };

  const getBio = (c: User) => {
    const raw =
      (lang === "km" ? c.bioKm : lang === "fr" ? c.bioFr : c.bioEn) ??
      c.bioEn ??
      "";
    return raw.length > 120 ? `${raw.slice(0, 117)}\u2026` : raw;
  };

  return (
    <section
      id="champions-gallery"
      className="py-20 bg-background"
      data-ocid="champions-gallery.section"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground">
          The People Behind Every Bottle
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl font-bold mb-12 text-foreground">
          {t("meet_our_champions")}
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-9 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : !champions || champions.length === 0 ? (
          <div
            className="text-center py-16"
            data-ocid="champions-gallery.empty_state"
          >
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-muted-foreground font-body mb-6">
              Be the first champion in our network!
            </p>
            <Button
              asChild
              data-ocid="champions-gallery.become_champion_button"
            >
              <Link to="/become-a-champion">Become a Champion</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {champions.map((c, i) => (
              <Card
                key={String(c.id)}
                className="bg-card border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                data-ocid={`champions-gallery.item.${i + 1}`}
              >
                <Link to={`/champion/${String(c.id)}`}>
                  {c.avatarUrl ? (
                    <img
                      src={c.avatarUrl}
                      alt={getName(c)}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <ChampionInitials name={getName(c)} />
                  )}
                </Link>
                <CardContent className="p-6">
                  <Link
                    to={`/champion/${String(c.id)}`}
                    className="hover:text-primary transition-colors"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {getName(c)}
                    </h3>
                  </Link>
                  {getBio(c) && (
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-3">
                      {getBio(c)}
                    </p>
                  )}
                  <ChampionMetricChips metrics={metricsMap.get(String(c.id))} />
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1"
                      size="sm"
                      data-ocid={`champions-gallery.view_profile_link.${i + 1}`}
                    >
                      <Link to={`/champion/${String(c.id)}`}>View Profile</Link>
                    </Button>
                    <Button
                      asChild
                      className="flex-1"
                      size="sm"
                      data-ocid={`champions-gallery.support_button.${i + 1}`}
                    >
                      <Link to={`/hotel/select?champion=${String(c.id)}`}>
                        Support
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const TARGET_MARKETS = [
  { icon: "🍽️", label: "Restaurants" },
  { icon: "🏨", label: "Hotels" },
  { icon: "🌴", label: "Resorts" },
  { icon: "☕", label: "Cafes" },
  { icon: "🛒", label: "Retailers" },
];

function TargetMarketsSection() {
  return (
    <section
      className="py-16 bg-card border-y border-border"
      data-ocid="target-markets.section"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-body tracking-widest uppercase mb-2 text-muted-foreground">
          Perfect For
        </p>
        <h2 className="text-center font-display text-2xl sm:text-3xl font-bold mb-10 text-foreground">
          Who We Serve
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {TARGET_MARKETS.map((market, i) => (
            <div
              key={market.label}
              className="flex flex-col items-center gap-2 bg-background border border-border rounded-2xl px-8 py-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-w-[110px]"
              data-ocid={`target-markets.item.${i + 1}`}
            >
              <span className="text-3xl" role="img" aria-label={market.label}>
                {market.icon}
              </span>
              <span className="font-body text-sm font-semibold text-foreground">
                {market.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFooter() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-12 text-center border-t border-border"
      style={{ background: "oklch(0.18 0.02 50)" }}
      data-ocid="footer.section"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            asChild
            size="lg"
            className="font-semibold rounded-full px-8 bg-amber-500 text-white hover:bg-amber-600 border-0"
            data-ocid="footer.order_now_button"
          >
            <a href="#products">ORDER NOW</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            type="button"
            className="font-semibold rounded-full px-8 border-white text-white hover:bg-white hover:text-foreground"
            data-ocid="footer.enquire_button"
            onClick={() =>
              window.open(
                "mailto:hello@kampotheritage.com?subject=Enquiry",
                "_blank",
              )
            }
          >
            ENQUIRE
          </Button>
        </div>
        <p className="font-display text-xl font-bold text-white/90 mb-3">
          Build a stronger Cambodia
        </p>
        <p className="text-white/50 text-sm font-body tracking-widest uppercase mb-8">
          100% Cambodian • Ethically Made • Community Powered
        </p>
        <div className="border-t border-white/10 pt-6 text-white/30 text-xs font-body">
          © {year}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div data-ocid="home.page">
      <HeroSection />
      <ImpactNumbersSection />
      <TargetMarketsSection />
      <MissionStatementSection />
      <HowItWorksSection />
      <IngredientsSection />
      <ProductsSection />
      <ImpactDashboardSection />
      <ChampionsGallerySection />
      <HomeFooter />
    </div>
  );
}

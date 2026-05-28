import { createActor } from "@/backend";
import type { ChampionMetrics, User } from "@/backend";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/i18n";
import { bigintToNumber, formatKhr } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Award,
  ShoppingBag,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

// ── Hooks ────────────────────────────────────────────────────────────────────

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

function useChampionMetrics(championId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChampionMetrics | null>({
    queryKey: ["championMetrics", String(championId)],
    queryFn: async () => {
      if (!actor || championId === null) return null;
      return actor.getChampionMetrics(championId);
    },
    enabled: !!actor && !isFetching && championId !== null,
  });
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ChampionInitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-full h-72 sm:h-80 bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
      <span className="text-7xl font-display font-bold text-primary">
        {initials}
      </span>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  ocid: string;
}

function MetricCard({ icon, label, value, sub, ocid }: MetricCardProps) {
  return (
    <Card className="bg-card border-border" data-ocid={ocid}>
      <CardContent className="p-6 flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
          {icon}
        </div>
        <p className="text-xs font-body uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="font-display text-2xl font-bold text-foreground">
          {value}
        </p>
        {sub && (
          <p className="text-xs text-muted-foreground font-body">{sub}</p>
        )}
      </CardContent>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChampionProfile() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { data: champions, isLoading: championsLoading } =
    useApprovedChampions();

  const champion = champions?.find((c) => String(c.id) === id) ?? null;
  const championBigInt: bigint | null = champion ? champion.id : null;

  const { data: metrics, isLoading: metricsLoading } =
    useChampionMetrics(championBigInt);

  const isLoading = championsLoading;

  const getName = (c: User) => {
    if (lang === "km" && c.fullNameKm) return c.fullNameKm;
    if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
    return c.fullNameEn;
  };

  const getBio = (c: User) => {
    return (
      (lang === "km" ? c.bioKm : lang === "fr" ? c.bioFr : c.bioEn) ??
      c.bioEn ??
      ""
    );
  };

  const sponsorCount = metrics ? bigintToNumber(metrics.sponsorCount) : 0;
  const bottlesSold = metrics ? bigintToNumber(metrics.bottlesSold) : 0;
  const earningsKhr = metrics ? bigintToNumber(metrics.totalEarningsKhr) : 0;
  const earningsUsd = metrics ? metrics.totalEarningsUsd : 0;

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-card border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              to="/"
              className="font-display font-bold text-lg text-foreground"
            >
              Kampot Heritage
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => navigate("/")}
                aria-label="Back to home"
                data-ocid="champion-profile.close_button"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Skeleton className="h-72 w-full rounded-2xl mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-8" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
        <FloatingContactButtons />
      </div>
    );
  }

  // ── Not found state ────────────────────────────────────────────────────────
  if (!isLoading && !champion) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-card border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              to="/"
              className="font-display font-bold text-lg text-foreground"
            >
              Kampot Heritage
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => navigate("/")}
                aria-label="Back to home"
                data-ocid="champion-profile.close_button"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="container mx-auto px-4 py-24 max-w-lg text-center"
          data-ocid="champion-profile.not_found"
        >
          <div className="text-6xl mb-6">🌿</div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Champion not found
          </h1>
          <p className="text-muted-foreground font-body mb-8">
            This champion may no longer be active or the link may be incorrect.
          </p>
          <Button asChild data-ocid="champion-profile.back_link">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Champions Gallery
            </Link>
          </Button>
        </div>
        <FloatingContactButtons />
      </div>
    );
  }

  // ── Profile ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="champion-profile.page"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
            data-ocid="champion-profile.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link
            to="/"
            className="font-display font-bold text-lg text-foreground"
          >
            Kampot Heritage
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Back to home"
              data-ocid="champion-profile.close_button"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Photo */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          {champion!.avatarUrl ? (
            <img
              src={champion!.avatarUrl}
              alt={getName(champion!)}
              className="w-full h-72 sm:h-80 object-cover"
              loading="eager"
            />
          ) : (
            <ChampionInitialsAvatar name={getName(champion!)} />
          )}
        </div>

        {/* Name + bio */}
        <div className="mb-8">
          <h1
            className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4"
            data-ocid="champion-profile.name"
          >
            {getName(champion!)}
          </h1>
          {getBio(champion!) && (
            <p
              className="text-muted-foreground font-body text-base leading-relaxed"
              data-ocid="champion-profile.bio"
            >
              {getBio(champion!)}
            </p>
          )}
        </div>

        {/* Metric cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          data-ocid="champion-profile.metrics"
        >
          <MetricCard
            ocid="champion-profile.sponsors_card"
            icon={<Users className="w-5 h-5" />}
            label="Sponsors"
            value={
              sponsorCount === 0 ? (
                <span className="text-lg text-muted-foreground">
                  First supporter!
                </span>
              ) : (
                sponsorCount
              )
            }
            sub={
              sponsorCount > 0
                ? `${sponsorCount} hotel${sponsorCount !== 1 ? "s" : ""} supporting`
                : "Be the first!"
            }
          />
          <MetricCard
            ocid="champion-profile.bottles_card"
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Bottles Sold"
            value={bottlesSold.toLocaleString("en-US")}
            sub="bottles of Kampot Heritage Soap"
          />
          <MetricCard
            ocid="champion-profile.earnings_card"
            icon={<TrendingUp className="w-5 h-5" />}
            label="Total Earned"
            value={
              metricsLoading ? (
                <Skeleton className="h-8 w-24 mx-auto" />
              ) : (
                <span className="text-2xl font-bold">
                  {formatKhr(earningsKhr)}
                </span>
              )
            }
            sub={
              earningsUsd > 0 ? `($${earningsUsd.toFixed(2)} USD)` : undefined
            }
          />
        </div>

        {/* Impact note */}
        <div className="bg-muted/40 border border-border rounded-xl p-5 mb-8 flex items-start gap-3">
          <Award className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm font-body text-muted-foreground leading-relaxed">
            Every order you place through{" "}
            <span className="text-foreground font-semibold">
              {getName(champion!)}
            </span>{" "}
            contributes directly to their income — helping them build financial
            independence and eventually sponsor the next champion.
          </p>
        </div>

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="w-full text-base"
          data-ocid="champion-profile.support_button"
        >
          <Link to={`/hotel/select?champion=${String(champion!.id)}`}>
            Support {getName(champion!)} — Order Now
          </Link>
        </Button>
      </div>

      <FloatingContactButtons />
    </div>
  );
}

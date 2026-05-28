import { createActor } from "@/backend";
import type { ChampionMetrics } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { makeApi } from "@/lib/api";
import type { LanguageCode } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { User } from "@/types";
import { ChampionSelectionMethod } from "@/types";
import { bigintToNumber, formatKhr } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onChampionSelected: (champion: User, method: ChampionSelectionMethod) => void;
}

function getChampionName(c: User, lang: LanguageCode): string {
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}

function getChampionBio(c: User, lang: LanguageCode): string {
  if (lang === "km" && c.bioKm) return c.bioKm;
  if (lang === "fr" && c.bioFr) return c.bioFr;
  return c.bioEn ?? "";
}

function AvatarInitials({
  name,
  size = "lg",
}: { name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const cls = size === "lg" ? "w-20 h-20 text-2xl" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${cls} rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

const ui = {
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
    contactStaff:
      "Contact staff at +855 12 345 678 or staff@kampotheritage.com",
    noResults: "No champions found matching your search.",
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
    noResults: "រកមិនឃើញអ្នកជើងឯកដែលត្រូវនឹងការស្វែងរក។",
  },
  fr: {
    rememberTitle: "Je me souviens de mon champion",
    rememberSub: "Rechercher par nom ou utiliser un QR code mémorisé",
    browseTitle: "Parcourir tous les champions",
    browseSub:
      "Choisissez un champion à soutenir. Chaque commande change une vie.",
    staffTitle: "Un membre du personnel m'aide",
    staffSub:
      "Contactez le personnel de Kampot Heritage pour passer une commande en votre nom",
    searchPlaceholder: "Rechercher un champion...",
    sortMostEarned: "Plus gagné",
    sortNewest: "Plus récent",
    sortRandom: "Aléatoire",
    selectBtn: "Soutenir ce champion",
    confirmTitle: "Confirmez votre champion",
    confirmBtn: "Sélectionner ce champion",
    cancelBtn: "Annuler",
    contactStaff:
      "Contactez le personnel au +855 12 345 678 ou staff@kampotheritage.com",
    noResults: "Aucun champion trouvé correspondant à votre recherche.",
  },
};

type SortMode = "earned" | "newest" | "random";

export default function ChampionSelection({ onChampionSelected }: Props) {
  const { lang } = useLanguage();
  const l = ui[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  // Fetch all champion metrics to show inline on browse cards
  const { data: allMetrics } = useQuery<ChampionMetrics[]>({
    queryKey: ["allChampionMetrics"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllChampionMetrics();
    },
    enabled: !!actor && !isFetching,
  });

  const metricsById = useMemo(() => {
    const map = new Map<string, ChampionMetrics>();
    if (allMetrics) {
      for (const m of allMetrics) {
        map.set(m.championId.toString(), m);
      }
    }
    return map;
  }, [allMetrics]);

  const [champions, setChampions] = useState<User[]>([]);
  const [loadingChampions, setLoadingChampions] = useState(false);
  const [expanded, setExpanded] = useState<
    "remember" | "browse" | "staff" | null
  >("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [confirmChampion, setConfirmChampion] = useState<{
    champion: User;
    method: ChampionSelectionMethod;
  } | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoadingChampions(true);
    makeApi(actor)
      .getApprovedChampions()
      .then(setChampions)
      .catch(() => {})
      .finally(() => setLoadingChampions(false));
  }, [actor, isFetching]);

  const filteredBySearch = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return champions.filter(
      (c) =>
        c.fullNameEn.toLowerCase().includes(q) ||
        (c.fullNameKm ?? "").includes(q) ||
        (c.fullNameFr ?? "").toLowerCase().includes(q),
    );
  }, [champions, searchQuery]);

  const sortedBrowse = useMemo(() => {
    const list = [...champions];
    if (sortMode === "newest")
      return list.sort((a, b) => Number(b.createdAt - a.createdAt));
    if (sortMode === "random") return list.sort(() => Math.random() - 0.5);
    return list; // "earned" — no commission data available client-side, keep order
  }, [champions, sortMode]);

  const CHAMPION_KEY = "hotel_selected_champion_id";

  function handleConfirm() {
    if (!confirmChampion) return;
    localStorage.setItem(CHAMPION_KEY, confirmChampion.champion.id.toString());
    onChampionSelected(confirmChampion.champion, confirmChampion.method);
    setConfirmChampion(null);
  }

  function OptionCard({
    id,
    emoji,
    title,
    sub,
    children,
  }: {
    id: "remember" | "browse" | "staff";
    emoji: string;
    title: string;
    sub: string;
    children: React.ReactNode;
  }) {
    const isOpen = expanded === id;
    return (
      <Card
        className={`border-2 transition-all duration-200 cursor-pointer ${isOpen ? "border-primary shadow-md" : "border-border hover:border-primary/50"}`}
      >
        <CardContent className="p-0">
          <button
            type="button"
            className="w-full text-left px-6 py-5 flex items-start gap-4"
            onClick={() => setExpanded(isOpen ? null : id)}
            data-ocid={`hotel.champion_select.${id}_option`}
          >
            <span className="text-3xl mt-0.5">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg font-semibold text-foreground">
                {title}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>
            </div>
            <span className="text-muted-foreground text-lg mt-1">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>
          {isOpen && (
            <div className="px-6 pb-6 pt-2 border-t border-border">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Close button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        data-ocid="hotel.champion_select.close_button"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          🌿{" "}
          {lang === "km"
            ? "ជ្រើសរើសអ្នកជើងឯក"
            : lang === "fr"
              ? "Sélectionnez un Champion"
              : "Select a Champion"}
        </h1>
        <p className="text-muted-foreground">
          {lang === "km"
            ? "រាល់ការបញ្ជាទិញគឺជាការជួយដល់ជីវិត"
            : lang === "fr"
              ? "Chaque commande soutient un champion qui reconstruit sa vie"
              : "Every order directly supports a champion rebuilding their life"}
        </p>
      </div>

      <div className="space-y-4">
        <OptionCard
          id="remember"
          emoji="🔍"
          title={l.rememberTitle}
          sub={l.rememberSub}
        >
          <div className="space-y-3">
            <Input
              placeholder={l.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-input"
              data-ocid="hotel.champion_select.search_input"
            />
            {loadingChampions && (
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            )}
            {!loadingChampions &&
              searchQuery &&
              filteredBySearch.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {l.noResults}
                </p>
              )}
            <div className="space-y-2">
              {filteredBySearch.map((c) => (
                <button
                  key={c.id.toString()}
                  type="button"
                  className="w-full text-left flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  onClick={() =>
                    setConfirmChampion({
                      champion: c,
                      method: ChampionSelectionMethod.remembered,
                    })
                  }
                  data-ocid={`hotel.champion_select.search_result.item.${filteredBySearch.indexOf(c) + 1}`}
                >
                  <AvatarInitials name={c.fullNameEn} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {getChampionName(c, lang)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {getChampionBio(c, lang).slice(0, 80)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </OptionCard>

        <OptionCard
          id="browse"
          emoji="🏆"
          title={l.browseTitle}
          sub={l.browseSub}
        >
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["newest", "earned", "random"] as SortMode[]).map((mode) => (
                <Button
                  key={mode}
                  type="button"
                  variant={sortMode === mode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortMode(mode)}
                  data-ocid={`hotel.champion_select.sort_${mode}`}
                >
                  {mode === "newest"
                    ? l.sortNewest
                    : mode === "earned"
                      ? l.sortMostEarned
                      : l.sortRandom}
                </Button>
              ))}
            </div>
            {loadingChampions && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[560px] overflow-y-auto pr-1">
              {sortedBrowse.map((c, idx) => {
                const metrics = metricsById.get(c.id.toString());
                const sponsors = metrics
                  ? bigintToNumber(metrics.sponsorCount)
                  : 0;
                const bottles = metrics
                  ? bigintToNumber(metrics.bottlesSold)
                  : 0;
                const earningsKhr = metrics
                  ? bigintToNumber(metrics.totalEarningsKhr)
                  : 0;
                const earningsUsd = metrics ? metrics.totalEarningsUsd : 0;
                const isNew =
                  sponsors === 0 && bottles === 0 && earningsKhr === 0;
                return (
                  <div
                    key={c.id.toString()}
                    className="flex flex-col rounded-xl border border-border bg-card hover:border-primary/60 hover:shadow-md hover:scale-[1.02] transition-all duration-200 overflow-hidden"
                    data-ocid={`hotel.champion_select.browse_list.item.${idx + 1}`}
                  >
                    {/* Avatar area */}
                    <div className="flex justify-center pt-6 pb-3 bg-muted/20">
                      {c.avatarUrl ? (
                        <img
                          src={c.avatarUrl}
                          alt={getChampionName(c, lang)}
                          loading="lazy"
                          className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-sm"
                        />
                      ) : (
                        <AvatarInitials name={c.fullNameEn} size="lg" />
                      )}
                    </div>
                    {/* Card body */}
                    <div className="flex flex-col flex-1 px-4 pb-4 pt-2 gap-2">
                      <p className="font-display font-semibold text-base text-foreground text-center leading-snug">
                        {getChampionName(c, lang)}
                      </p>
                      {/* Metrics row */}
                      {isNew ? (
                        <div className="flex justify-center">
                          <Badge variant="secondary" className="text-xs">
                            🌱 New Champion
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex flex-wrap justify-center gap-1">
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            🏆 {sponsors} sponsor{sponsors !== 1 ? "s" : ""}
                          </span>
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-accent/20 text-foreground text-xs font-medium">
                            🧴 {bottles.toLocaleString("en-US")}
                          </span>
                          {earningsKhr > 0 && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                              <span className="text-foreground font-semibold">
                                {formatKhr(earningsKhr)}
                              </span>
                              <span className="opacity-70">
                                (${earningsUsd.toFixed(2)})
                              </span>
                            </span>
                          )}
                        </div>
                      )}
                      {/* Bio */}
                      <p className="text-xs text-muted-foreground text-center line-clamp-2 flex-1">
                        {getChampionBio(c, lang).slice(0, 120) || "\u00A0"}
                      </p>
                      {/* Action button */}
                      <Button
                        type="button"
                        size="sm"
                        variant="default"
                        className="w-full mt-1"
                        onClick={() =>
                          setConfirmChampion({
                            champion: c,
                            method: ChampionSelectionMethod.browsed_list,
                          })
                        }
                        data-ocid={`hotel.champion_select.support_button.${idx + 1}`}
                      >
                        {l.selectBtn}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </OptionCard>

        <OptionCard id="staff" emoji="👥" title={l.staffTitle} sub={l.staffSub}>
          <div className="bg-muted/40 rounded-lg p-4">
            <p className="text-sm text-foreground">{l.contactStaff}</p>
          </div>
        </OptionCard>
      </div>

      <Dialog
        open={!!confirmChampion}
        onOpenChange={() => setConfirmChampion(null)}
      >
        <DialogContent data-ocid="hotel.champion_confirm.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {l.confirmTitle}
            </DialogTitle>
          </DialogHeader>
          {confirmChampion && (
            <div className="flex gap-4 py-2">
              <AvatarInitials
                name={confirmChampion.champion.fullNameEn}
                size="lg"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-lg text-foreground">
                  {getChampionName(confirmChampion.champion, lang)}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {confirmChampion.method === ChampionSelectionMethod.remembered
                    ? lang === "km"
                      ? "ចាំ"
                      : lang === "fr"
                        ? "Mémorisé"
                        : "Remembered"
                    : lang === "km"
                      ? "រកមើល"
                      : lang === "fr"
                        ? "Parcouru"
                        : "Browsed"}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {getChampionBio(confirmChampion.champion, lang)}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmChampion(null)}
              data-ocid="hotel.champion_confirm.cancel_button"
            >
              {l.cancelBtn}
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              data-ocid="hotel.champion_confirm.confirm_button"
            >
              {l.confirmBtn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

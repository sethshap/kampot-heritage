import { createActor } from "@/backend";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { makeApi } from "@/lib/api";
import type { LanguageCode } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { Order, User } from "@/types";
import { bigintToNumber } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  currentChampion: User | null;
  onChangeChampion: () => void;
}

function getChampionName(c: User | null, lang: LanguageCode): string {
  if (!c) return "";
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}

function getChampionBio(c: User | null, lang: LanguageCode): string {
  if (!c) return "";
  if (lang === "km" && c.bioKm) return c.bioKm;
  if (lang === "fr" && c.bioFr) return c.bioFr;
  return c?.bioEn ?? "";
}

const ui = {
  en: {
    welcomeBack: "Welcome back",
    yourChampion: "Your Supported Champion",
    changeChampion: "Change champion",
    placeOrder: "Place New Order",
    firstOrder: "Place your first order",
    firstOrderSub: "Choose a champion and make an impact today.",
    selectChampion: "Select a Champion",
    impactLabel: (name: string, months: string) =>
      `You've helped provide approximately ${months} months of baseline income for ${name}`,
    orderHistory: "Order History",
    colDate: "Date",
    colChampion: "Champion",
    colTotal: "Total",
    colStatus: "Status",
    paid: "Paid",
    pending: "Pending",
    noOrders: "No orders yet.",
    loading: "Loading...",
  },
  km: {
    welcomeBack: "ស្វាគមន៍ត្រលប់មកវិញ",
    yourChampion: "អ្នកជើងឯកដែលអ្នកគាំទ្រ",
    changeChampion: "ប្តូរអ្នកជើងឯក",
    placeOrder: "ដាក់ការបញ្ជាទិញថ្មី",
    firstOrder: "ដាក់ការបញ្ជាទិញដំបូងរបស់អ្នក",
    firstOrderSub: "ជ្រើសរើសអ្នកជើងឯក ហើយបង្កើតផលប៉ះពាល់ថ្ងៃនេះ។",
    selectChampion: "ជ្រើសរើសអ្នកជើងឯក",
    impactLabel: (name: string, months: string) =>
      `អ្នកបានជួយផ្តល់ប្រហែល ${months} ខែប្រាក់ចំណូលមូលដ្ឋានដល់ ${name}`,
    orderHistory: "ប្រវត្តិការបញ្ជាទិញ",
    colDate: "កាលបរិច្ឆេទ",
    colChampion: "អ្នកជើងឯក",
    colTotal: "សរុប",
    colStatus: "ស្ថានភាព",
    paid: "បានបង់",
    pending: "រង់ចាំ",
    noOrders: "មិនទាន់មានការបញ្ជាទិញ។",
    loading: "កំពុងផ្ទុក...",
  },
  fr: {
    welcomeBack: "Bon retour",
    yourChampion: "Votre champion soutenu",
    changeChampion: "Changer de champion",
    placeOrder: "Passer une nouvelle commande",
    firstOrder: "Passez votre première commande",
    firstOrderSub:
      "Choisissez un champion et faites une différence aujourd'hui.",
    selectChampion: "Sélectionner un champion",
    impactLabel: (name: string, months: string) =>
      `Vous avez aidé à fournir environ ${months} mois de revenu de base pour ${name}`,
    orderHistory: "Historique des commandes",
    colDate: "Date",
    colChampion: "Champion",
    colTotal: "Total",
    colStatus: "Statut",
    paid: "Payé",
    pending: "En attente",
    noOrders: "Pas encore de commandes.",
    loading: "Chargement...",
  },
};

export default function HotelDashboard({
  currentChampion,
  onChangeChampion,
}: Props) {
  const { lang } = useLanguage();
  const l = ui[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [championsMap, setChampionsMap] = useState<Map<string, User>>(
    new Map(),
  );

  const hotelIdStr = localStorage.getItem("hotel_user_id");
  const hotelName = localStorage.getItem("hotel_user_name") ?? "";

  useEffect(() => {
    if (!actor || isFetching || !hotelIdStr) return;
    setLoadingOrders(true);
    const api = makeApi(actor);
    Promise.all([
      api.getOrdersByHotel(BigInt(hotelIdStr)),
      api.getApprovedChampions(),
    ])
      .then(([fetchedOrders, champions]) => {
        setOrders(fetchedOrders);
        const map = new Map<string, User>();
        for (const c of champions) map.set(c.id.toString(), c);
        setChampionsMap(map);
      })
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [actor, isFetching, hotelIdStr]);

  const totalContributed = orders.reduce(
    (sum, o) => sum + bigintToNumber(o.totalAmountKhr),
    0,
  );
  const monthsImpact = currentChampion
    ? (totalContributed / 600000).toFixed(1)
    : "0";

  const champName = getChampionName(currentChampion, lang);

  if (!hotelIdStr) {
    navigate("/hotel/register");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Close button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        data-ocid="hotel.dashboard.close_button"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Welcome */}
      <div>
        <p className="text-muted-foreground text-sm">{l.welcomeBack}</p>
        <h1 className="font-display text-3xl font-bold text-foreground">
          {hotelName}
        </h1>
      </div>

      {/* No orders empty state */}
      {orders.length === 0 && !loadingOrders && (
        <Card
          className="border-2 border-dashed border-border"
          data-ocid="hotel.dashboard.empty_state"
        >
          <CardContent className="py-14 text-center">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              {l.firstOrder}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              {l.firstOrderSub}
            </p>
            <Button
              type="button"
              onClick={() => navigate("/hotel/select-champion")}
              data-ocid="hotel.dashboard.first_order_button"
            >
              {l.selectChampion}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Champion + actions */}
      {(currentChampion || orders.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current champion */}
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {l.yourChampion}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentChampion ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center">
                      {currentChampion.fullNameEn
                        .split(" ")
                        .map((w: string) => w[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {champName}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {getChampionBio(currentChampion, lang).slice(0, 80)}
                      </p>
                    </div>
                  </div>
                  {totalContributed > 0 && (
                    <p className="text-xs text-muted-foreground bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
                      {l.impactLabel(champName, monthsImpact)}
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onChangeChampion}
                    data-ocid="hotel.dashboard.change_champion_button"
                  >
                    {l.changeChampion}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onChangeChampion}
                  data-ocid="hotel.dashboard.select_champion_button"
                >
                  {l.selectChampion}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Place new order */}
          <Card className="border-border bg-primary/5">
            <CardContent className="h-full flex flex-col items-center justify-center py-10 gap-4">
              <span className="text-4xl">🛒</span>
              <Button
                type="button"
                size="lg"
                onClick={() =>
                  navigate(
                    currentChampion ? "/hotel/order" : "/hotel/select-champion",
                  )
                }
                data-ocid="hotel.dashboard.place_order_button"
              >
                {l.placeOrder}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order history */}
      {(orders.length > 0 || loadingOrders) && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">{l.orderHistory}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loadingOrders ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border">
                      <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                        {l.colDate}
                      </th>
                      <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                        {l.colChampion}
                      </th>
                      <th className="text-right px-4 py-3 text-muted-foreground font-medium">
                        {l.colTotal}
                      </th>
                      <th className="text-center px-4 py-3 text-muted-foreground font-medium">
                        {l.colStatus}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => {
                      const champ = championsMap.get(
                        order.championId.toString(),
                      );
                      const champDisplayName = champ
                        ? getChampionName(champ, lang)
                        : order.championId.toString();
                      const date = new Date(
                        Number(order.orderDate) / 1_000_000,
                      ).toLocaleDateString();
                      return (
                        <tr
                          key={order.id.toString()}
                          className="border-b border-border last:border-0 hover:bg-muted/20"
                          data-ocid={`hotel.dashboard.order_history.item.${idx + 1}`}
                        >
                          <td className="px-4 py-3 text-foreground">{date}</td>
                          <td className="px-4 py-3 text-foreground">
                            {champDisplayName}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <CurrencyDisplay
                              khr={bigintToNumber(order.totalAmountKhr)}
                              usd={order.totalAmountUsd}
                              size="sm"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge
                              variant={
                                order.khqrPaymentConfirmed
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {order.khqrPaymentConfirmed ? l.paid : l.pending}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

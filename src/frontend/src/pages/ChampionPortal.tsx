import { createActor } from "@/backend";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { ChampionCode, Order, User } from "@/types";
import { formatKhr, formatUsd } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  BarChart3,
  Box,
  CheckCircle,
  ChevronRight,
  Copy,
  Download,
  Heart,
  Hotel,
  QrCode,
  Share2,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { toast } from "sonner";

// ── Language support ─────────────────────────────────────────────────────────
type Lang = "en" | "km" | "fr";

const T: Record<string, Record<Lang, string>> = {
  dashboard: { en: "Dashboard", km: "ផ្ទាំងគ្រប់គ្រង", fr: "Tableau de bord" },
  myCodes: { en: "My Codes", km: "កូដរបស់ខ្ញុំ", fr: "Mes Codes" },
  payForward: {
    en: "Pay It Forward",
    km: "ចែករំលែកទៅអនាគត",
    fr: "Payer en Avant",
  },
  monthlyEarnings: {
    en: "This Month's Earnings",
    km: "ប្រាក់ចំណូលខែនេះ",
    fr: "Gains du Mois",
  },
  hotelsOrdering: {
    en: "Hotels Ordering",
    km: "សណ្ឋាគារបញ្ជាទិញ",
    fr: "Hôtels Commandant",
  },
  championsReferred: {
    en: "Champions Referred",
    km: "អ្នកជើងឯកបញ្ជូន",
    fr: "Champions Référés",
  },
  consignmentHeld: {
    en: "Consignment Held",
    km: "ទំនិញដែលកាន់",
    fr: "Stock en Dépôt",
  },
  myReferralCode: {
    en: "My Referral Code",
    km: "កូដអញ្ជើញរបស់ខ្ញុំ",
    fr: "Mon Code Parrainage",
  },
  myQrCode: { en: "My QR Code", km: "កូដ QR របស់ខ្ញុំ", fr: "Mon Code QR" },
  copy: { en: "Copy", km: "ចម្លង", fr: "Copier" },
  copied: { en: "Copied!", km: "បានចម្លង!", fr: "Copié!" },
  share: { en: "Share", km: "ចែករំលែក", fr: "Partager" },
  download: { en: "Download QR", km: "ទាញយក QR", fr: "Télécharger QR" },
  print: { en: "Print Card", km: "បោះពុម្ពប័ណ្ណ", fr: "Imprimer Carte" },
  viewMyCodes: { en: "View My Codes", km: "មើលកូដរបស់ខ្ញុំ", fr: "Voir Mes Codes" },
  timesHotelOrders: {
    en: "times for hotel orders",
    km: "ដងសម្រាប់ការបញ្ជាទិញសណ្ឋាគារ",
    fr: "fois pour commandes hôtels",
  },
  timesChampionReferrals: {
    en: "times for champion referrals",
    km: "ដងសម្រាប់បញ្ជូនអ្នកជើងឯក",
    fr: "fois pour parrainages champions",
  },
  scannedTimes: { en: "scanned", km: "ស្កែន", fr: "fois scannés" },
  payForwardHero: {
    en: "When you're ready, you can sponsor and train the next champion off the streets.",
    km: "នៅពេលដែលអ្នករួចរាល់ អ្នកអាចឧបត្ថម្ភ និងបណ្តុះបណ្តាលអ្នកជើងឯកបន្ទាប់ពីផ្លូវវិញ។",
    fr: "Quand vous êtes prêt, vous pouvez parrainer et former le prochain champion.",
  },
  referNewChampion: {
    en: "Refer a New Champion",
    km: "សូមអញ្ជើញអ្នកជើងឯកថ្មី",
    fr: "Parrainer un Nouveau Champion",
  },
  noReferrals: {
    en: "No champions referred yet — share your code to invite someone!",
    km: "មិនទាន់មានអ្នកជើងឯកត្រូវបានណែនាំ — ចែករំលែককូដរបស់អ្នក!",
    fr: "Aucun champion parrainé — partagez votre code pour inviter quelqu'un!",
  },
  mentorBadge: {
    en: "Champion Mentor",
    km: "គ្រូបង្វឹកអ្នកជើងឯក",
    fr: "Mentor Champion",
  },
  approvedBadge: { en: "Approved", km: "អនុម័ត", fr: "Approuvé" },
  financialIndependence: {
    en: "reaching 600,000 ៛/month means financial independence",
    km: "ការឈានដល់ ៦០០,០០០ ៛/ខែ មាននៅឯករាជ្យភាពហិរញ្ញវត្ថុ",
    fr: "atteindre 600 000 ៛/mois signifie l'indépendance financière",
  },
  youveEarned: { en: "You've earned", km: "អ្នកបានរក", fr: "Vous avez gagné" },
  shareableLink: {
    en: "Shareable Referral Link",
    km: "តំណអញ្ជើញ",
    fr: "Lien de Parrainage",
  },
  copyLink: { en: "Copy Link", km: "ចម្លងតំណ", fr: "Copier le Lien" },
  championPortal: {
    en: "Champion Portal",
    km: "វិបផតអ្នកជើងឯក",
    fr: "Portail Champion",
  },
  loading: { en: "Loading…", km: "កំពុងផ្ទុក…", fr: "Chargement…" },
};

function t(key: string, lang: Lang): string {
  return T[key]?.[lang] ?? key;
}

// ── Hooks ────────────────────────────────────────────────────────────────────
function useChampionData(championId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  const enabled = !!actor && !isFetching && championId > BigInt(0);

  const champion = useQuery<User | null>({
    queryKey: ["champion", championId.toString()],
    queryFn: () => actor!.getUserById(championId),
    enabled,
  });

  const codes = useQuery<ChampionCode[]>({
    queryKey: ["championCodes", championId.toString()],
    queryFn: () => actor!.getChampionCodes(championId),
    enabled,
  });

  const orders = useQuery<Order[]>({
    queryKey: ["championOrders", championId.toString()],
    queryFn: () => actor!.getOrdersByChampion(championId),
    enabled,
  });

  const allChampions = useQuery<User[]>({
    queryKey: ["approvedChampions"],
    queryFn: () => actor!.getApprovedChampions(),
    enabled: !!actor && !isFetching,
  });

  return { champion, codes, orders, allChampions };
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-body uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-2xl font-display font-bold text-primary leading-tight">
        {value}
      </p>
      {sub && <p className="text-xs text-muted-foreground font-body">{sub}</p>}
    </div>
  );
}

// ── Champion Dashboard ───────────────────────────────────────────────────────
function ChampionDashboard({
  champion,
  codes,
  orders,
  lang,
}: {
  champion: User;
  codes: ChampionCode[];
  orders: Order[];
  lang: Lang;
}) {
  const navigate = useNavigate();
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const monthlyEarnings = orders
    .filter((o) => Number(o.orderDate) / 1_000_000 >= monthStart)
    .reduce((sum, o) => sum + Number(o.totalAmountKhr), 0);
  const monthlyEarningsUsd = orders
    .filter((o) => Number(o.orderDate) / 1_000_000 >= monthStart)
    .reduce((sum, o) => sum + Number(o.totalAmountUsd), 0);

  const hotelCount = new Set(orders.map((o) => o.hotelId.toString())).size;
  const referralCode =
    codes[0]?.referralCode ?? champion.personalReferralCode ?? "—";
  const qrUrl = codes[0]?.qrCodeImageUrl ?? null;
  const shareUrl = `${window.location.origin}/become-a-champion?ref=${referralCode}`;

  const name =
    (lang === "km"
      ? champion.fullNameKm
      : lang === "fr"
        ? champion.fullNameFr
        : null) ?? champion.fullNameEn;

  function copyCode() {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => toast.success(t("copied", lang)));
  }

  function shareCode() {
    if (navigator.share) {
      navigator
        .share({ title: "Join Kampot Heritage", url: shareUrl })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => toast.success(t("copied", lang)));
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Hero card */}
      <div
        data-ocid="champion.dashboard.hero_card"
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary p-6 md:p-8 text-primary-foreground flex flex-col md:flex-row gap-6 items-center shadow-lg"
      >
        <div className="shrink-0">
          {champion.avatarUrl ? (
            <img
              src={champion.avatarUrl}
              alt={name}
              loading="lazy"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary-foreground/30 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Users className="w-10 h-10 text-primary-foreground/60" />
            </div>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-primary-foreground/70 text-sm font-body uppercase tracking-widest mb-1">
            Kampot Heritage Champion
          </p>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-3 leading-tight">
            {name}
          </h1>
          {/* Referral code block — prominent with copy + share */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/15 rounded-lg px-4 py-2">
              <span className="text-xs font-body text-primary-foreground/70 uppercase tracking-wide">
                {t("myReferralCode", lang)}
              </span>
              <span className="font-mono font-bold text-lg text-primary-foreground tracking-wider">
                {referralCode}
              </span>
              <button
                type="button"
                onClick={copyCode}
                data-ocid="champion.referral_code.copy_button"
                className="ml-1 p-1.5 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
                aria-label={t("copy", lang)}
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={shareCode}
                data-ocid="champion.referral_code.share_button"
                className="p-1.5 rounded-lg bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
                aria-label={t("share", lang)}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {qrUrl && (
          <button
            type="button"
            data-ocid="champion.dashboard.qr_preview"
            onClick={() => navigate("/champion/codes")}
            className="shrink-0 flex flex-col items-center gap-2 bg-primary-foreground/15 rounded-xl p-3 hover:bg-primary-foreground/25 transition-colors cursor-pointer"
          >
            <img
              src={qrUrl}
              alt="QR"
              loading="lazy"
              className="w-20 h-20 rounded"
            />
            <span className="text-xs text-primary-foreground/70 font-body flex items-center gap-1">
              {t("viewMyCodes", lang)} <ChevronRight className="w-3 h-3" />
            </span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-5 border border-border shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-body uppercase tracking-wide">
              {t("monthlyEarnings", lang)}
            </span>
          </div>
          <p className="text-2xl font-display font-bold text-primary leading-tight">
            {formatKhr(monthlyEarnings)}
          </p>
          <p className="text-sm text-muted-foreground font-body">
            {formatUsd(monthlyEarningsUsd)}
          </p>
        </div>
        <StatCard
          icon={<Hotel className="w-4 h-4" />}
          label={t("hotelsOrdering", lang)}
          value={hotelCount.toString()}
        />
        <StatCard
          icon={<Users className="w-4 h-4" />}
          label={t("championsReferred", lang)}
          value="—"
        />
        <StatCard
          icon={<Box className="w-4 h-4" />}
          label={t("consignmentHeld", lang)}
          value={champion.consignmentInventoryHeld.toString()}
        />
      </div>

      {/* QR code thumbnail if available */}
      {qrUrl && (
        <div
          data-ocid="champion.dashboard.qr_section"
          className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6"
        >
          <img
            src={qrUrl}
            alt="QR Code"
            loading="lazy"
            className="w-32 h-32 rounded-xl border-4 border-primary/20 shadow-md shrink-0"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-semibold text-foreground mb-1">
              {t("myQrCode", lang)}
            </h3>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Hotels scan this to place orders directly through you.
            </p>
            <button
              type="button"
              onClick={() => navigate("/champion/codes")}
              data-ocid="champion.dashboard.view_codes_button"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold rounded-xl px-5 py-2.5 hover:bg-primary/90 transition-colors text-sm"
            >
              {t("viewMyCodes", lang)} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Pay It Forward CTA */}
      <div
        data-ocid="champion.dashboard.pay_forward_section"
        className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5"
      >
        <div className="w-12 h-12 shrink-0 rounded-full bg-accent/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-display font-semibold text-foreground mb-1">
            {t("payForward", lang)}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            {t("payForwardHero", lang)}
          </p>
        </div>
        <button
          type="button"
          onClick={shareCode}
          data-ocid="champion.dashboard.refer_champion_button"
          className="shrink-0 inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-semibold rounded-xl px-5 py-2.5 hover:bg-accent/90 transition-colors text-sm whitespace-nowrap"
        >
          <Share2 className="w-4 h-4" />
          {t("referNewChampion", lang)}
        </button>
      </div>
    </div>
  );
}

// ── My Codes Page ────────────────────────────────────────────────────────────
function MyCodesPage({
  champion,
  codes,
  lang,
}: {
  champion: User;
  codes: ChampionCode[];
  lang: Lang;
}) {
  const code = codes[0];
  const referralCode =
    code?.referralCode ?? champion.personalReferralCode ?? "—";
  const qrUrl = code?.qrCodeImageUrl ?? null;
  const hotelUses = Number(code?.timesUsedForHotelOrders ?? 0);
  const referralUses = Number(code?.timesUsedForChampionReferrals ?? 0);
  const safeName = champion.fullNameEn.replace(/\s+/g, "-").toLowerCase();
  const shareUrl = `${window.location.origin}/become-a-champion?ref=${referralCode}`;

  function copyReferral() {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => toast.success(t("copied", lang)));
  }

  function shareReferral() {
    if (navigator.share) {
      navigator
        .share({ title: "Kampot Heritage", url: shareUrl })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => toast.success(t("copied", lang)));
    }
  }

  function downloadQr() {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `kampot-heritage-qr-${safeName}.png`;
    a.click();
  }

  function printCard() {
    if (!qrUrl) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head><title>QR Card – ${champion.fullNameEn}</title>
      <style>
        body{margin:0;font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#fff}
        .card{text-align:center;border:2px solid #8B5E3C;border-radius:16px;padding:32px;max-width:320px}
        h2{font-size:20px;margin:12px 0 4px} p{font-size:13px;color:#666;margin:0 0 8px}
        .code{font-family:monospace;font-size:16px;font-weight:bold;background:#f5efe8;padding:8px 16px;border-radius:8px;display:inline-block;margin-top:8px}
        img{width:220px;height:220px}
      </style></head><body>
      <div class="card">
        <img src="${qrUrl}" alt="QR Code" />
        <h2>${champion.fullNameEn}</h2>
        <p>Kampot Heritage Champion</p>
        <div class="code">${referralCode}</div>
      </div></body></html>
    `);
    win.document.close();
    win.print();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Referral Code card */}
      <div
        data-ocid="champion.codes.referral_card"
        className="bg-card rounded-2xl border border-border p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Star className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            {t("myReferralCode", lang)}
          </h2>
        </div>
        <div
          data-ocid="champion.referral_code.display"
          className="font-mono text-2xl md:text-4xl font-bold text-primary tracking-wider text-center py-6 bg-primary/5 rounded-xl border border-primary/20 mb-4 break-all"
        >
          {referralCode}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={copyReferral}
            data-ocid="champion.referral_code.copy_button"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold rounded-xl py-3 hover:bg-primary/90 transition-colors"
          >
            <Copy className="w-4 h-4" /> {t("copy", lang)}
          </button>
          <button
            type="button"
            onClick={shareReferral}
            data-ocid="champion.referral_code.share_button"
            className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-body font-semibold rounded-xl py-3 hover:bg-accent/90 transition-colors"
          >
            <Share2 className="w-4 h-4" /> {t("share", lang)}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-2xl font-display font-bold text-primary">
              {hotelUses}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              {t("timesHotelOrders", lang)}
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-2xl font-display font-bold text-accent">
              {referralUses}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              {t("timesChampionReferrals", lang)}
            </p>
          </div>
        </div>
      </div>

      {/* QR Code card */}
      <div
        data-ocid="champion.codes.qr_card"
        className="bg-card rounded-2xl border border-border p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <QrCode className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-lg font-display font-semibold text-foreground">
            {t("myQrCode", lang)}
          </h2>
        </div>
        {qrUrl ? (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={qrUrl}
                alt="QR Code"
                loading="lazy"
                data-ocid="champion.qr_code.image"
                className="w-56 h-56 md:w-72 md:h-72 rounded-xl border-4 border-primary/20 shadow-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={downloadQr}
                data-ocid="champion.qr_code.download_button"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold rounded-xl py-3 hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" /> {t("download", lang)}
              </button>
              <button
                type="button"
                onClick={printCard}
                data-ocid="champion.qr_code.print_button"
                className="flex items-center justify-center gap-2 bg-muted text-foreground font-body font-semibold rounded-xl py-3 hover:bg-muted/80 transition-colors border border-border"
              >
                <BarChart3 className="w-4 h-4" /> {t("print", lang)}
              </button>
            </div>
            <div className="text-center bg-muted/50 rounded-lg p-3">
              <p className="text-2xl font-display font-bold text-primary">
                {hotelUses}
              </p>
              <p className="text-xs text-muted-foreground font-body mt-1">
                {hotelUses} {t("scannedTimes", lang)}
              </p>
            </div>
          </>
        ) : (
          <div
            data-ocid="champion.qr_code.empty_state"
            className="text-center py-12 text-muted-foreground"
          >
            <QrCode className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-body text-sm">
              QR code pending generation by staff
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pay It Forward Page ──────────────────────────────────────────────────────
function PayItForwardPage({
  champion,
  codes,
  allChampions,
  lang,
}: {
  champion: User;
  codes: ChampionCode[];
  allChampions: User[];
  lang: Lang;
}) {
  const referralCode =
    codes[0]?.referralCode ?? champion.personalReferralCode ?? "";
  const shareUrl = `${window.location.origin}/become-a-champion?ref=${referralCode}`;
  const totalEarned = Number(champion.targetMonthlyIncomeKhr);
  const goal = 600_000;
  const pct = Math.min(100, Math.round((totalEarned / goal) * 100));

  const referredChampions = allChampions.filter(
    (u) => u.referredById?.toString() === champion.id.toString(),
  );

  function copyShareUrl() {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => toast.success(t("copied", lang)));
  }

  function shareLink() {
    if (navigator.share) {
      navigator
        .share({ title: "Join Kampot Heritage", url: shareUrl })
        .catch(() => {});
    } else {
      copyShareUrl();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Hero message */}
      <div
        data-ocid="champion.payforward.hero"
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 p-6 md:p-8"
      >
        {champion.hasPaidForward && (
          <div className="absolute top-4 right-4">
            <span
              data-ocid="champion.payforward.mentor_badge"
              className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-700 border border-amber-400/40 rounded-full px-3 py-1 text-sm font-body font-semibold"
            >
              <Award className="w-4 h-4" /> {t("mentorBadge", lang)}
            </span>
          </div>
        )}
        <Heart className="w-8 h-8 text-accent mb-3" />
        <p className="text-lg md:text-xl font-display font-semibold text-foreground leading-relaxed max-w-2xl">
          {t("payForwardHero", lang)}
        </p>
      </div>

      {/* Milestone progress */}
      <div
        data-ocid="champion.payforward.milestone"
        className="bg-card rounded-2xl border border-border p-6 shadow-sm"
      >
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-body text-muted-foreground">
            {t("youveEarned", lang)}
          </span>
          <span className="font-body text-sm text-muted-foreground">
            {pct}% of goal
          </span>
        </div>
        <p className="text-3xl font-display font-bold text-primary mb-1">
          {formatKhr(totalEarned)}
        </p>
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div
            className="bg-primary rounded-full h-3 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-body">
          {t("financialIndependence", lang)}
        </p>
      </div>

      {/* Refer CTA */}
      <div
        data-ocid="champion.payforward.referral_section"
        className="bg-card rounded-2xl border border-border p-6 shadow-sm"
      >
        <h2 className="font-display font-semibold text-foreground text-lg mb-1">
          {t("shareableLink", lang)}
        </h2>
        <p className="text-sm text-muted-foreground font-body mb-4 break-all">
          {shareUrl}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={copyShareUrl}
            data-ocid="champion.payforward.copy_link_button"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold rounded-xl py-3 hover:bg-primary/90 transition-colors"
          >
            <Copy className="w-4 h-4" /> {t("copyLink", lang)}
          </button>
          <button
            type="button"
            onClick={shareLink}
            data-ocid="champion.payforward.share_button"
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground font-body font-semibold rounded-xl py-3 hover:bg-accent/90 transition-colors"
          >
            <Share2 className="w-4 h-4" /> {t("referNewChampion", lang)}
          </button>
        </div>
      </div>

      {/* Referred Champions */}
      <div data-ocid="champion.payforward.referred_list">
        <h3 className="font-display font-semibold text-foreground mb-3">
          {t("championsReferred", lang)}
        </h3>
        {referredChampions.length === 0 ? (
          <div
            data-ocid="champion.payforward.empty_state"
            className="bg-muted/30 rounded-xl border border-dashed border-border p-8 text-center"
          >
            <Users className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-body text-sm">
              {t("noReferrals", lang)}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {referredChampions.map((ch, i) => {
              const chName =
                (lang === "km"
                  ? ch.fullNameKm
                  : lang === "fr"
                    ? ch.fullNameFr
                    : null) ?? ch.fullNameEn;
              return (
                <div
                  key={ch.id.toString()}
                  data-ocid={`champion.payforward.referred_item.${i + 1}`}
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
                >
                  {ch.avatarUrl ? (
                    <img
                      src={ch.avatarUrl}
                      alt={chName}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-foreground truncate">
                      {chName}
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      {ch.approvedAt
                        ? new Date(
                            Number(ch.approvedAt) / 1_000_000,
                          ).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                  <span
                    data-ocid={`champion.payforward.approved_badge.${i + 1}`}
                    className="inline-flex items-center gap-1 bg-accent/15 text-accent rounded-full px-3 py-1 text-xs font-body font-semibold"
                  >
                    <CheckCircle className="w-3 h-3" />{" "}
                    {t("approvedBadge", lang)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Portal Nav ───────────────────────────────────────────────────────────────
const navItems = [
  {
    to: "/champion/dashboard",
    label: "dashboard",
    icon: BarChart3,
    exact: true,
  },
  { to: "/champion/codes", label: "myCodes", icon: QrCode, exact: false },
  {
    to: "/champion/pay-forward",
    label: "payForward",
    icon: Heart,
    exact: false,
  },
];

function PortalNav({ lang, isMobile }: { lang: Lang; isMobile: boolean }) {
  const cls = isMobile
    ? "flex border-t border-border bg-card fixed bottom-0 left-0 right-0 z-40"
    : "flex flex-col gap-1";
  return (
    <nav className={cls} aria-label="Champion portal navigation">
      {navItems.map(({ to, label, icon: Icon, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          data-ocid={`champion.nav.${label}`}
          className={({ isActive }) =>
            isMobile
              ? `flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-xs font-body transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              : `flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
          }
        >
          <Icon className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
          <span>{t(label, lang)}</span>
        </NavLink>
      ))}
    </nav>
  );
}

// ── Loading / Error States ───────────────────────────────────────────────────
function LoadingPortal({ lang }: { lang: Lang }) {
  return (
    <div
      data-ocid="champion.loading_state"
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-muted-foreground font-body text-sm">
          {t("loading", lang)}
        </p>
      </div>
    </div>
  );
}

// ── Resolve current champion: first approved champion from list ──────────────
// ── Resolve current champion from session (set at login) or fallback ────────
function useCurrentChampionId(): bigint | null {
  const stored = sessionStorage.getItem("champion_id");
  if (stored) {
    const parsed = BigInt(stored);
    if (parsed > BigInt(0)) return parsed;
  }
  return null;
}

// ── Root Portal Component ────────────────────────────────────────────────────
export default function ChampionPortal() {
  const navigate = useNavigate();
  const [lang, _setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("kampot_lang") as Lang | null;
    return stored ?? "en";
  });

  useEffect(() => {
    localStorage.setItem("kampot_lang", lang);
  }, [lang]);

  const championId = useCurrentChampionId();
  const { champion, codes, orders, allChampions } = useChampionData(
    championId ?? BigInt(0),
  );

  const isLoading = champion.isLoading || codes.isLoading || orders.isLoading;

  if (!championId) {
    // Not logged in — redirect to champion login
    return <Navigate to="/champion-login" replace />;
  }

  if (isLoading) {
    return <LoadingPortal lang={lang} />;
  }

  const ch = champion.data;
  if (!ch) {
    return (
      <div
        data-ocid="champion.error_state"
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <p className="text-muted-foreground font-body">Champion not found.</p>
      </div>
    );
  }

  const codesData = codes.data ?? [];
  const ordersData = orders.data ?? [];
  const allChampionsData = allChampions.data ?? [];

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="champion.portal"
    >
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-semibold text-foreground">
              {t("championPortal", lang)}
            </span>
          </div>
          {/* Language switcher + exit */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Back to home"
              data-ocid="champion.portal.close_button"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Layout: sidebar (desktop) + content */}
      <div className="flex flex-1 max-w-5xl mx-auto w-full px-4 py-6 gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-48 shrink-0">
          <PortalNav lang={lang} isMobile={false} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          <Routes>
            {/* /champion → redirect to /champion/dashboard */}
            <Route
              index
              element={<Navigate to="/champion/dashboard" replace />}
            />
            <Route
              path="dashboard"
              element={
                <ChampionDashboard
                  champion={ch}
                  codes={codesData}
                  orders={ordersData}
                  lang={lang}
                />
              }
            />
            <Route
              path="codes"
              element={
                <MyCodesPage champion={ch} codes={codesData} lang={lang} />
              }
            />
            <Route
              path="pay-forward"
              element={
                <PayItForwardPage
                  champion={ch}
                  codes={codesData}
                  allChampions={allChampionsData}
                  lang={lang}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to="/champion/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <PortalNav lang={lang} isMobile />
      </div>
      <FloatingContactButtons />
    </div>
  );
}

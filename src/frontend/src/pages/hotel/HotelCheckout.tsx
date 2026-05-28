import { createActor } from "@/backend";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { makeApi } from "@/lib/api";
import type { LanguageCode } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { User } from "@/types";
import type { ChampionSelectionMethod } from "@/types";
import { bigintToNumber } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle, CreditCard, QrCode, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "./HotelStorefront";

interface Props {
  champion: User;
  cartItems: CartItem[];
  selectionMethod: ChampionSelectionMethod;
  onOrderComplete: () => void;
}

type Step = "info" | "payment" | "success";

type BusinessType =
  | "Hotel"
  | "Restaurant"
  | "Resort"
  | "Cafe"
  | "Retailer"
  | "Individual";

interface CustomerInfo {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  businessType: BusinessType;
}

function getChampionName(c: User, lang: LanguageCode): string {
  if (lang === "km" && c.fullNameKm) return c.fullNameKm;
  if (lang === "fr" && c.fullNameFr) return c.fullNameFr;
  return c.fullNameEn;
}

function getProductName(p: CartItem["product"], lang: LanguageCode): string {
  if (lang === "km") return p.nameKm;
  if (lang === "fr") return p.nameFr;
  return p.nameEn;
}

function generateTxRef(): string {
  const ts = Date.now();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KHMP-${ts}-${rand}`;
}

const businessTypes: BusinessType[] = [
  "Hotel",
  "Restaurant",
  "Resort",
  "Cafe",
  "Retailer",
  "Individual",
];

const ui = {
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
    abaInstructions:
      "Open ABA Mobile app → Scan QR code → Confirm payment → Return here and click Confirm Payment.",
    confirmPayment: "Confirm Payment Received",
    processing: "Processing…",
    successTitle: "Order Confirmed! 🎉",
    successMessage: (name: string, ref: string) =>
      `Thank you for supporting ${name}! Your order ${ref} has been placed and payment confirmed.`,
    thankYou: (name: string) => `Thank you for supporting ${name}`,
    anotherOrder: "Place another order",
    viewHistory: "View order history",
    error: "Order failed. Please try again.",
    required: "This field is required",
    orderNumber: "Order Reference",
    totalPaid: "Total Paid",
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
    abaInstructions:
      "បើក ABA Mobile → ស្កែនកូដ QR → បញ្ជាក់ការទូទាត់ → ត្រឡប់មកចុច បញ្ជាក់ការទូទាត់។",
    confirmPayment: "បញ្ជាក់ការទូទាត់",
    processing: "កំពុងដំណើរការ...",
    successTitle: "ការបញ្ជាទិញបានបញ្ជាក់! 🎉",
    successMessage: (name: string, ref: string) =>
      `អរគុណដែលបានគាំទ្រ ${name}! ការបញ្ជាទិញ ${ref} ត្រូវបានដាក់ហើយ។`,
    thankYou: (name: string) => `អរគុណដែលបានគាំទ្រ ${name}`,
    anotherOrder: "ដាក់ការបញ្ជាទិញម្ដងទៀត",
    viewHistory: "មើលប្រវត្តិការបញ្ជាទិញ",
    error: "ការបញ្ជាទិញបរាជ័យ។ សូមព្យាយាមម្ដងទៀត។",
    required: "វិញ្ញាសានេះត្រូវការ",
    orderNumber: "លេខការបញ្ជាទិញ",
    totalPaid: "ចំនួនទូទាត់សរុប",
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
    abaInstructions:
      "Ouvrez ABA Mobile → Scannez le QR code → Confirmez le paiement → Revenez ici et cliquez sur Confirmer le paiement.",
    confirmPayment: "Confirmer le paiement reçu",
    processing: "Traitement…",
    successTitle: "Commande confirmée ! 🎉",
    successMessage: (name: string, ref: string) =>
      `Merci de soutenir ${name} ! Votre commande ${ref} a été passée et le paiement confirmé.`,
    thankYou: (name: string) => `Merci de soutenir ${name}`,
    anotherOrder: "Passer une autre commande",
    viewHistory: "Voir l'historique",
    error: "La commande a échoué. Veuillez réessayer.",
    required: "Ce champ est requis",
    orderNumber: "Référence de commande",
    totalPaid: "Total payé",
  },
};

// ── Step indicator ────────────────────────────────────────────────────────────
function StepIndicator({
  current,
  labels,
}: {
  current: Step;
  labels: { step1: string; step2: string; step3: string };
}) {
  const steps: { id: Step; label: string }[] = [
    { id: "info", label: labels.step1 },
    { id: "payment", label: labels.step2 },
    { id: "success", label: labels.step3 },
  ];
  const order: Step[] = ["info", "payment", "success"];
  const currentIdx = order.indexOf(current);
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                i < currentIdx
                  ? "bg-primary border-primary text-primary-foreground"
                  : i === currentIdx
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {i < currentIdx ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium ${
                i <= currentIdx ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
                i < currentIdx ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Champion banner ───────────────────────────────────────────────────────────
function ChampionBanner({
  champion,
  lang,
  label,
  supportsLabel,
}: {
  champion: User;
  lang: LanguageCode;
  label: string;
  supportsLabel: string;
}) {
  const name = getChampionName(champion, lang);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
      {champion.avatarUrl ? (
        <img
          src={champion.avatarUrl}
          alt={name}
          loading="lazy"
          className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-primary/30"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-primary/20 text-primary font-bold text-xl flex items-center justify-center flex-shrink-0">
          {initials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground text-base">{name}</p>
        <p className="text-xs text-primary font-medium mt-0.5">
          {supportsLabel} {name}
        </p>
      </div>
    </div>
  );
}

// ── ABA QR Code visual ────────────────────────────────────────────────────────
function AbaQrPlaceholder({ amountKhr }: { amountKhr: number }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 px-4 rounded-xl border-2 border-[#2e7d32]/30 bg-[#2e7d32]/5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-[#2e7d32] flex items-center justify-center">
          <span className="text-white font-bold text-xs">ABA</span>
        </div>
        <span className="font-bold text-[#2e7d32] text-sm">ABA PayWay</span>
      </div>
      <div className="w-40 h-40 bg-card border-2 border-[#2e7d32]/40 rounded-xl flex flex-col items-center justify-center gap-2">
        <QrCode className="w-16 h-16 text-[#2e7d32]/60" />
        <p className="text-[10px] text-muted-foreground text-center font-mono">
          Merchant: MERCHANT_ID_HERE
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-[#2e7d32]">
          {amountKhr.toLocaleString("en-US")} ៛
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          API Key: ABA_API_KEY_HERE
        </p>
      </div>
    </div>
  );
}

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

function biweeklyEndDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().split("T")[0];
}

export default function HotelCheckout({
  champion,
  cartItems,
  selectionMethod,
  onOrderComplete,
}: Props) {
  const { lang } = useLanguage();
  const l = ui[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<bigint | null>(null);
  const [txRef] = useState(() => generateTxRef());

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    businessType: "Hotel",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CustomerInfo, string>>
  >({});

  const totalKhr = cartItems.reduce(
    (sum, item) =>
      sum + bigintToNumber(item.product.wholesalePriceKhr) * item.quantity,
    0,
  );
  const totalUsd = cartItems.reduce(
    (sum, item) => sum + item.product.wholesalePriceUsd * item.quantity,
    0,
  );

  const champName = getChampionName(champion, lang);
  const hotelIdStr = localStorage.getItem("hotel_user_id");
  const isIndividual = customerInfo.businessType === "Individual";

  function validateInfo(): boolean {
    const errs: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!customerInfo.fullName.trim()) errs.fullName = l.required;
    if (!isIndividual && !customerInfo.businessName.trim())
      errs.businessName = l.required;
    if (!customerInfo.phone.trim()) errs.phone = l.required;
    if (!customerInfo.deliveryAddress.trim()) errs.deliveryAddress = l.required;
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleInfoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateInfo()) setStep("payment");
  }

  function updateField(field: keyof CustomerInfo, value: string) {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleConfirmPayment() {
    if (!actor || isFetching) return;
    setLoading(true);
    setError(null);
    try {
      const api = makeApi(actor);
      // Use saved hotel ID if available, else use champion's hotel ID or a system placeholder
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
          championCommissionUsd: item.product.championCommissionUsd,
        })),
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

  // ── Success screen ─────────────────────────────────────────────────────────
  if (step === "success" && confirmedOrderId !== null) {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-12 text-center"
        data-ocid="hotel.checkout.success_state"
      >
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {l.successTitle}
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          {l.successMessage(champName, txRef)}
        </p>

        <Card className="border-border text-left mb-6">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              {champion.avatarUrl ? (
                <img
                  src={champion.avatarUrl}
                  alt={champName}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                  {champName
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">{l.champion}</p>
                <p className="font-semibold text-foreground">{champName}</p>
                <p className="text-xs text-primary">{l.thankYou(champName)}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{l.orderNumber}</span>
                <span className="font-mono text-xs font-medium text-foreground">
                  {txRef}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">
                  {l.totalPaid}
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold text-foreground">
                    {totalKhr.toLocaleString("en-US")} ៛
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    (${totalUsd.toFixed(2)})
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/hotel/select-champion")}
            data-ocid="hotel.checkout.another_order_button"
          >
            {l.anotherOrder}
          </Button>
          <Button
            type="button"
            asChild
            data-ocid="hotel.checkout.view_history_link"
          >
            <Link to="/hotel">{l.viewHistory}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Close button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        data-ocid="hotel.checkout.close_button"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">
        {l.title}
      </h1>

      <StepIndicator
        current={step}
        labels={{ step1: l.step1, step2: l.step2, step3: l.step3 }}
      />

      {/* Champion banner */}
      <ChampionBanner
        champion={champion}
        lang={lang}
        label={l.champion}
        supportsLabel={l.supports}
      />

      {/* Order summary — always visible */}
      <Card
        className="border-border mb-6"
        data-ocid="hotel.checkout.order_summary"
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            {l.orderSummary}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.product.id.toString()}
              className="flex justify-between items-baseline text-sm"
            >
              <span className="text-foreground">
                {getProductName(item.product, lang)} ×{item.quantity}
              </span>
              <CurrencyDisplay
                khr={
                  bigintToNumber(item.product.wholesalePriceKhr) * item.quantity
                }
                usd={item.product.wholesalePriceUsd * item.quantity}
                size="sm"
              />
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-baseline">
            <span className="font-semibold text-foreground text-sm">
              {l.total}
            </span>
            <div className="text-right">
              <span className="text-xl font-bold text-foreground">
                {totalKhr.toLocaleString("en-US")} ៛
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                (${totalUsd.toFixed(2)})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Step 1: Customer info form ── */}
      {step === "info" && (
        <Card className="border-border" data-ocid="hotel.checkout.info_form">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                1
              </span>
              {l.step1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInfoSubmit} noValidate className="space-y-4">
              {/* Business Type */}
              <div className="space-y-1.5">
                <Label htmlFor="businessType">{l.businessType}</Label>
                <select
                  id="businessType"
                  value={customerInfo.businessType}
                  onChange={(e) =>
                    updateField("businessType", e.target.value as BusinessType)
                  }
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid="hotel.checkout.business_type_select"
                >
                  {businessTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName">
                  {l.fullName} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={customerInfo.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder={l.fullNamePlaceholder}
                  aria-required="true"
                  data-ocid="hotel.checkout.full_name_input"
                />
                {formErrors.fullName && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="hotel.checkout.full_name_field_error"
                  >
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Business Name */}
              <div className="space-y-1.5">
                <Label htmlFor="businessName">
                  {isIndividual ? l.businessNameOptional : l.businessName}
                  {!isIndividual && (
                    <span className="text-destructive"> *</span>
                  )}
                </Label>
                <Input
                  id="businessName"
                  value={customerInfo.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  placeholder={l.businessNamePlaceholder}
                  data-ocid="hotel.checkout.business_name_input"
                />
                {formErrors.businessName && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="hotel.checkout.business_name_field_error"
                  >
                    {formErrors.businessName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  {l.phone} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={l.phonePlaceholder}
                  aria-required="true"
                  data-ocid="hotel.checkout.phone_input"
                />
                {formErrors.phone && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="hotel.checkout.phone_field_error"
                  >
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">{l.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={l.emailPlaceholder}
                  data-ocid="hotel.checkout.email_input"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <Label htmlFor="deliveryAddress">
                  {l.deliveryAddress}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="deliveryAddress"
                  value={customerInfo.deliveryAddress}
                  onChange={(e) =>
                    updateField("deliveryAddress", e.target.value)
                  }
                  placeholder={l.deliveryPlaceholder}
                  aria-required="true"
                  data-ocid="hotel.checkout.delivery_address_input"
                />
                {formErrors.deliveryAddress && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="hotel.checkout.delivery_address_field_error"
                  >
                    {formErrors.deliveryAddress}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                data-ocid="hotel.checkout.continue_button"
              >
                {l.continueTo}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ── Step 2: ABA PayWay payment ── */}
      {step === "payment" && (
        <Card
          className="border-border"
          data-ocid="hotel.checkout.payment_section"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                2
              </span>
              {l.paymentTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Transaction reference */}
            <div className="flex items-center justify-between rounded-lg bg-muted/40 border border-border px-4 py-2.5">
              <div>
                <p className="text-xs text-muted-foreground">{l.txRef}</p>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {txRef}
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                KHR: {totalKhr.toLocaleString("en-US")}
              </span>
            </div>

            {/* ABA QR placeholder */}
            <AbaQrPlaceholder amountKhr={totalKhr} />

            {/* Instructions */}
            <div className="rounded-lg bg-[#2e7d32]/5 border border-[#2e7d32]/20 p-4">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold text-[#2e7d32]">📱 </span>
                {l.abaInstructions}
              </p>
            </div>

            {/* Amount reminder */}
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">
                {totalKhr.toLocaleString("en-US")} ៛
              </p>
              <p className="text-sm text-muted-foreground">
                (${totalUsd.toFixed(2)} USD)
              </p>
            </div>

            {/* Pay with ABA button */}
            <button
              type="button"
              className="w-full py-3 rounded-xl font-bold text-base text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 bg-[#2e7d32]"
              data-ocid="hotel.checkout.aba_pay_button"
            >
              <CreditCard className="w-5 h-5" />
              Pay with ABA PayWay
            </button>

            <Separator />

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2"
                data-ocid="hotel.checkout.error_state"
              >
                {error}
              </p>
            )}

            {/* Confirm button */}
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={handleConfirmPayment}
              disabled={loading || cartItems.length === 0}
              data-ocid="hotel.checkout.confirm_button"
            >
              {loading ? l.processing : l.confirmPayment}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={() => setStep("info")}
              data-ocid="hotel.checkout.back_to_info_button"
            >
              ← {l.step1}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { createActor } from "@/backend";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { makeApi } from "@/lib/api";
import type { LanguageCode } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { Product, User } from "@/types";
import type { ChampionSelectionMethod } from "@/types";
import { bigintToNumber } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

// CartItem is declared in HotelStorefront to match the local product shape
export interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  champion: User;
  selectionMethod: ChampionSelectionMethod;
  onProceedToCheckout: (items: CartItem[]) => void;
}

function getProductName(p: Product, lang: LanguageCode): string {
  if (lang === "km") return p.nameKm;
  if (lang === "fr") return p.nameFr;
  return p.nameEn;
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

const ui = {
  en: {
    banner: (name: string) =>
      `Every order supports ${name}, your local Kampot Heritage Champion`,
    earns: "Champion earns",
    cartTitle: "Your Order",
    proceedBtn: "Proceed to Checkout",
    emptyCart: "Add products to your order",
    total: "Total",
    unit: "unit",
    loadingProducts: "Loading products...",
  },
  km: {
    banner: (name: string) => `រាល់ការបញ្ជាទិញគាំទ្រ ${name} អ្នកជើងឯកនៅក្នុងតំបន់`,
    earns: "អ្នកជើងឯករកបាន",
    cartTitle: "ការបញ្ជាទិញរបស់អ្នក",
    proceedBtn: "ទៅការទូទាត់",
    emptyCart: "បន្ថែមផលិតផលទៅការបញ្ជាទិញ",
    total: "សរុប",
    unit: "ឯកតា",
    loadingProducts: "កំពុងផ្ទុក...",
  },
  fr: {
    banner: (name: string) =>
      `Chaque commande soutient ${name}, votre champion Kampot Heritage local`,
    earns: "Le champion gagne",
    cartTitle: "Votre commande",
    proceedBtn: "Passer à la caisse",
    emptyCart: "Ajoutez des produits à votre commande",
    total: "Total",
    unit: "unité",
    loadingProducts: "Chargement...",
  },
};

export default function HotelStorefront({
  champion,
  selectionMethod: _sm,
  onProceedToCheckout,
}: Props) {
  const { lang } = useLanguage();
  const l = ui[lang];
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const globalCart = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [quantities, setQuantities] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoadingProducts(true);
    makeApi(actor)
      .getActiveProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoadingProducts(false));
  }, [actor, isFetching]);

  function updateQty(product: Product, delta: number) {
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

      // Mirror to global CartContext for badge sync
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
          commissionKhr: bigintToNumber(product.championCommissionKhr),
        });
      } else {
        globalCart.updateQuantity(key, newQty);
      }

      return next;
    });
  }

  function handleAddToCart(product: Product) {
    const key = product.id.toString();
    const currentQty = quantities.get(key) ?? 0;
    if (currentQty === 0) {
      updateQty(product, 1);
    }
  }

  const cartItems: CartItem[] = products
    .filter((p) => (quantities.get(p.id.toString()) ?? 0) > 0)
    .map((p) => ({
      product: p,
      quantity: quantities.get(p.id.toString()) ?? 0,
    }));

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Close button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        data-ocid="hotel.storefront.close_button"
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Champion Banner */}
      <div className="rounded-xl bg-primary/10 border border-primary/20 px-6 py-4 mb-8 flex items-start gap-4">
        {champion.avatarUrl ? (
          <img
            src={champion.avatarUrl}
            alt={champName}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-primary/30"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center flex-shrink-0">
            {champion.fullNameEn
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">{champName}</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {l.banner(champName)}
          </p>
          {getChampionBio(champion, lang) && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              "{getChampionBio(champion, lang).slice(0, 120)}"
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products */}
        <div className="lg:col-span-2 space-y-4">
          {loadingProducts && (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          )}
          {products.map((product, idx) => {
            const qty = quantities.get(product.id.toString()) ?? 0;
            return (
              <Card
                key={product.id.toString()}
                className="border-border hover:border-primary/40 transition-colors"
                data-ocid={`hotel.storefront.product.item.${idx + 1}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {getProductName(product, lang)}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {product.unitSize}
                          {product.unitMeasurement}
                        </Badge>
                      </div>
                      <div className="mt-1">
                        <CurrencyDisplay
                          khr={bigintToNumber(product.wholesalePriceKhr)}
                          usd={product.wholesalePriceUsd}
                          size="md"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        🏆 {l.earns}:{" "}
                        <span className="text-primary font-medium">
                          {bigintToNumber(
                            product.championCommissionKhr,
                          ).toLocaleString("en-US")}{" "}
                          ៛
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* Quantity selector + Add to Cart */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-7 h-7 p-0 rounded-md"
                        onClick={() => updateQty(product, -1)}
                        disabled={qty === 0}
                        aria-label="Decrease quantity"
                        data-ocid={`hotel.storefront.product.decrement.${idx + 1}`}
                      >
                        −
                      </Button>
                      <span
                        className="w-8 text-center font-semibold text-foreground text-base"
                        data-ocid={`hotel.storefront.product.qty.${idx + 1}`}
                      >
                        {qty}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-7 h-7 p-0 rounded-md"
                        onClick={() => updateQty(product, 1)}
                        aria-label="Increase quantity"
                        data-ocid={`hotel.storefront.product.increment.${idx + 1}`}
                      >
                        +
                      </Button>
                    </div>
                    {qty === 0 ? (
                      <Button
                        type="button"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAddToCart(product)}
                        data-ocid={`hotel.storefront.product.add_button.${idx + 1}`}
                      >
                        +{" "}
                        {l.unit === "unit"
                          ? "Add to Cart"
                          : lang === "km"
                            ? "បន្ថែមទៅកន្ត្រក"
                            : "Ajouter au panier"}
                      </Button>
                    ) : (
                      <span className="flex-1 text-sm text-primary font-medium">
                        ✓{" "}
                        {lang === "en"
                          ? "In cart"
                          : lang === "km"
                            ? "នៅក្នុងកន្ត្រក"
                            : "Dans le panier"}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <Card
            className="border-border sticky top-20"
            data-ocid="hotel.storefront.cart"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center justify-between">
                {l.cartTitle}
                {cartItems.length > 0 && (
                  <Badge variant="default" className="ml-2">
                    {cartItems.reduce((s, i) => s + i.quantity, 0)}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {l.emptyCart}
                </p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id.toString()}
                      className="flex justify-between items-baseline text-sm gap-2"
                    >
                      <span className="text-foreground truncate flex-1">
                        {getProductName(item.product, lang)} ×{item.quantity}
                      </span>
                      <CurrencyDisplay
                        khr={
                          bigintToNumber(item.product.wholesalePriceKhr) *
                          item.quantity
                        }
                        usd={item.product.wholesalePriceUsd * item.quantity}
                        size="sm"
                      />
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-foreground">
                      {l.total}
                    </span>
                    <CurrencyDisplay khr={totalKhr} usd={totalUsd} size="md" />
                  </div>
                  <Button
                    type="button"
                    className="w-full mt-2"
                    onClick={() => {
                      onProceedToCheckout(cartItems);
                      navigate("/hotel/checkout");
                    }}
                    data-ocid="hotel.storefront.checkout_button"
                  >
                    {l.proceedBtn}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

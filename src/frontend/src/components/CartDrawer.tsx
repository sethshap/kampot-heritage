import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/lib/i18n";
import { formatKhr, formatUsd } from "@/types";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ui = {
  en: {
    title: "Your Cart",
    empty: "Your cart is empty",
    emptyHint: "Add products to get started",
    subtotal: "Subtotal",
    total: "Total",
    checkout: "Proceed to Checkout",
    continueShopping: "Continue Shopping",
    remove: "Remove item",
  },
  km: {
    title: "កន្ត្រកទំនិញ",
    empty: "កន្ត្រករបស់អ្នកទទេ",
    emptyHint: "បន្ថែមផលិតផលដើម្បីចាប់ផ្ដើម",
    subtotal: "សរុបរង",
    total: "សរុប",
    checkout: "ទៅការទូទាត់",
    continueShopping: "បន្តការទិញ",
    remove: "លុបចោល",
  },
  fr: {
    title: "Votre panier",
    empty: "Votre panier est vide",
    emptyHint: "Ajoutez des produits pour commencer",
    subtotal: "Sous-total",
    total: "Total",
    checkout: "Passer à la caisse",
    continueShopping: "Continuer les achats",
    remove: "Supprimer",
  },
};

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalKhr, totalUsd, itemCount } =
    useCart();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const l = ui[lang];

  const getItemName = (item: (typeof items)[0]) => {
    if (lang === "km") return item.nameKm;
    if (lang === "fr") return item.nameFr;
    return item.nameEn;
  };

  function handleCheckout() {
    onClose();
    navigate("/hotel/order");
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-hidden="true"
        data-ocid="cart.backdrop"
      />

      {/* Drawer panel */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border z-50 flex flex-col shadow-2xl"
        // biome-ignore lint/a11y/useSemanticElements: custom drawer uses div for layout flex; dialog element cannot be a flex container reliably
        role="dialog"
        aria-modal="true"
        aria-label={l.title}
        data-ocid="cart.drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">
              {l.title}
            </h2>
            {itemCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 rounded-full"
            onClick={onClose}
            aria-label="Close cart"
            data-ocid="cart.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Items list */}
        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center"
            data-ocid="cart.empty_state"
          >
            <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
            <p className="font-display text-base font-semibold text-foreground">
              {l.empty}
            </p>
            <p className="text-sm text-muted-foreground">{l.emptyHint}</p>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mt-2"
              data-ocid="cart.continue_shopping_button"
            >
              {l.continueShopping}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {items.map((item, i) => (
                  <div
                    key={item.productId}
                    className="bg-background rounded-xl p-4 border border-border"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="font-semibold text-foreground text-sm leading-snug flex-1 min-w-0">
                        {getItemName(item)}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-6 h-6 p-0 rounded-full text-muted-foreground hover:text-destructive flex-shrink-0"
                        onClick={() => removeItem(item.productId)}
                        aria-label={l.remove}
                        data-ocid={`cart.remove_button.${i + 1}`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-2"
                        data-ocid={`cart.quantity_controls.${i + 1}`}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-7 h-7 p-0 rounded-full"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          data-ocid={`cart.decrement.${i + 1}`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-mono text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-7 h-7 p-0 rounded-full"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          data-ocid={`cart.increment.${i + 1}`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="font-bold text-foreground text-sm">
                          {formatKhr(item.unitPriceKhr * item.quantity)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatUsd(item.unitPriceUsd * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer with total + actions */}
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
                  {l.total}
                </span>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-foreground">
                    {formatKhr(totalKhr)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatUsd(totalUsd)}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="w-full font-semibold"
                  onClick={handleCheckout}
                  data-ocid="cart.checkout_button"
                >
                  {l.checkout}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                  data-ocid="cart.continue_shopping_button"
                >
                  {l.continueShopping}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

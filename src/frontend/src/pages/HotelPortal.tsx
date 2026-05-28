import { createActor } from "@/backend";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useCart } from "@/context/CartContext";
import { makeApi } from "@/lib/api";
import type { User } from "@/types";
import { ChampionSelectionMethod } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ChampionSelection from "./hotel/ChampionSelection";
import HotelCheckout from "./hotel/HotelCheckout";
import HotelDashboard from "./hotel/HotelDashboard";
import HotelRegistration from "./hotel/HotelRegistration";
import HotelStorefront from "./hotel/HotelStorefront";
import type { CartItem } from "./hotel/HotelStorefront";

/** Key used to persist the selected champion ID across page reloads */
const CHAMPION_KEY = "hotel_selected_champion_id";

export default function HotelPortal() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);

  const [selectedChampion, setSelectedChampion] = useState<User | null>(null);
  const [selectionMethod, setSelectionMethod] =
    useState<ChampionSelectionMethod>(ChampionSelectionMethod.browsed_list);
  const { clearCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [championLoading, setChampionLoading] = useState(true);
  const didRestoreRef = useRef(false);

  // ── Restore saved champion from localStorage + backend on mount ──────────────
  useEffect(() => {
    if (!actor || isFetching || didRestoreRef.current) return;
    didRestoreRef.current = true;

    const savedId = localStorage.getItem(CHAMPION_KEY);
    if (!savedId) {
      setChampionLoading(false);
      return;
    }

    makeApi(actor)
      .getUserById(BigInt(savedId))
      .then((user) => {
        if (user && user.onboardingStatus === "approved") {
          setSelectedChampion(user);
          setSelectionMethod(ChampionSelectionMethod.remembered);
        } else {
          // Saved champion no longer valid — clear it
          localStorage.removeItem(CHAMPION_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(CHAMPION_KEY);
      })
      .finally(() => setChampionLoading(false));
  }, [actor, isFetching]);

  function handleChampionSelected(
    champion: User,
    method: ChampionSelectionMethod,
  ) {
    setSelectedChampion(champion);
    setSelectionMethod(method);
    // Persist champion ID so it survives page reloads
    localStorage.setItem(CHAMPION_KEY, champion.id.toString());
    navigate("/hotel/order");
  }

  function handleProceedToCheckout(items: CartItem[]) {
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

  // Gate that shows ChampionSelection if no champion is saved yet
  function ChampionGate({ children }: { children: React.ReactNode }) {
    if (championLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground animate-pulse">Loading…</div>
        </div>
      );
    }
    if (!selectedChampion) {
      return <ChampionSelection onChampionSelected={handleChampionSelected} />;
    }
    return <>{children}</>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          championLoading ? null : selectedChampion ? (
            <HotelDashboard
              currentChampion={selectedChampion}
              onChangeChampion={handleChangeChampion}
            />
          ) : (
            <ChampionSelection onChampionSelected={handleChampionSelected} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          championLoading ? null : selectedChampion ? (
            <HotelDashboard
              currentChampion={selectedChampion}
              onChangeChampion={handleChangeChampion}
            />
          ) : (
            <ChampionSelection onChampionSelected={handleChampionSelected} />
          )
        }
      />
      <Route path="/register" element={<HotelRegistration />} />
      <Route
        path="/select-champion"
        element={
          <ChampionSelection onChampionSelected={handleChampionSelected} />
        }
      />
      <Route
        path="/order"
        element={
          <ChampionGate>
            <HotelStorefront
              champion={selectedChampion!}
              selectionMethod={selectionMethod}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </ChampionGate>
        }
      />
      <Route
        path="/checkout"
        element={
          selectedChampion && cartItems.length > 0 ? (
            <HotelCheckout
              champion={selectedChampion}
              cartItems={cartItems}
              selectionMethod={selectionMethod}
              onOrderComplete={handleOrderComplete}
            />
          ) : selectedChampion ? (
            <HotelStorefront
              champion={selectedChampion}
              selectionMethod={selectionMethod}
              onProceedToCheckout={handleProceedToCheckout}
            />
          ) : (
            <ChampionSelection onChampionSelected={handleChampionSelected} />
          )
        }
      />
    </Routes>
  );
}

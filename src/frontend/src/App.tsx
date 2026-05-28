import { InstallPromptBanner } from "@/components/InstallPromptBanner";
import { Layout } from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ChampionOnboardingPage = lazy(
  () => import("@/pages/ChampionOnboardingPage"),
);
const StaffPortal = lazy(() => import("@/pages/StaffPortal"));
const ChampionProfile = lazy(() => import("@/pages/ChampionProfile"));
const ChampionPortal = lazy(() => import("@/pages/ChampionPortal"));
const ChampionLogin = lazy(() => import("@/pages/ChampionLogin"));
const HotelPortal = lazy(() => import("@/pages/HotelPortal"));

function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-muted-foreground text-sm font-body">Loading…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <InstallPromptBanner />
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            {/* Public routes with Layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/become-a-champion"
              element={
                <Layout>
                  <ChampionOnboardingPage />
                </Layout>
              }
            />
            {/* Champion login page (public) */}
            <Route path="/champion-login" element={<ChampionLogin />} />
            {/* Public champion profile page */}
            <Route path="/champion/:id" element={<ChampionProfile />} />
            {/* Portal routes — each portal manages its own layout/nav */}
            <Route path="/staff/*" element={<StaffPortal />} />
            <Route path="/champion/*" element={<ChampionPortal />} />
            <Route path="/hotel/*" element={<HotelPortal />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </BrowserRouter>
    </CartProvider>
  );
}

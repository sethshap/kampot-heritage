import { CartDrawer } from "@/components/CartDrawer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { HowToInstall } from "@/components/HowToInstall";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import {
  ChevronDown,
  Home,
  Info,
  LogIn,
  Menu,
  ShoppingCart,
  Smartphone,
  Users,
  X,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

// FloatingContactButtons is now imported from @/components/FloatingContactButtons

const NAV_LINKS = [
  { label: "Home", to: "/", icon: Home },
  { label: "About", to: "/#about", icon: Info },
  { label: "Order Now", to: "/hotel", icon: ShoppingCart },
  { label: "Champions", to: "/#champions", icon: Users },
];

const LOGIN_OPTIONS = [
  { label: "Admin", to: "/staff", description: "Staff portal" },
  { label: "Champion", to: "/champion-login", description: "Champion portal" },
  { label: "Buyer", to: "/hotel", description: "Hotel / Restaurant" },
];

// Detect admin/staff role — checks localStorage for a session role flag set at login
function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const role = localStorage.getItem("kampot_user_role");
    setIsAdmin(role === "staff" || role === "admin");
  }, []);
  return isAdmin;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const loginRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  // Close login dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavClick(to: string) {
    setMenuOpen(false);
    setLoginOpen(false);
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(to);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200 shrink-0"
            data-ocid="header.logo_link"
          >
            Kampot Heritage
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.to}
                type="button"
                onClick={() => handleNavClick(link.to)}
                data-ocid={`header.nav_${link.label.toLowerCase().replace(/ /g, "_")}`}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}

            {/* Login dropdown (desktop) */}
            <div ref={loginRef} className="relative ml-1">
              <button
                type="button"
                onClick={() => setLoginOpen((v) => !v)}
                data-ocid="header.login_dropdown_button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/10 transition-colors duration-150"
                aria-haspopup="true"
                aria-expanded={loginOpen}
              >
                <LogIn size={15} />
                Login
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${loginOpen ? "rotate-180" : ""}`}
                />
              </button>
              {loginOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50"
                  data-ocid="header.login_dropdown"
                >
                  {LOGIN_OPTIONS.map((opt) => (
                    <button
                      key={opt.to}
                      type="button"
                      onClick={() => {
                        setLoginOpen(false);
                        navigate(opt.to);
                      }}
                      data-ocid={`header.login_${opt.label.toLowerCase()}`}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors duration-100 flex flex-col"
                    >
                      <span className="font-medium text-foreground">
                        {opt.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {opt.description}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side: cart + language switcher + hamburger */}
          <div className="flex items-center gap-2">
            {/* Cart icon with badge */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              data-ocid="header.cart_button"
              aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
              className="relative p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-150"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            <LanguageSwitcher />
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              data-ocid="header.hamburger_button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-150"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav
            className="md:hidden bg-card border-t border-border px-4 pb-4 pt-2 flex flex-col gap-1"
            aria-label="Mobile navigation"
            data-ocid="header.mobile_menu"
          >
            {/* PUBLIC section */}
            <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Public
            </p>
            <button
              type="button"
              onClick={() => handleNavClick("/")}
              data-ocid="mobile.nav_home"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
            >
              <Home size={17} className="text-primary/70" />
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("/hotel")}
              data-ocid="mobile.nav_order_now"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
            >
              <ShoppingCart size={17} className="text-primary/70" />
              Order Now
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("/become-a-champion")}
              data-ocid="mobile.nav_become_champion"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
            >
              <Users size={17} className="text-primary/70" />
              Become a Champion
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("/#champions-gallery")}
              data-ocid="mobile.nav_champions"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
            >
              <Users size={17} className="text-primary/70" />
              Champions
            </button>

            {/* ACCOUNT section */}
            <div className="border-t border-border mt-2 pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Account
              </p>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/staff");
                }}
                data-ocid="mobile.login_admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
              >
                <LogIn size={16} className="text-primary/60" />🔐 Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/champion-login");
                }}
                data-ocid="mobile.login_champion"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
              >
                <LogIn size={16} className="text-primary/60" />🏆 Champion Login
              </button>
            </div>

            {/* ADMIN section — only visible when logged in as admin/staff */}
            {isAdmin && (
              <div className="border-t border-border mt-2 pt-2">
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Admin
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/staff/champions");
                  }}
                  data-ocid="mobile.admin_champion_list"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
                >
                  <Users size={16} className="text-primary/60" />👥 Champion
                  List View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/staff");
                  }}
                  data-ocid="mobile.admin_dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
                >
                  <Info size={16} className="text-primary/60" />
                  ⚙️ Admin Dashboard
                </button>
              </div>
            )}

            {/* APP section */}
            <div className="border-t border-border mt-2 pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                App
              </p>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setInstallOpen(true);
                }}
                data-ocid="mobile.install_app_link"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
              >
                <Smartphone size={17} className="text-primary/70" />📲 Install
                App
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 bg-background">{children}</main>

      {/* Floating contact button — always visible on all pages */}
      <FloatingContactButtons />

      {/* Install App Modal */}
      <Dialog open={installOpen} onOpenChange={setInstallOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Install App</DialogTitle>
          </DialogHeader>
          <HowToInstall />
        </DialogContent>
      </Dialog>

      {/* Global cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

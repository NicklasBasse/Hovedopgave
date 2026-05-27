/**
 * SiteHeader.tsx
 * ----------------------------------------------------------------------------
 * Topbjælken/navigationen som vises øverst på alle sider. Indeholder:
 *   - Menu-ikon (mobil) — åbner en Sheet med links til de 3 undersider
 *   - Hovedmenu (desktop)
 *   - SPORT 24 logo i midten (link til forsiden)
 *   - Søgefelt (kosmetisk – ingen reel søgning)
 *   - Konto/ønskeliste/kurv-ikoner i højre side
 *
 * Kurv-ikonet er bevidst deaktiveret (disabled), fordi der ikke er et reelt
 * checkout-flow i demo-siden. Antallet af varer kommer fra `useCartCount()`
 * hooket, som læser fra vores cookie-baserede cart-store.
 *
 * `sticky top-0` gør at headeren bliver hængende i toppen ved scroll.
 */
import { useState } from "react";
import { Menu, Search, User, Heart, ShoppingBag, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import sport24Logo from "@/assets/sport24-logo.webp";
import { useCartCount } from "@/hooks/useCart";

const NAV = ["Kvinder", "Mænd", "Børn", "Aktiviteter", "Gode priser"];

const SIDENAV = [
  { label: "Spillertøj", to: "/spillertoj" },
  { label: "Merchandise", to: "/merchandise" },
  { label: "Alt fra SAH", to: "/se-alt-sah" },
];

export function SiteHeader() {
  const cartCount = useCartCount();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 py-5">
          {/* Mobil-menu knap – åbner Sheet-menu */}
          <button
            type="button"
            aria-label="Menu"
            className="text-foreground"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Hovedmenu – kun synlig på store skærme (lg breakpoint) */}
          <nav aria-label="Hovedmenu" className="hidden items-center gap-7 text-[15px] font-semibold lg:flex">
            {NAV.map((item) => (
              <a key={item} href="#" className="hover:text-brand-red">
                {item}
              </a>
            ))}
          </nav>

          {/* Logo – `mx-auto` centrerer det i den tilbageværende plads */}
          <a href="/" className="mx-auto flex items-center" aria-label="SPORT 24 – forside">
            <img
              src={sport24Logo}
              alt=""
              width={400}
              height={125}
              decoding="async"
              fetchPriority="high"
              className="h-8 w-auto md:h-9"
            />
          </a>

          {/* Søgefelt */}
          <div className="hidden flex-1 max-w-md md:block">
            <label htmlFor="site-search" className="sr-only">Søg</label>
            <div className="flex items-center rounded-full bg-muted px-4 py-2.5">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                id="site-search"
                type="search"
                placeholder="Hvad leder du efter?"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Højre ikoner: konto, ønskeliste og kurv */}
          <div className="flex items-center gap-4">
            <button type="button" aria-label="Konto"><User className="h-6 w-6" aria-hidden="true" /></button>
            <button type="button" aria-label="Ønskeliste"><Heart className="h-6 w-6" aria-hidden="true" /></button>
            <button
              type="button"
              disabled
              aria-label={`Indkøbskurv (${cartCount} ${cartCount === 1 ? "vare" : "varer"}) – ikke tilgængelig`}
              title="Kurven er ikke tilgængelig"
              className="relative cursor-not-allowed select-none disabled:opacity-100"
            >
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              {cartCount > 0 && (
                <span aria-hidden="true" className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold leading-none text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobil burgermenu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm border-r border-border bg-background p-6 shadow-lg animate-in slide-in-from-left duration-300">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
              aria-label="Luk menu"
            >
              <X className="h-5 w-5" />
            </button>

            <nav className="mt-10 flex flex-col gap-6" aria-label="Mobilmenu">
              {SIDENAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-lg font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-brand-red"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

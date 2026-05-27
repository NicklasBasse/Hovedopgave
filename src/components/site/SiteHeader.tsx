/**
 * SiteHeader.tsx
 * ----------------------------------------------------------------------------
 * Topbjælken/navigationen som vises øverst på alle sider. Indeholder:
 *   - Menu-ikon (mobil)
 *   - Hovedmenu (desktop)
 *   - SPORT 24 logo i midten (link til forsiden)
 *   - Søgefelt (kosmetisk – ingen reel søgning)
 *   - Konto/ønskeliste/kurv-ikoner i højre side
 *
 * Kurv-ikonet er bevidst deaktiveret (disabled), fordi der ikke er et reelt
 * checkout-flow i demo-siden. Selve badge-tallet (antal varer) lazy-loades
 * via `CartBadge`-komponenten — det holder `useCart`-hooket og cookie-
 * koden ude af den kritiske JS-bundle (Lighthouse mobil: "Reduce unused
 * JavaScript").
 *
 * `sticky top-0` gør at headeren bliver hængende i toppen ved scroll.
 */
import { lazy, Suspense } from "react";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import sport24Logo from "@/assets/sport24-logo.webp";

// Lazy-loaded badge: hentes først efter LCP, så cookies.ts + useCart.ts
// ikke skal parses for at vise above-the-fold indhold.
const CartBadge = lazy(() => import("@/components/site/CartBadge"));

// Menu-punkterne defineres som en simpel konstant, så de er nemme at
// vedligeholde og kan loopes igennem med .map() længere nede.
const NAV = ["Kvinder", "Mænd", "Børn", "Aktiviteter", "Gode priser"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 py-5">
        {/* Mobil-menu knap – aria-label sikrer skærmlæser-tilgængelighed */}
        <button type="button" aria-label="Menu" className="text-foreground">
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
          {/* Eksplicit width/height (samme aspect-ratio som filen 400x125)
              reserverer plads og forhindrer Cumulative Layout Shift (CLS). */}
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

        {/* Søgefelt – sr-only label er kun for skærmlæsere */}
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
          {/*
            Kurv-knap. Den er disabled (kurv-flow eksisterer ikke i demoen),
            men viser stadig en badge med antal varer brugeren har "lagt i kurv"
            via produktsiderne. `relative` + absolut positioneret span = badge.
            Badge'en lazy-loades for at holde initial JS-bundle minimal.
          */}
          <button
            type="button"
            disabled
            aria-label="Indkøbskurv – ikke tilgængelig"
            title="Kurven er ikke tilgængelig"
            className="relative cursor-not-allowed select-none disabled:opacity-100"
          >
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            <Suspense fallback={null}>
              <CartBadge />
            </Suspense>
          </button>
        </div>
      </div>
    </header>
  );
}

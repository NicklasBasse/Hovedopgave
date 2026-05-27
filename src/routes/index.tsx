/**
 * index.tsx (route "/")
 * ----------------------------------------------------------------------------
 * Forsiden. Bevidst slank: kun PromoBar, SiteHeader og Hero indlæses i den
 * initielle JS-bundle. Alt under hero-billedet (kategori-fliser, karruseller,
 * split-features, footer) lazy-loades samlet via `HomeBelowFold`.
 *
 * Hvorfor? Lighthouse mobil straffer hårdt på "Reduce unused JavaScript"
 * og "Largest Contentful Paint". Ved at sende mindst muligt JS i første
 * load, bliver siden interaktiv og hero-billedet synligt hurtigere.
 */

// TanStack Router – createFileRoute registrerer denne fil som ruten "/".
import { createFileRoute } from "@tanstack/react-router";
// React-primitives til kode-splitting.
import { lazy, Suspense } from "react";

// Above-the-fold komponenter (vises straks → ikke lazy).
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";

// Below-the-fold samles i ÉT lazy chunk. Dermed ryger alle produkt-billed-
// imports (mange MB samlet) ud af main-bundlen og hentes først når browseren
// er færdig med at male hero-sektionen.
const HomeBelowFold = lazy(() => import("@/components/site/HomeBelowFold"));

// Hero AVIF (~40% mindre end WebP) – modern browsers (96%+) preloader denne.
import heroImg from "@/assets/ach/hero-sah-studio.webp?w=1280&format=avif";

export const Route = createFileRoute("/")({
  // head(): sætter <title> og meta-tags der vises i fanen og ved deling.
  head: () => ({
    meta: [
      // Titel der vises i browser-fanen og i Google-resultater.
      { title: "SAH Shop | SPORT 24" },
      // Standard SEO-beskrivelse (< 160 tegn).
      {
        name: "description",
        content:
          "Køb officielt SAH spillertøj og merchandise hos SPORT 24. Hjemmebanetrøjer, merchandise, fodbolde og fan-merch.",
      },
      // Open Graph tags – styrer hvordan linket ser ud på Facebook/LinkedIn.
      { property: "og:title", content: "SAH Shop | SPORT 24" },
      {
        property: "og:description",
        content: "Officielt SAH spillertøj og merchandise hos SPORT 24.",
      },
    ],
    // Preload-hint til browseren: "Begynd at hente hero-billedet NU,
    // før HTML-parsing rammer <img>-tagget". Forbedrer LCP markant.
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
  // Hvilken React-komponent ruten skal rendre.
  component: Index,
});

function Index() {
  return (
    // `min-h-screen` sikrer at footeren altid sidder mindst nederst i viewporten.
    // antialiased = jævne fontkanter på alle browsere.
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Gul kampagne-bjælke øverst. */}
      <PromoBar />
      {/* Hovednavigation. */}
      <SiteHeader />
      {/* id="main-content" er målet for "Spring til indhold"-skip-linket i __root. */}
      <main id="main-content">
        {/* Hero indlæses synkront → vises ASAP. */}
        <Hero />
        {/* Alt under hero: lazy chunk. fallback=null → ingen spinner, ingen layout shift. */}
        <Suspense fallback={null}>
          <HomeBelowFold />
        </Suspense>
      </main>
    </div>
  );
}

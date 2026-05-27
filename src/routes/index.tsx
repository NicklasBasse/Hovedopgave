import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";

// Hele below-the-fold-sektionen lazy-loades som ÉT chunk. Det holder alle
// produkt-billed-imports ude af hovedbundlen — vigtigt for mobil-LCP.
const HomeBelowFold = lazy(() => import("@/components/site/HomeBelowFold"));

import heroImg from "@/assets/ach/hero-sah-studio.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAH Shop | SPORT 24" },
      {
        name: "description",
        content:
          "Køb officielt SAH spillertøj og merchandise hos SPORT 24. Hjemmebanetrøjer, merchandise, fodbolde og fan-merch.",
      },
      { property: "og:title", content: "SAH Shop | SPORT 24" },
      {
        property: "og:description",
        content: "Officielt SAH spillertøj og merchandise hos SPORT 24.",
      },
    ],
    // Preload af hero-billedet → forbedrer LCP (Largest Contentful Paint).
    links: [
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <HomeBelowFold />
        </Suspense>
      </main>
    </div>
  );
}

/**
 * spillertoj.tsx (route "/spillertoj")
 * ----------------------------------------------------------------------------
 * Kategori-undersiden for SAH spillertøj (trøjer, shorts, strømper).
 *
 * Strukturen er identisk med /merchandise: data øverst, layout nederst.
 * Vi genbruger den fælles `<CategoryLanding>`-komponent, så det visuelle
 * udtryk er konsistent på tværs af kategorier — kun data ændres.
 *
 * Alle produkter er markeret med `excluded: true`, fordi spillertøj er
 * undtaget den aktuelle 20%-medlemskampagne. Det viser en lille badge på
 * hvert produktkort.
 */

// TanStack Router – registrerer denne fil som ruten "/spillertoj".
import { createFileRoute } from "@tanstack/react-router";

// Genbrugte layout-komponenter.
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  CategoryLanding,
  type CategoryProduct,
  type SubCategory,
} from "@/components/site/CategoryLanding";

// Billeder til underkategori-cirklerne.
import logo from "@/assets/ach/tile-logo-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";

// Produktbilleder — alle spillertøj-varianter.
import pHome from "@/assets/ach/p-home-jersey.webp";
import pAwayKidsJersey from "@/assets/ach/p-away-kids-sah-jersey.webp";
import pShorts from "@/assets/ach/p-shorts.webp";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp";
import pSocksBlack from "@/assets/ach/p-socks-black.webp";
import pSocksWhite from "@/assets/ach/p-socks-white.webp";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp";

// Rutedefinition + SEO/OG-tags pr. side.
export const Route = createFileRoute("/spillertoj")({
  head: () => ({
    meta: [
      { title: "SAH Spillertøj | SPORT 24" },
      {
        name: "description",
        content:
          "Køb officielt SAH spillertøj - hjemmebane, merchandise, shorts og strømper.",
      },
      { property: "og:title", content: "SAH Spillertøj | SPORT 24" },
      { property: "og:description", content: "Officielt SAH spillertøj hos SPORT 24." },
    ],
  }),
  component: Page,
});

// Underkategori-cirkler — samme tre på alle kategori-undersider, for at
// brugeren altid kan skifte mellem dem.
const subCategories: SubCategory[] = [
  { img: logo, label: "Alt SAH", to: "/se-alt-sah" },
  { img: tileJersey, label: "Spillertøj", to: "/spillertoj" },
  { img: tileMerch, label: "Merchandise", to: "/merchandise" },
];

// Alle spillertøj-produkter er `excluded: true` → kampagne-badge vises.
const products: CategoryProduct[] = [
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Top-bjælke + navigation — samme på tværs af sitet. */}
      <PromoBar />
      <SiteHeader />
      <main id="main-content">
        <CategoryLanding
          breadcrumb="SAH OFFICIEL MERCHANDISE SHOP"
          title="SAH - Spillertøj"
          // Antal udregnes dynamisk → kan ikke komme ud af synk med produktlisten.
          count={products.length}
          subCategories={subCategories}
          products={products}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

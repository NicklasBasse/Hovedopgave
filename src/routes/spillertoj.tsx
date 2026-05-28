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
import { CategoryNavSections } from "@/components/site/CategoryNavSections";
import {
  CategoryLanding,
  type CategoryProduct,
  type SubCategory,
} from "@/components/site/CategoryLanding";

// Billeder til underkategori-cirklerne.
import logo from "@/assets/sah/tile-logo-v2.webp";
import tileJersey from "@/assets/sah/tile-sah-v3.webp";
import tileMerch from "@/assets/sah/tile-merch-v2.webp";

// Produktbilleder — alle spillertøj-varianter. Importeres som lille fallback
// + responsive srcset, så mobil ikke henter fuld-størrelse 1000px-billeder.
import pHome from "@/assets/sah/p-home-jersey.webp?w=320&format=webp";
import pHomeSet from "@/assets/sah/p-home-jersey.webp?w=240;480&format=webp&as=srcset";
import pHomeSetAvif from "@/assets/sah/p-home-jersey.webp?w=240;480&format=avif&as=srcset";
import pAwayKidsJersey from "@/assets/sah/p-away-kids-sah-jersey.webp?w=320&format=webp";
import pAwayKidsJerseySet from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsJerseySetAvif from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=avif&as=srcset";
import pShorts from "@/assets/sah/p-shorts.webp?w=320&format=webp";
import pShortsSet from "@/assets/sah/p-shorts.webp?w=240;480&format=webp&as=srcset";
import pShortsSetAvif from "@/assets/sah/p-shorts.webp?w=240;480&format=avif&as=srcset";
import pShortsKids from "@/assets/sah/p-shorts-kids.webp?w=320&format=webp";
import pShortsKidsSet from "@/assets/sah/p-shorts-kids.webp?w=240;480&format=webp&as=srcset";
import pShortsKidsSetAvif from "@/assets/sah/p-shorts-kids.webp?w=240;480&format=avif&as=srcset";
import pShortsKids2526 from "@/assets/sah/p-shorts-kids-2526.webp?w=320&format=webp";
import pShortsKids2526Set from "@/assets/sah/p-shorts-kids-2526.webp?w=240;480&format=webp&as=srcset";
import pShortsKids2526SetAvif from "@/assets/sah/p-shorts-kids-2526.webp?w=240;480&format=avif&as=srcset";
import pSocksBlack from "@/assets/sah/p-socks-black.webp?w=320&format=webp";
import pSocksBlackSet from "@/assets/sah/p-socks-black.webp?w=240;480&format=webp&as=srcset";
import pSocksBlackSetAvif from "@/assets/sah/p-socks-black.webp?w=240;480&format=avif&as=srcset";
import pSocksWhite from "@/assets/sah/p-socks-white.webp?w=320&format=webp";
import pSocksWhiteSet from "@/assets/sah/p-socks-white.webp?w=240;480&format=webp&as=srcset";
import pSocksWhiteSetAvif from "@/assets/sah/p-socks-white.webp?w=240;480&format=avif&as=srcset";
import pSocksYellow from "@/assets/sah/p-socks-yellow.webp?w=320&format=webp";
import pSocksYellowSet from "@/assets/sah/p-socks-yellow.webp?w=240;480&format=webp&as=srcset";
import pSocksYellowSetAvif from "@/assets/sah/p-socks-yellow.webp?w=240;480&format=avif&as=srcset";

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
  { img: logo, label: "Alt fra SAH", to: "/se-alt-sah" },
  { img: tileJersey, label: "Spillertøj", to: "/spillertoj" },
  { img: tileMerch, label: "Merchandise", to: "/merchandise" },
];

// Alle spillertøj-produkter er `excluded: true` → kampagne-badge vises.
const products: CategoryProduct[] = [
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, srcset: pShortsKidsSet, avifSrcset: pShortsKidsSetAvif, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, srcset: pAwayKidsJerseySet, avifSrcset: pAwayKidsJerseySetAvif, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, srcset: pHomeSet, avifSrcset: pHomeSetAvif, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, srcset: pSocksBlackSet, avifSrcset: pSocksBlackSetAvif, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, srcset: pSocksWhiteSet, avifSrcset: pSocksWhiteSetAvif, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, srcset: pSocksYellowSet, avifSrcset: pSocksYellowSetAvif, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, srcset: pShortsKids2526Set, avifSrcset: pShortsKids2526SetAvif, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, srcset: pShortsSet, avifSrcset: pShortsSetAvif, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
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
        <CategoryNavSections showNavigation={false} activeKey="spillertoj" />
      </main>
      <SiteFooter />
    </div>
  );
}

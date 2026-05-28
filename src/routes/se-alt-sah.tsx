/**
 * se-alt-sah.tsx (route "/se-alt-sah")
 * ----------------------------------------------------------------------------
 * Samlet kategori-underside der viser HELE SAH-sortimentet på én side —
 * både merchandise og spillertøj. Bruges som "se alle"-indgang fra forsidens
 * tredje fliser-kort og fra breadcrumbs på produktsiden.
 *
 * Sidens layout og adfærd er identisk med /merchandise og /spillertoj
 * (samme `<CategoryLanding>`-komponent) — kun produktdatasættet er anderledes,
 * fordi denne side er en union af de to andres data.
 */

// TanStack Router – registrerer denne fil som ruten "/se-alt-sah".
import { createFileRoute } from "@tanstack/react-router";

// Layout-komponenter (samme på alle sider).
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryNavSections } from "@/components/site/CategoryNavSections";
import {
  CategoryLanding,
  type CategoryProduct,
  type SubCategory,
} from "@/components/site/CategoryLanding";

// Cirkel-billeder til underkategori-rækken.
import logo from "@/assets/sah/tile-sah-logo.webp";
import tileJersey from "@/assets/sah/tile-sah-spillertoj.webp";
import tileMerch from "@/assets/sah/tile-sah-merchandise.webp";

// Alle produktbilleder. Hvert billede importeres TO gange: en lille fallback
// (`?w=400`) og et responsive srcset (`?w=240;480`). Mobil-browsere
// henter dermed kun den mindste passende variant.
import pAway from "@/assets/sah/p-away-sah.webp?w=320&format=webp";
import pAwaySet from "@/assets/sah/p-away-sah.webp?w=240;480&format=webp&as=srcset";
import pAwaySetAvif from "@/assets/sah/p-away-sah.webp?w=240;480&format=avif&as=srcset";
import pAwayKids from "@/assets/sah/p-away-kids-sah.webp?w=320&format=webp";
import pAwayKidsSet from "@/assets/sah/p-away-kids-sah.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsSetAvif from "@/assets/sah/p-away-kids-sah.webp?w=240;480&format=avif&as=srcset";
import pAwayKidsJersey from "@/assets/sah/p-away-kids-sah-jersey.webp?w=320&format=webp";
import pAwayKidsJerseySet from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsJerseySetAvif from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=avif&as=srcset";
import pBallBlue from "@/assets/sah/p-ball-blue-new.webp?w=320&format=webp";
import pBallBlueSet from "@/assets/sah/p-ball-blue-new.webp?w=240;480&format=webp&as=srcset";
import pBallBlueSetAvif from "@/assets/sah/p-ball-blue-new.webp?w=240;480&format=avif&as=srcset";
import pBootbag from "@/assets/sah/p-bootbag-new.webp?w=320&format=webp";
import pBootbagSet from "@/assets/sah/p-bootbag-new.webp?w=240;480&format=webp&as=srcset";
import pBootbagSetAvif from "@/assets/sah/p-bootbag-new.webp?w=240;480&format=avif&as=srcset";
import pBallGreen from "@/assets/sah/p-ball-green-new.webp?w=320&format=webp";
import pBallGreenSet from "@/assets/sah/p-ball-green-new.webp?w=240;480&format=webp&as=srcset";
import pBallGreenSetAvif from "@/assets/sah/p-ball-green-new.webp?w=240;480&format=avif&as=srcset";
import pBallYellow from "@/assets/sah/p-ball-yellow-new.webp?w=320&format=webp";
import pBallYellowSet from "@/assets/sah/p-ball-yellow-new.webp?w=240;480&format=webp&as=srcset";
import pBallYellowSetAvif from "@/assets/sah/p-ball-yellow-new.webp?w=240;480&format=avif&as=srcset";
import pBlanket from "@/assets/sah/p-blanket-new.webp?w=320&format=webp";
import pBlanketSet from "@/assets/sah/p-blanket-new.webp?w=240;480&format=webp&as=srcset";
import pBlanketSetAvif from "@/assets/sah/p-blanket-new.webp?w=240;480&format=avif&as=srcset";
import pHome from "@/assets/sah/p-home-jersey.webp?w=320&format=webp";
import pHomeSet from "@/assets/sah/p-home-jersey.webp?w=240;480&format=webp&as=srcset";
import pHomeSetAvif from "@/assets/sah/p-home-jersey.webp?w=240;480&format=avif&as=srcset";
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

// Rutedefinition + SEO/OG-tags.
export const Route = createFileRoute("/se-alt-sah")({
  head: () => ({
    meta: [
      { title: "Se alt SAH | SPORT 24" },
      {
        name: "description",
        content:
          "Hele SAH-sortimentet - spillertøj, merchandise og tilbehør samlet ét sted.",
      },
      { property: "og:title", content: "Se alt SAH | SPORT 24" },
      { property: "og:description", content: "Hele SAH-sortimentet hos SPORT 24." },
    ],
  }),
  component: Page,
});

// Underkategori-cirkler — peger til hver af de tre SAH-sider.
const subCategories: SubCategory[] = [
  { img: logo, label: "Alt fra SAH", to: "/se-alt-sah" },
  { img: tileJersey, label: "Spillertøj", to: "/spillertoj" },
  { img: tileMerch, label: "Merchandise", to: "/merchandise" },
];

// Samlet produktliste: rækkefølgen er bevidst — først merchandise (7 stk),
// derefter spillertøj (8 stk) — for at matche layoutet i designet.
const products: CategoryProduct[] = [
  // ---- Merchandise (7 produkter) ----
  { slug: "sah-udebanetroje-25", img: pAway, srcset: pAwaySet, avifSrcset: pAwaySetAvif, name: "SAH t-shirt", price: "150 kr." },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, srcset: pAwayKidsSet, avifSrcset: pAwayKidsSetAvif, name: "​SAH hoodie", price: "250 kr." },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, srcset: pBallBlueSet, avifSrcset: pBallBlueSetAvif, name: "SAH bøllehat", price: "250 kr." },
  { slug: "sah-stovlepose", img: pBootbag, srcset: pBootbagSet, avifSrcset: pBootbagSetAvif, name: "SAH cap", price: "175 kr." },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, srcset: pBallGreenSet, avifSrcset: pBallGreenSetAvif, name: "SAH halstørklæde", price: "175 kr." },
  { slug: "sah-fodbold-gul", img: pBallYellow, srcset: pBallYellowSet, avifSrcset: pBallYellowSetAvif, name: "SAH håndklæde", price: "250 kr." },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, srcset: pBlanketSet, avifSrcset: pBlanketSetAvif, name: "SAH flag", price: "175 kr." },
  // ---- Spillertøj (8 produkter — alle excluded fra kampagne) ----
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
      <PromoBar />
      <SiteHeader />
      <main id="main-content">
        <CategoryLanding
          breadcrumb="SAH OFFICIEL MERCHANDISE SHOP"
          title="Se alt SAH"
          count={products.length}
          subCategories={subCategories}
          products={products}
        />
        <CategoryNavSections showNavigation={false} activeKey="sah" />
      </main>
      <SiteFooter />
    </div>
  );
}

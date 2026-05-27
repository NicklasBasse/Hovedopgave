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
import {
  CategoryLanding,
  type CategoryProduct,
  type SubCategory,
} from "@/components/site/CategoryLanding";

// Cirkel-billeder til underkategori-rækken.
import logo from "@/assets/ach/tile-logo-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";

// Alle produktbilleder. Vi har brug for både merch- og spillertøj-billeder
// her, da siden samler dem.
import pAway from "@/assets/ach/p-away-sah.webp";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp";
import pAwayKidsJersey from "@/assets/ach/p-away-kids-sah-jersey.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import pBootbag from "@/assets/ach/p-bootbag-new.webp";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp";
import pBlanket from "@/assets/ach/p-blanket-new.webp";
import pHome from "@/assets/ach/p-home-jersey.webp";
import pShorts from "@/assets/ach/p-shorts.webp";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp";
import pSocksBlack from "@/assets/ach/p-socks-black.webp";
import pSocksWhite from "@/assets/ach/p-socks-white.webp";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp";

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
  { img: logo, label: "Alt SAH", to: "/se-alt-sah" },
  { img: tileJersey, label: "Spillertøj", to: "/spillertoj" },
  { img: tileMerch, label: "Merchandise", to: "/merchandise" },
];

// Samlet produktliste: rækkefølgen er bevidst — først merchandise (7 stk),
// derefter spillertøj (8 stk) — for at matche layoutet i designet.
const products: CategoryProduct[] = [
  // ---- Merchandise (7 produkter) ----
  { slug: "sah-udebanetroje-25", img: pAway, name: "SAH t-shirt", price: "150 kr." },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, name: "​SAH hoodie", price: "250 kr." },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, name: "SAH bøllehat", price: "250 kr." },
  { slug: "sah-stovlepose", img: pBootbag, name: "SAH cap", price: "175 kr." },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, name: "SAH halstørklæde", price: "175 kr." },
  { slug: "sah-fodbold-gul", img: pBallYellow, name: "SAH håndklæde", price: "250 kr." },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, name: "SAH flag", price: "175 kr." },
  // ---- Spillertøj (8 produkter — alle excluded fra kampagne) ----
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
      </main>
      <SiteFooter />
    </div>
  );
}

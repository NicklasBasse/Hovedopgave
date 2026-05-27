/**
 * merchandise.tsx (route "/merchandise")
 * ----------------------------------------------------------------------------
 * Kategori-undersiden for SAH merchandise (t-shirts, caps, halstørklæder …).
 *
 * Sidens opbygning er bevidst delt op i to dele:
 *   1) DATA — i toppen af filen: hvilke underkategorier og produkter
 *      sidens grid skal vise. Holdes som konstanter for læsbarhed og let
 *      vedligehold.
 *   2) UI — den lille `Page`-komponent nederst som bare sammenstykker
 *      PromoBar + SiteHeader + CategoryLanding + SiteFooter.
 *
 * Selve præsentationen ligger i den genbrugelige `<CategoryLanding>`
 * komponent — så /merchandise, /spillertoj og /se-alt-sah ser ens ud
 * uden at vi duplikerer JSX.
 */

// TanStack Router – registrerer denne fil som ruten "/merchandise".
import { createFileRoute } from "@tanstack/react-router";

// Layout-byggesten der genbruges på alle undersider.
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
// Selve kategorivisningen (titel, breadcrumb, underkategori-cirkler, grid).
import {
  CategoryLanding,
  type CategoryProduct,
  type SubCategory,
} from "@/components/site/CategoryLanding";

// Billeder til underkategori-cirklerne i toppen af siden.
import logo from "@/assets/ach/tile-logo-v2.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";

// Produktbilleder. Vite hash'er og optimerer dem automatisk ved build.
import pAway from "@/assets/ach/p-away-sah.webp";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp";
import pBootbag from "@/assets/ach/p-bootbag-new.webp";
import pBlanket from "@/assets/ach/p-blanket-new.webp";

// Definerer selve ruten + dens meta-tags til SEO og social sharing.
export const Route = createFileRoute("/merchandise")({
  head: () => ({
    meta: [
      // Titel i browser-fanen.
      { title: "SAH Merchandise | SPORT 24" },
      // Beskrivelse vist i Googles søgeresultater.
      {
        name: "description",
        content:
          "Officiel SAH merchandise - fodbolde, fan-tøj, tæpper og tilbehør.",
      },
      // Open Graph-tags styrer hvordan linket ser ud ved deling på Facebook/LinkedIn.
      { property: "og:title", content: "SAH Merchandise | SPORT 24" },
      { property: "og:description", content: "Officiel SAH merchandise hos SPORT 24." },
    ],
  }),
  component: Page,
});

// De tre underkategori-cirkler øverst – linker mellem SAH-undersiderne.
const subCategories: SubCategory[] = [
  { img: logo, label: "Alt SAH", to: "/se-alt-sah" },
  { img: tileJersey, label: "Spillertøj", to: "/spillertoj" },
  { img: tileMerch, label: "Merchandise", to: "/merchandise" },
];

// Produktlisten der vises i griddet. Hvert produkt har et `slug` der gør
// kortet klikbart og linker videre til /produkt/$slug.
const products: CategoryProduct[] = [
  { slug: "sah-udebanetroje-25", img: pAway, name: "SAH t-shirt", price: "150 kr." },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, name: "SAH hoodie", price: "250 kr." },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, name: "SAH bøllehat", price: "250 kr." },
  { slug: "sah-stovlepose", img: pBootbag, name: "SAH cap", price: "175 kr." },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, name: "SAH halstørklæde", price: "175 kr." },
  { slug: "sah-fodbold-gul", img: pBallYellow, name: "SAH håndklæde", price: "250 kr." },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, name: "SAH flag", price: "175 kr." },
];

// Selve sidekomponenten — minimal fordi alt heavy lifting sker i
// CategoryLanding. Vi sammenkæder bare layout-blokkene her.
function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Den gule kampagnebjælke i toppen af sitet. */}
      <PromoBar />
      {/* Hovednavigation (samme på alle sider). */}
      <SiteHeader />
      {/* id="main-content" matcher skip-linket i __root.tsx (WCAG 2.4.1). */}
      <main id="main-content">
        <CategoryLanding
          breadcrumb="SAH OFFICIEL MERCHANDISE SHOP"
          title="SAH - Merchandise"
          // `count` udregnes dynamisk fra arrayet — så vi aldrig får et tal,
          // der ikke matcher antallet af produkter på siden.
          count={products.length}
          subCategories={subCategories}
          products={products}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

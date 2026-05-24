import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryLanding, type CategoryProduct, type SubCategory } from "@/components/site/CategoryLanding";

import logo from "@/assets/ach/tile-logo-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";
import pHome from "@/assets/ach/p-home-jersey.webp";
import pAway from "@/assets/ach/p-away-sah.webp";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp";
import pShorts from "@/assets/ach/p-shorts.webp";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp";
import pSocksBlack from "@/assets/ach/p-socks-black.webp";
import pSocksWhite from "@/assets/ach/p-socks-white.webp";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp";

export const Route = createFileRoute("/spillertoj")({
  head: () => ({
    meta: [
      { title: "SAH Spillertøj | SPORT 24" },
      { name: "description", content: "Køb officielt SAH spillertøj - hjemmebane, udebane, shorts og strømper." },
      { property: "og:title", content: "SAH Spillertøj | SPORT 24" },
      { property: "og:description", content: "Officielt SAH spillertøj hos SPORT 24." },
    ],
  }),
  component: Page,
});

const subCategories: SubCategory[] = [
  { img: logo, label: "SAH" },
  { img: tileJersey, label: "Hjemmebane" },
  { img: pAway, label: "Udebane" },
  { img: pShorts, label: "Shorts" },
  { img: pSocksBlack, label: "Strømper" },
];

const products: CategoryProduct[] = [
  { img: pHome, name: "SAH Hjemmebanetrøje 25/26", price: "455 kr.", excluded: true },
  { img: pAway, name: "SAH Udebanetrøje 25", price: "420 kr.", excluded: true },
  { img: pAwayKids, name: "SAH Udebanetrøje 25 Børn", price: "385 kr.", excluded: true },
  { img: pShorts, name: "SAH Hjemmebaneshorts 25/26", price: "300 kr.", excluded: true },
  { img: pShortsKids, name: "SAH Hjemmebaneshorts 24/25 Børn", price: "245 kr.", excluded: true },
  { img: pShortsKids2526, name: "SAH Hjemmebaneshorts 25/26 Børn", price: "260 kr.", excluded: true },
  { img: pSocksBlack, name: "SAH Udebanestrømper 2024", price: "50 kr.", excluded: true },
  { img: pSocksWhite, name: "SAH Udebanestrømper 25", price: "65 kr.", excluded: true },
  { img: pSocksYellow, name: "SAH Hjemmebanestrømper 25/26", price: "105 kr.", excluded: true },
];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main>
        <CategoryLanding
          breadcrumb="SAH OFFICIEL MERCHANDISE SHOP"
          title="SAH - Spillertøj"
          count={products.length}
          subCategories={subCategories}
          products={products}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

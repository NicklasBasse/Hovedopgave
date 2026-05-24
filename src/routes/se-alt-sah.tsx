import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryLanding, type CategoryProduct, type SubCategory } from "@/components/site/CategoryLanding";

import logo from "@/assets/ach/tile-logo-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";
import pHome from "@/assets/ach/p-home-jersey.webp";
import pAway from "@/assets/ach/p-away-sah.webp";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp";
import pShorts from "@/assets/ach/p-shorts.webp";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp";
import pSocksBlack from "@/assets/ach/p-socks-black.webp";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp";
import pBootbag from "@/assets/ach/p-bootbag-new.webp";
import pBlanket from "@/assets/ach/p-blanket-new.webp";
import pSweatshirt from "@/assets/ach/p-sweatshirt.jpg";
import pUmbrella from "@/assets/ach/p-umbrella.jpg";
import pCap from "@/assets/ach/p-cap.jpg";

export const Route = createFileRoute("/se-alt-sah")({
  head: () => ({
    meta: [
      { title: "Se alt SAH | SPORT 24" },
      { name: "description", content: "Hele SAH-sortimentet - spillertøj, merchandise og tilbehør samlet ét sted." },
      { property: "og:title", content: "Se alt SAH | SPORT 24" },
      { property: "og:description", content: "Hele SAH-sortimentet hos SPORT 24." },
    ],
  }),
  component: Page,
});

const subCategories: SubCategory[] = [
  { img: logo, label: "SAH" },
  { img: tileJersey, label: "Spillertøj" },
  { img: tileMerch, label: "Merchandise" },
];

const products: CategoryProduct[] = [
  { img: pHome, name: "SAH Hjemmebanetrøje 25/26", price: "455 kr.", excluded: true },
  { img: pAway, name: "SAH Udebanetrøje 25", price: "420 kr.", excluded: true },
  { img: pAwayKids, name: "SAH Udebanetrøje 25 Børn", price: "385 kr.", excluded: true },
  { img: pShorts, name: "SAH Hjemmebaneshorts 25/26", price: "300 kr.", excluded: true },
  { img: pShortsKids, name: "SAH Hjemmebaneshorts 24/25 Børn", price: "245 kr.", excluded: true },
  { img: pSocksBlack, name: "SAH Udebanestrømper 2024", price: "50 kr.", excluded: true },
  { img: pSocksYellow, name: "SAH Hjemmebanestrømper 25/26", price: "105 kr.", excluded: true },
  { img: pBallBlue, name: "SAH Precision Training Fodbold", price: "200 kr.", oldPrice: "250 kr." },
  { img: pBallGreen, name: "SAH Precision Training Fodbold Grøn", price: "200 kr.", oldPrice: "250 kr." },
  { img: pBallYellow, name: "SAH Fodbold Gul", price: "72,80 kr.", oldPrice: "130 kr." },
  { img: pBootbag, name: "SAH Støvlepose", price: "100 kr.", oldPrice: "125 kr." },
  { img: pBlanket, name: "SAH 130x160 Fleecetæppe", price: "200 kr." },
  { img: pSweatshirt, name: "SAH Sweatshirt", price: "350 kr." },
  { img: pUmbrella, name: "SAH Paraply", price: "180 kr." },
  { img: pCap, name: "SAH Cap", price: "150 kr." },
];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main>
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

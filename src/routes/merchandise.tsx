import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryLanding, type CategoryProduct, type SubCategory } from "@/components/site/CategoryLanding";

import logo from "@/assets/ach/tile-logo-v2.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp";
import pBootbag from "@/assets/ach/p-bootbag-new.webp";
import pBlanket from "@/assets/ach/p-blanket-new.webp";
import pSweatshirt from "@/assets/ach/p-sweatshirt.jpg";
import pUmbrella from "@/assets/ach/p-umbrella.jpg";


export const Route = createFileRoute("/merchandise")({
  head: () => ({
    meta: [
      { title: "SAH Merchandise | SPORT 24" },
      { name: "description", content: "Officiel SAH merchandise - fodbolde, fan-tøj, tæpper og tilbehør." },
      { property: "og:title", content: "SAH Merchandise | SPORT 24" },
      { property: "og:description", content: "Officiel SAH merchandise hos SPORT 24." },
    ],
  }),
  component: Page,
});

const subCategories: SubCategory[] = [
  { img: logo, label: "SAH" },
  { img: tileMerch, label: "Fan-tøj" },
  { img: pBallBlue, label: "Fodbolde" },
  { img: pBlanket, label: "Tæpper" },
  { img: pUmbrella, label: "Tilbehør" },
];

const products: CategoryProduct[] = [
  { img: pBallBlue, name: "SAH Precision Training Fodbold", price: "200 kr.", oldPrice: "250 kr." },
  { img: pBallGreen, name: "SAH Precision Training Fodbold Grøn", price: "200 kr.", oldPrice: "250 kr." },
  { img: pBallYellow, name: "SAH Fodbold Gul", price: "72,80 kr.", oldPrice: "130 kr." },
  { img: pBootbag, name: "SAH Støvlepose", price: "100 kr.", oldPrice: "125 kr." },
  { img: pBlanket, name: "SAH 130x160 Fleecetæppe", price: "200 kr." },
  { img: pSweatshirt, name: "SAH Sweatshirt", price: "350 kr." },
  { img: pUmbrella, name: "SAH Paraply", price: "180 kr." },
];

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main>
        <CategoryLanding
          breadcrumb="SAH OFFICIEL MERCHANDISE SHOP"
          title="SAH - Merchandise"
          count={products.length}
          subCategories={subCategories}
          products={products}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

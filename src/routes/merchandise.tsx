import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryLanding, type CategoryProduct, type SubCategory } from "@/components/site/CategoryLanding";

import logo from "@/assets/ach/tile-logo-v2.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import { getProductsByCategory } from "@/data/products";

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
];

const products: CategoryProduct[] = getProductsByCategory("merchandise").slice(0, 7);

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

import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryLanding, type CategoryProduct, type SubCategory } from "@/components/site/CategoryLanding";

import logo from "@/assets/ach/tile-logo-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";
import { PRODUCTS } from "@/data/products";

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

const products: CategoryProduct[] = PRODUCTS;

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

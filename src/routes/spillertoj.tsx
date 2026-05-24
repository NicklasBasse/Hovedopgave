import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CategoryLanding, type CategoryProduct, type SubCategory } from "@/components/site/CategoryLanding";

import logo from "@/assets/ach/tile-logo-v2.webp";
import tileJersey from "@/assets/ach/tile-sah-v3.webp";
import tileMerch from "@/assets/ach/tile-merch-v2.webp";
import { getProductsByCategory } from "@/data/products";

export const Route = createFileRoute("/spillertoj")({
  head: () => ({
    meta: [
      { title: "SAH Spillertøj | SPORT 24" },
      { name: "description", content: "Køb officielt SAH spillertøj - hjemmebane, merchandise, shorts og strømper." },
      { property: "og:title", content: "SAH Spillertøj | SPORT 24" },
      { property: "og:description", content: "Officielt SAH spillertøj hos SPORT 24." },
    ],
  }),
  component: Page,
});

const subCategories: SubCategory[] = [
  { img: logo, label: "Alt SAH", to: "/se-alt-sah" },
  { img: tileJersey, label: "Spillertøj", to: "/spillertoj" },
  { img: tileMerch, label: "Merchandise", to: "/merchandise" },
];

const products: CategoryProduct[] = getProductsByCategory("spillertoj");

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

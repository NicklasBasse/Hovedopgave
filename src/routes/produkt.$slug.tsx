import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Heart, Truck, Store, Shield } from "lucide-react";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getProductBySlug, SIZES, type Size } from "@/data/products";
import { cartStore } from "@/hooks/useCart";

export const Route = createFileRoute("/produkt/$slug")({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    return {
      meta: [
        { title: product ? `Køb ${product.name} | SPORT 24` : "Produkt | SPORT 24" },
        { name: "description", content: product ? `Køb ${product.name} hos SPORT 24.` : "Produkt hos SPORT 24." },
        { property: "og:title", content: product ? `${product.name} | SPORT 24` : "Produkt | SPORT 24" },
        { property: "og:description", content: product ? `Køb ${product.name} hos SPORT 24.` : "Produkt hos SPORT 24." },
        ...(product ? [{ property: "og:image", content: product.img }, { name: "twitter:image", content: product.img }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <PromoBar />
      <SiteHeader />
      <div className="mx-auto max-w-[1440px] px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Produktet blev ikke fundet</h1>
        <Link to="/" className="mt-6 inline-block underline">Tilbage til forsiden</Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="p-8 text-center">
        <p>Noget gik galt.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 rounded bg-foreground px-4 py-2 text-background"
        >
          Prøv igen
        </button>
      </div>
    );
  },
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.hasSizes && !selectedSize) {
      setError(true);
      return;
    }
    cartStore.add(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-6 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Link to="/se-alt-sah" className="font-semibold uppercase tracking-wide underline">
              SAH Officiel Merchandise Shop
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <Link
              to={product.category === "spillertoj" ? "/spillertoj" : "/merchandise"}
              className="text-muted-foreground hover:underline"
            >
              SAH - {product.category === "spillertoj" ? "Spillertøj" : "Merchandise"}
            </Link>
          </div>
          <span className="font-mono text-xs uppercase text-muted-foreground">{product.slug}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Image gallery */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img src={product.img} alt={product.name} className="h-full w-full object-cover" style={{ transform: "scaleX(-1)" }} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {product.excluded && (
              <span className="inline-block bg-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-background">
                Undtaget af kampagnen
              </span>
            )}
            <p className="mt-4 text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2 text-xs">
              <div className="flex text-muted-foreground">{"★★★★★".split("").map((s, i) => <span key={i}>☆</span>)}</div>
              <span className="text-muted-foreground underline">(0)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-4xl font-black text-brand-red">{product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">{product.oldPrice}</span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Medlemmer optjener: <span className="font-semibold text-foreground">{Math.round(parseFloat(product.price) / 10)} point</span></p>

            {product.hasSizes && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-semibold">Vælg størrelse:</p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => { setSelectedSize(size); setError(false); }}
                      className={`rounded border px-4 py-3 text-sm font-semibold transition ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className={`mt-2 text-xs ${error ? "text-brand-red" : "text-muted-foreground"}`}>
                  Lagerstatus online: <span className="font-semibold">{selectedSize ? "På lager" : "Vælg størrelse"}</span>
                </p>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 rounded-full bg-brand-red px-6 py-4 text-base font-bold text-white transition hover:opacity-90"
              >
                {added ? "Lagt i kurv ✓" : "Læg i kurv"}
              </button>
              <button
                aria-label="Tilføj til favoritter"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border hover:bg-muted"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <li className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0" />
                <span>Gratis fragt ved køb over 499 kr.</span>
              </li>
              <li className="flex items-start gap-3">
                <Store className="mt-0.5 h-5 w-5 shrink-0" />
                <span>Reserver og afhent i butik.</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0" />
                <span>100 dages returret.</span>
              </li>
            </ul>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

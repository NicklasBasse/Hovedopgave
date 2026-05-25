/**
 * produkt.$slug.tsx
 * ----------------------------------------------------------------------------
 * Dynamisk produktside. Filnavnet "produkt.$slug.tsx" fortæller TanStack
 * Router at "$slug" er en URL-parameter, så ruten `/produkt/sah-cap` matcher
 * og leverer { slug: "sah-cap" } til loaderen.
 *
 * Sidens ansvar:
 *   1) Slå produktet op i vores statiske PRODUCTS-array via slug.
 *   2) Hvis intet match → kaste notFound() så Router viser 404.
 *   3) Vise billeder, pris, størrelsesvælger og "Læg i kurv"-knap.
 *   4) Sætte korrekt <title> + meta tags pr. produkt (SEO).
 */
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Heart, Truck, Store, Shield } from "lucide-react";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getProductBySlug, SIZES, type Size } from "@/data/products";
import { cartStore } from "@/hooks/useCart";

export const Route = createFileRoute("/produkt/$slug")({
  // head() kører ved hver navigation og sætter dynamisk titel/meta-tags
  // baseret på det produkt der bliver vist. Det giver bedre SEO og
  // pænere social media share-previews (Open Graph).
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    return {
      meta: [
        { title: product ? `Køb ${product.name} | SPORT 24` : "Produkt | SPORT 24" },
        { name: "description", content: product ? `Køb ${product.name} hos SPORT 24.` : "Produkt hos SPORT 24." },
        { property: "og:title", content: product ? `${product.name} | SPORT 24` : "Produkt | SPORT 24" },
        { property: "og:description", content: product ? `Køb ${product.name} hos SPORT 24.` : "Produkt hos SPORT 24." },
        // Produktbilledet bliver brugt som share-billede – kun hvis det findes
        ...(product ? [{ property: "og:image", content: product.img }, { name: "twitter:image", content: product.img }] : []),
      ],
    };
  },
  // loader() kører før komponenten rendres. Returner-værdien er tilgængelig
  // via Route.useLoaderData() i komponenten.
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound(); // Router fanger og viser notFoundComponent
    return { product };
  },
  component: ProductPage,

  // Vises hvis loaderen kaster notFound() (fx ukendt slug i URL'en)
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

  // Vises hvis loaderen kaster en uventet fejl. `reset()` nulstiller
  // error-boundaryen og `router.invalidate()` tvinger loaderen til at køre igen.
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
  // Henter produktet som loaderen gemte. Type-safe via TanStack Router.
  const { product } = Route.useLoaderData();

  // Lokal UI-state for sidens interaktive elementer:
  const [selectedSize, setSelectedSize] = useState<Size | null>(null); // valgt størrelse
  const [error, setError] = useState(false);   // viser fejl hvis "Læg i kurv" trykkes uden størrelse
  const [added, setAdded] = useState(false);   // viser kort en bekræftelse på knappen

  /**
   * Håndterer klik på "Læg i kurv":
   *  - Hvis produktet har størrelser og ingen er valgt → vis fejl.
   *  - Ellers: tilføj til kurv-store, vis bekræftelse i 1.8s.
   */
  const handleAdd = () => {
    if (product.hasSizes && !selectedSize) {
      setError(true);
      return;
    }
    cartStore.add(1);              // global kurv-tæller +1
    setAdded(true);
    setTimeout(() => setAdded(false), 1800); // skjul bekræftelse efter 1.8s
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-6 py-6">
        {/* Breadcrumb-navigation: forside → kategori → produkt */}
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
          {/* Produktets slug vises også for "designer-feel" – kosmetisk */}
          <span className="font-mono text-xs uppercase text-muted-foreground">{product.slug}</span>
        </nav>

        {/* Grid: galleri til venstre, sticky sidebar med pris/handling til højre */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Billede-galleri – viser to billeder side om side */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="aspect-square w-full overflow-hidden bg-muted">
              {/*
                Hvis produktet har et img2 → vis det. Ellers bruges img igen
                men spejlvendt (scaleX(-1)) for at simulere et "andet vinkel"-billede
                uden at have et reelt sekundærbillede.
              */}
              <img src={product.img2 ?? product.img} alt={product.name} className="h-full w-full object-cover" style={product.img2 ? undefined : { transform: "scaleX(-1)" }} />
            </div>
          </div>

          {/* Sidebar med produkt-info og handlinger. Sticky på desktop, så den
              følger med ned når man scroller i billed-galleriet. */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {product.excluded && (
              <span className="inline-block bg-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-background">
                Undtaget af kampagnen
              </span>
            )}
            <p className="mt-4 text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">{product.name}</h1>

            {/* Stjerne-rating – pt. blot 5 tomme stjerner og "(0)" anmeldelser */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <div className="flex text-muted-foreground">{"★★★★★".split("").map((s, i) => <span key={i}>☆</span>)}</div>
              <span className="text-muted-foreground underline">(0)</span>
            </div>

            {/* Pris + evt. overstreget førpris */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-4xl font-black text-brand-red">{product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">{product.oldPrice}</span>
              )}
            </div>
            {/* Lille "point"-tekst der efterligner et loyalitetsprogram.
                Pointene udregnes som pris/10, afrundet. */}
            <p className="mt-1 text-xs text-muted-foreground">Medlemmer optjener: <span className="font-semibold text-foreground">{Math.round(parseFloat(product.price) / 10)} point</span></p>

            {/* Størrelsesvælger – kun vist hvis produktet har størrelser */}
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
                {/* Lagerstatus-tekst skifter til rød hvis error=true */}
                <p className={`mt-2 text-xs ${error ? "text-brand-red" : "text-muted-foreground"}`}>
                  Lagerstatus online: <span className="font-semibold">{selectedSize ? "På lager" : "Vælg størrelse"}</span>
                </p>
              </div>
            )}

            {/* Køb-handlinger: "Læg i kurv" + favoritter */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 rounded-full bg-brand-red px-6 py-4 text-base font-bold text-white transition hover:opacity-90"
              >
                {/* Knaptekst skifter midlertidigt til bekræftelse efter klik */}
                {added ? "Lagt i kurv ✓" : "Læg i kurv"}
              </button>
              <button
                aria-label="Tilføj til favoritter"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-border hover:bg-muted"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* "USP"-liste nederst i sidebaren: fragt, click&collect, returret */}
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

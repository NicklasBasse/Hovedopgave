/**
 * ProductCarousel.tsx
 * ----------------------------------------------------------------------------
 * En vandret produkt-karrusel der bruges på forsiden til at vise et udvalg
 * af produkter inden for én kategori (fx "Spillertøj" eller "Merchandise").
 *
 * Karrusellen bruger native CSS scroll-snap fremfor et tungt slider-bibliotek:
 *  - `overflow-x-auto` gør containeren scrollbar vandret
 *  - `snap-x snap-mandatory` får produktkortene til at "snappe" på plads
 *  - To pile (forrige/næste) kalder scrollBy() programmatisk for at flytte
 *    indholdet 320px ad gangen. Det giver en let, performant oplevelse.
 *
 * Det første kort i karrusellen er et "lead card" – et stort billede med CTA,
 * der linker videre til oversigtssiden for hele kategorien.
 */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";


// Produkt-type brugt internt af karrusellen. Holdes løsere end Product-typen
// i src/data/products.ts, fordi karrusellen også kan vise "dummy"-produkter
// uden slug (slug er optional → så bliver kortet et almindeligt <a> uden link).
export type Product = {
  slug?: string;
  img: string;
  name: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  excluded?: boolean;
};

// Props til komponenten – alt der gør at samme karrusel kan genbruges
// med forskellig tekst, billeder og produkter.
type Props = {
  title: string;       // Stor overskrift over karrusellen
  count: string;       // Antal produkter, vises i parentes
  subtitle: string;    // Lille undertekst
  products: Product[]; // Selve produkterne
  ctaLabel: string;    // Tekst på lead card-knappen
  ctaHref: string;     // Hvor lead card linker hen
  sideImage: string;   // Billede på lead card
  sideAlt: string;     // Alt-tekst på lead card-billedet
};

export function ProductCarousel({
  title,
  count,
  subtitle,
  products,
  ctaLabel,
  ctaHref,
  sideImage,
  sideAlt,
}: Props) {
  // useRef bruges til at få fat i selve scroll-containeren, så vi kan
  // kalde .scrollBy() når brugeren trykker på pilene.
  const scroller = useRef<HTMLDivElement>(null);

  // Rul karrusellen 320px til højre (1) eller venstre (-1). `behavior: "smooth"`
  // giver en blød animation. Optional chaining (?.) sikrer mod null.
  const scroll = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    // Tricky padding-left: matcher max-width-containerens venstre kant
    // (centreret 1440px layout), men lader karrusellen flyde helt ud i højre.
    <section className="py-14 pl-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] pr-0">
      {/* Overskrift + navigation-pile */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="mr-2">({count})</span>
            {subtitle}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Vis forrige produkter"
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Vis næste produkter"
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Selve scroll-containeren. Inline-style skjuler scrollbaren i Firefox/IE
          mens [&::-webkit-scrollbar]:hidden skjuler den i Chrome/Safari. */}
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Lead card – det første og største kort med CTA */}
        <Link
          to={ctaHref}
          className="group block h-[459px] w-[329px] shrink-0 snap-start"
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={sideImage}
              alt={sideAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-md">
              {ctaLabel}
            </span>
          </div>
        </Link>

        {/* Resten af kortene – ét pr. produkt */}
        {products.map((p, i) => {
          // `card` er JSX-fragmentet selve kortet består af. Vi udtrækker det
          // for at undgå at duplikere JSX i de to grene (Link vs. <a>) nedenfor.
          const card = (
            <>
              <div className="relative w-full flex-1 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Badge vises kun hvis produktet er undtaget kampagnen */}
                {p.excluded && (
                  <span className="absolute left-2 top-2 bg-foreground/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-background">
                    Undtaget af kampagnen
                  </span>
                )}
              </div>

              <p className="mt-3 text-center text-[13px] font-semibold leading-tight">{p.name}</p>
              <div className="mt-1 flex items-baseline justify-center gap-2">
                <span className="text-base font-bold">{p.price}</span>
                {p.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                )}
              </div>
            </>
          );

          // Hvis produktet har en slug → renderes som type-safe TanStack <Link>
          // til produktsiden. Ellers renderes som ikke-interaktiv <div>, så vi
          // undgår "tomme" links (href="#") som forvirrer skærmlæsere og giver
          // dårligere Lighthouse Best-Practices score.
          if (p.slug) {
            return (
              <Link
                key={i}
                to="/produkt/$slug"
                params={{ slug: p.slug }}
                className="group flex h-[459px] w-[329px] shrink-0 snap-start flex-col"
              >
                {card}
              </Link>
            );
          }

          return (
            <div
              key={i}
              className="group flex h-[459px] w-[329px] shrink-0 snap-start flex-col"
            >
              {card}
            </div>
          );
        })}


      </div>
    </section>
  );
}

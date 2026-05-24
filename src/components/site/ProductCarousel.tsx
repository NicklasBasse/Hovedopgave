import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";


export type Product = {
  slug?: string;
  img: string;
  name: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  excluded?: boolean;
};

type Props = {
  title: string;
  count: string;
  subtitle: string;
  products: Product[];
  ctaLabel: string;
  sideImage: string;
  sideAlt: string;
};

export function ProductCarousel({
  title,
  count,
  subtitle,
  products,
  ctaLabel,
  sideImage,
  sideAlt,
}: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="py-14 pl-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] pr-0">
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

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Lead card with side image + CTA */}
        <a
          href="#"
          className="group block h-[459px] w-[329px] shrink-0 snap-start"
        >
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={sideImage}
              alt={sideAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-md">
              Se alt merchandise
            </span>
          </div>
        </a>

        {products.map((p, i) => {
          const card = (
            <>
              <div className="relative w-full flex-1 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
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
            <a
              key={i}
              href="#"
              className="group flex h-[459px] w-[329px] shrink-0 snap-start flex-col"
            >
              {card}
            </a>
          );
        })}


      </div>
    </section>
  );
}

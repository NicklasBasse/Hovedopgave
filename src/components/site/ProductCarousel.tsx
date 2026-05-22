import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export type Product = {
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
    <section className="mx-auto max-w-[1440px] border-l-2 border-foreground/30 px-6 py-6 pl-12">
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
            aria-label="Vis forrige produkter"
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Vis næste produkter"
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
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
          className="group block w-[430px] shrink-0 snap-start"
        >
          <div className="relative h-[430px] w-[430px] overflow-hidden bg-muted">
            <img
              src={sideImage}
              alt={sideAlt}
              width={600}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-4 left-4 right-4 rounded-full bg-background px-4 py-3 text-center text-sm font-semibold text-foreground shadow-md">
              Se alt merchandise
            </span>
          </div>
        </a>

        {products.map((p, i) => (
          <a
            key={i}
            href="#"
            className="group block w-[430px] shrink-0 snap-start"
          >
            <div className="relative h-[430px] w-[430px] overflow-hidden bg-muted">
              <img
                src={p.img}
                alt={p.name}
                width={600}
                height={600}
                loading="lazy"
                className="h-full w-full scale-[1.35] object-contain transition-transform duration-300 group-hover:scale-[1.42]"
              />
              {p.excluded && (
                <span className="absolute left-2 top-2 bg-foreground/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-background z-10">
                  Undtaget af kampagnen
                </span>
              )}
            </div>

            <p className="mt-3 text-center text-sm font-semibold leading-tight">{p.name}</p>
            <div className="mt-1 flex items-baseline justify-center gap-2">
              <span className="text-base font-bold">{p.price}</span>
              {p.oldPrice && (
                <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
              )}
            </div>
          </a>
        ))}


      </div>
    </section>
  );
}

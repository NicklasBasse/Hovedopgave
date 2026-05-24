import { ChevronRight, Heart, ArrowUpDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type CategoryProduct = {
  slug?: string;
  img: string;
  name: string;
  price: string;
  oldPrice?: string;
  excluded?: boolean;
};

export type SubCategory = {
  img: string;
  label: string;
};

type Props = {
  breadcrumb: string;
  title: string;
  count: number;
  subCategories: SubCategory[];
  products: CategoryProduct[];
};

const FILTERS = ["Størrelser", "Køn", "Mærker", "Pris", "Pris Type", "Farver"];

export function CategoryLanding({
  breadcrumb,
  title,
  count,
  subCategories,
  products,
}: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs">
        <a href="/" className="font-semibold uppercase tracking-wide text-foreground underline">
          {breadcrumb}
        </a>
        <ChevronRight className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">{title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{count} produkter</p>

      {/* Subcategory circles */}
      <div className="mt-8 flex flex-wrap gap-8 md:gap-12">
        {subCategories.map((s) => (
          <a key={s.label} href="#" className="group flex flex-col items-center text-center">
            <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-muted md:h-[140px] md:w-[140px]">
              <img
                src={s.img}
                alt={s.label}
                loading="lazy"
                className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="mt-3 text-sm font-semibold">{s.label}</span>
          </a>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              {f}
            </button>
          ))}
        </div>
        <button type="button" className="flex items-center gap-1.5 text-sm font-semibold">
          <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
          Sortering
        </button>
      </div>

      {/* Product grid */}
      <ul className="mt-8 grid list-none grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => {
          const cardInner = (
            <>
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                {p.excluded && (
                  <span className="absolute left-3 top-3 z-10 bg-foreground/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-background">
                    Undtaget af kampagnen
                  </span>
                )}
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-sm font-semibold leading-tight">{p.name}</p>
              <div className="mt-1 flex items-baseline justify-center gap-2">
                <span className="text-base font-bold">{p.price}</span>
                {p.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">{p.oldPrice}</span>
                )}
              </div>
            </>
          );

          return (
            <li key={i} className="relative flex flex-col">
              {/* Heart button is a sibling of the link to avoid nested interactive
                  elements (invalid HTML, breaks tab order). It follows the link
                  in DOM order so keyboard users hit the product link first. */}
              {p.slug ? (
                <Link
                  to="/produkt/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col"
                  aria-label={`${p.name} – ${p.price}`}
                >
                  {cardInner}
                </Link>
              ) : (
                <div className="group flex flex-col">{cardInner}</div>
              )}
              <button
                type="button"
                aria-label={`Tilføj ${p.name} til favoritter`}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background"
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

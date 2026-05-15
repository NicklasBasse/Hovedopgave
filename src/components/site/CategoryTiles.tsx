import jersey from "@/assets/ach/tile-jersey.png";
import merch from "@/assets/ach/tile-merch.png";
import logo from "@/assets/ach/tile-logo.png";

const TILES = [
  { src: jersey, label: "Spillertrøjer" },
  { src: merch, label: "Merchandise" },
  { src: logo, label: "Se alt ACH" },
];

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20">
      <div className="grid grid-cols-3 gap-10 md:gap-20">
        {TILES.map((t) => (
          <a key={t.label} href="#" className="group flex flex-col items-center text-center">
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-muted">
              <img
                src={t.src}
                alt={t.label}
                width={600}
                height={600}
                loading="lazy"
                className="h-3/5 w-3/5 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="mt-6 text-base font-semibold md:text-lg">{t.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import jersey from "@/assets/ach/tile-sah-v3.webp";
import merch from "@/assets/ach/tile-merch-v2.webp";
import logo from "@/assets/ach/tile-logo-v2.webp";

const TILES = [
  { src: jersey, label: "Spillertøj", to: "/spillertoj" },
  { src: merch, label: "Merchandise", to: "/merchandise" },
  { src: logo, label: "Se alt SAH", to: "/se-alt-sah" },
] as const;

export function CategoryTiles() {
  return (
    <section className="py-20 pl-6">
      <div className="flex flex-wrap justify-center gap-10 md:gap-20">
        {TILES.map((t) => (
          <Link key={t.label} to={t.to} className="group flex flex-col items-center text-center">
            <div className="flex h-[224px] w-[224px] items-center justify-center overflow-hidden rounded-full bg-muted">
              <img
                src={t.src}
                alt={t.label}
                width={600}
                height={600}
                loading="lazy"
                className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="mt-6 text-base font-semibold md:text-lg">{t.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

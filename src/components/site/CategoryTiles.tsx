/**
 * CategoryTiles.tsx
 * ----------------------------------------------------------------------------
 * Tre store runde "fliser" der vises på forsiden under hero-billedet. Hver
 * flise linker til én af de tre kategori-undersider (spillertøj, merchandise,
 * se alt SAH). Komponentens design er bevidst minimalt: store cirkulære
 * billeder + label nedenunder – så det fungerer som en visuelt drevet menu.
 */
import { Link } from "@tanstack/react-router";
import jersey from "@/assets/ach/tile-sah-v3.webp";
import merch from "@/assets/ach/tile-merch-v2.webp";
import logo from "@/assets/ach/tile-logo-v2.webp";

// Konfiguration af fliserne. `as const` gør hele arrayet read-only og giver
// TypeScript de strammest mulige typer for `to`-feltet (literal strings).
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
          // `group` på linket gør at billedet kan zoome ind via group-hover:scale-105
          <Link key={t.label} to={t.to} className="group flex flex-col items-center text-center">
            <div className="flex h-[224px] w-[224px] items-center justify-center overflow-hidden rounded-full bg-muted">
              <img
                src={t.src}
                alt=""
                aria-hidden="true"
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
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

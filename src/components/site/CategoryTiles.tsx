/**
 * CategoryTiles.tsx
 * ----------------------------------------------------------------------------
 * Tre store runde "fliser" der vises på forsiden under hero-billedet. Hver
 * flise linker til én af de tre kategori-undersider (spillertøj, merchandise,
 * se alt SAH). Komponentens design er bevidst minimalt: store cirkulære
 * billeder + label nedenunder – så det fungerer som en visuelt drevet menu.
 */
import { Link } from "@tanstack/react-router";
import jersey from "@/assets/sah/tile-sah-spillertoj.webp";
import merch from "@/assets/sah/tile-sah-merchandise.webp";
import logo from "@/assets/sah/tile-sah-logo.webp";

// Konfiguration af fliserne. `as const` gør hele arrayet read-only og giver
// TypeScript de strammest mulige typer for `to`-feltet (literal strings).
const TILES = [
  { src: jersey, label: "Spillertøj", to: "/spillertoj", alt: "SAH spillertrøje – officielt kamptøj" },
  { src: merch, label: "Merchandise", to: "/merchandise", alt: "SAH merchandise – fan-kollektion" },
  { src: logo, label: "Alt fra SAH", to: "/se-alt-sah", alt: "Skanderborg AGF Håndbold klublogo" },
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
                alt={t.alt}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${
                  t.label === "Alt fra SAH" ? "object-contain p-4" : "object-cover"
                }`}
              />
            </div>
            <span className="mt-6 text-base font-semibold md:text-lg">{t.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Hero.tsx
 * ----------------------------------------------------------------------------
 * Det store "hero"-billede øverst på forsiden. Indeholder et baggrundsbillede
 * med en mørk gradient ovenpå (for at sikre tekst-læsbarhed) samt et tekstblok
 * med titel, undertekst og tre call-to-action knapper.
 *
 * Vi bruger `aspect-[21/9]` for at billedet altid har samme proportioner
 * uanset skærmstørrelse — det forhindrer at sidens layout "hopper" når
 * billedet loader (Cumulative Layout Shift / CLS).
 *
 * For at undgå at mobil-brugere downloader 1920px-versionen (Lighthouse:
 * "Improve image delivery", 146 KiB savings) bruger vi `vite-imagetools`
 * til at generere flere størrelser ved build-time. Browseren vælger
 * automatisk den mindste billed-størrelse der dækker dens viewport via
 * `srcset` + `sizes`.
 */
import { Link } from "@tanstack/react-router";
// ?w=640;960;1280;1920&format=webp&as=srcset → vite-imagetools genererer
// fire varianter af samme billede og returnerer en færdig srcset-streng.
import heroSrcset from "@/assets/ach/hero-sah-studio.webp?w=640;960;1280;1920&format=webp&as=srcset";
// Fallback `src` for browsere uden srcset-support (også den vi preloader).
import heroImg from "@/assets/ach/hero-sah-studio.webp?w=1280&format=webp";

export function Hero() {
  return (
    <section className="relative w-full">
      {/* sr-only h1 – skjult visuelt, men hjælper SEO og skærmlæsere */}
      <h1 className="sr-only">AC Horsens forside</h1>
      <div className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[21/8]">
        {/*
          LCP-billedet (Largest Contentful Paint):
          - srcSet + sizes      → browser henter mindste passende variant
          - loading="eager"     → indlæs straks, ikke lazy
          - fetchpriority="high"→ browseren prioriterer download
          - decoding="async"    → blokerer ikke main thread under dekodning
          Disse forbedrer Lighthouse-performance markant.
        */}
        <img
          src={heroImg}
          srcSet={heroSrcset}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
          alt="AC Horsens topbillede 2025"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {/* Mørk overlay-gradient – forbedrer kontrast på tekst nederst til venstre */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Tekstblok placeret absolut over billedet */}
        <div className="absolute bottom-8 left-4 max-w-[640px] text-white md:bottom-16 md:left-16">
          <p className="text-xs font-bold uppercase tracking-wider md:text-sm">
            Skanderborg agf håndbold
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] md:text-5xl lg:text-4xl">
            BYENS BEDSTE<br />SAH's nye merchandise kollektion
          </h2>
          <p className="mt-4 text-sm md:text-base">
            Ny merchandise kollektion til at skabe lokal stolthed og fællesskab
          </p>
          {/* Tre CTA-knapper der linker til hver af de tre kategori-undersider */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/spillertoj"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Spillertøj
            </Link>
            <Link
              to="/merchandise"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Merch
            </Link>
            <Link
              to="/se-alt-sah"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Se alt SAH
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

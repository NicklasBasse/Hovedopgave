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
// vite-imagetools genererer flere størrelser + formater.
// AVIF er ~30-50% mindre end WebP ved samme visuelle kvalitet → bedre Website Carbon.
import heroAvifSet from "@/assets/sah/hero-sah-studio.webp?w=480;800;1920&format=avif&as=srcset";
import heroWebpSet from "@/assets/sah/hero-sah-studio.webp?w=480;800;1920&format=webp&as=srcset";
import heroImg from "@/assets/sah/hero-sah-studio.webp?w=1280&format=webp";

export function Hero() {
  return (
    <section className="relative w-full">
      {/* sr-only h1 – skjult visuelt, men hjælper SEO og skærmlæsere */}
      <h1 className="sr-only">AC Horsens forside</h1>
      {/*
        Højde: På mobil bruger vi et højere format (4/5) så billedet fylder mere
        og der er plads til hele tekstblokken nederst. På desktop holder vi
        det panorama-agtige 21/8 format.
      */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[21/8]">
        <picture className="contents">
        {/* display:contents → picture forsvinder fra layout, img udfylder forælder */}
          <source type="image/avif" srcSet={heroAvifSet} sizes="100vw" />
          <source type="image/webp" srcSet={heroWebpSet} sizes="100vw" />
          <img
            src={heroImg}
            alt="AC Horsens topbillede 2025"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        {/* Mørk gradient nedefra på mobil (læsbarhed), fra venstre på desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/50 md:via-transparent md:to-transparent" />

        {/* Tekstblok – fuld bredde på mobil, venstre-justeret på desktop */}
        <div className="absolute bottom-5 left-4 right-4 max-w-[640px] text-white md:bottom-16 md:left-16 md:right-auto">
          <p className="text-[10px] font-bold uppercase tracking-wider md:text-sm">
            Skanderborg agf håndbold
          </p>
          <h2 className="mt-2 text-xl font-extrabold leading-[1.1] sm:text-2xl md:mt-3 md:text-5xl lg:text-4xl">
            BYENS BEDSTE<br />SAH's nye merchandise kollektion
          </h2>
          <p className="mt-2 text-xs md:mt-4 md:text-base">
            Ny merchandise kollektion til at skabe lokal stolthed og fællesskab
          </p>
          <div className="mt-3 flex flex-wrap gap-2 md:mt-6 md:gap-3">
            <Link
              to="/spillertoj"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/90 md:px-6 md:py-3 md:text-sm"
            >
              Spillertøj
            </Link>
            <Link
              to="/merchandise"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/90 md:px-6 md:py-3 md:text-sm"
            >
              Merch
            </Link>
            <Link
              to="/se-alt-sah"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-white/90 md:px-6 md:py-3 md:text-sm"
            >
              Se alt SAH
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/**
 * SplitFeature.tsx
 * ----------------------------------------------------------------------------
 * Genbrugelig "split"-sektion: et stort billede på den ene halvdel og
 * tekst+CTA på den anden. Bruges på forsiden til at fremhæve historier eller
 * udvalgte kategorier.
 *
 * `imageSide`-prop'en gør komponenten fleksibel: vi kan veksle mellem at
 * billedet er til venstre eller højre, så flere SplitFeature-sektioner på
 * stribe ikke ser ensformige ud. Dette opnås med Tailwinds order-utilities
 * via en betinget className.
 */
import { Link } from "@tanstack/react-router";

type Props = {
  image: string;       // Billedets URL
  imageAlt: string;    // Tilgængelighed: beskrivende alt-tekst
  eyebrow: string;     // Lille label over titlen
  title: string;       // Stor overskrift
  body: string;        // Brødtekst
  ctaLabel: string;    // Knaptekst
  ctaHref: string;     // Rute knappen linker til
  imageSide: "left" | "right";
};

export function SplitFeature({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  imageSide,
}: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-14">
      {/*
        Hvis billedet skal være til højre, bytter vi om på rækkefølgen af
        børnene via Tailwinds [&>div:first-child]:order-1 og :last-child:order-2.
        På den måde behøver vi ikke duplikere JSX'en.
      */}
      <div
        className={`grid items-center gap-10 md:grid-cols-2 ${
          imageSide === "right" ? "md:[&>div:first-child]:order-1 md:[&>div:last-child]:order-2" : ""
        }`}
      >
        <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
          <img
            src={image}
            alt={imageAlt}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">{body}</p>
          <Link
            to={ctaHref}
            className="mt-7 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

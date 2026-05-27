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
  image: string;       // Billedets URL (fallback)
  imageSrcset?: string; // Responsive WebP srcset
  imageAvifSrcset?: string; // Responsive AVIF srcset (~40% mindre end WebP)
  imageAlt: string;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSide: "left" | "right";
};

export function SplitFeature({
  image,
  imageSrcset,
  imageAvifSrcset,
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
      <div
        className={`grid items-center gap-10 md:grid-cols-2 ${
          imageSide === "right" ? "md:[&>div:first-child]:order-1 md:[&>div:last-child]:order-2" : ""
        }`}
      >
        <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
          <picture className="contents">
            {imageAvifSrcset && (
              <source type="image/avif" srcSet={imageAvifSrcset} sizes="(max-width: 768px) 100vw, 50vw" />
            )}
            {imageSrcset && (
              <source type="image/webp" srcSet={imageSrcset} sizes="(max-width: 768px) 100vw, 50vw" />
            )}
            <img
              src={image}
              alt={imageAlt}
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
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

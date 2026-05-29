/**
 * MerchandiseSplit.tsx
 * ----------------------------------------------------------------------------
 * Dedikeret, ren HTML+CSS-udgave af sektionen "Håndbold merchandise med
 * stolthed". Erstatter den genbrugelige SplitFeature kun her, uden at ændre
 * layout eller udseende. Bruger TanStack Link så client-side navigation
 * bevares (renderes som et standard <a> i DOM).
 */
import { Link } from "@tanstack/react-router";
import "./MerchandiseSplit.css";

type Props = {
  image: string;
  imageSrcset?: string;
  imageAvifSrcset?: string;
  imageAlt: string;
};

export function MerchandiseSplit({ image, imageSrcset, imageAvifSrcset, imageAlt }: Props) {
  return (
    <section className="ms-section">
      <div className="ms-grid">
        <div className="ms-image">
          <picture>
            {imageAvifSrcset && (
              <source type="image/avif" srcSet={imageAvifSrcset} sizes="(max-width: 768px) 100vw, 50vw" />
            )}
            {imageSrcset && (
              <source type="image/webp" srcSet={imageSrcset} sizes="(max-width: 768px) 100vw, 50vw" />
            )}
            <img src={image} alt={imageAlt} width={1920} height={1080} loading="lazy" decoding="async" />
          </picture>
        </div>
        <div className="ms-text">
          <p className="ms-eyebrow">sah MERCHANDISE</p>
          <h2 className="ms-title">Håndbold merchandise med stolthed</h2>
          <p className="ms-body">
            For dig, der elsker fællesskabet og stemningen på lægterne. Vi har designet en fan-linje
            med et helt unikt SAH-mønster, der binder fans, spillere og frivillige sammen i én stærk
            enhed. Det markante design gør det nemt at genkende andre fans ude i bybilledet, og det
            fungerer som den perfekte anledning til at falde i snak om holdet.
          </p>
          <Link to="/se-alt-sah" className="ms-cta">
            Bliv en del af holdet
          </Link>
        </div>
      </div>
    </section>
  );
}

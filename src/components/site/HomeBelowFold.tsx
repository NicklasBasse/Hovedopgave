/**
 * HomeBelowFold.tsx
 * ----------------------------------------------------------------------------
 * Samler alt indhold UNDER hero-billedet på forsiden i én komponent, så hele
 * sektionen (inkl. de mange produkt-billed-imports) kan lazy-loades samlet.
 * Det holder den initiale JS-bundle minimal — særligt vigtigt på mobil hvor
 * netværk og CPU er svagere (Lighthouse mobil: "Reduce unused JavaScript").
 */
import { CategoryTiles } from "@/components/site/CategoryTiles";
import { ProductCarousel, type Product } from "@/components/site/ProductCarousel";
import { SplitFeature } from "@/components/site/SplitFeature";
import { ClosingHeading } from "@/components/site/ClosingHeading";
import { SiteFooter } from "@/components/site/SiteFooter";

// SplitFeature-baggrundsbilleder: vises i halv viewport bredde på desktop,
// fuld bredde på mobil. Vi importerer både en lille fallback og et srcset
// så mobil-browsere kun henter ~640-960px-versionen.
import sectionLeft from "@/assets/ach/section-left-new.webp?w=960&format=webp";
import sectionLeftSet from "@/assets/ach/section-left-new.webp?w=640;960;1280;1600&format=webp&as=srcset";
import sectionRight from "@/assets/ach/section-right-new.webp?w=960&format=webp";
import sectionRightSet from "@/assets/ach/section-right-new.webp?w=640;960;1280;1600&format=webp&as=srcset";
// Karrusel "lead card"-billeder. Vises i en fast 329px bred container,
// så 600px-varianten dækker selv på Retina-skærme.
import side1 from "@/assets/ach/carousel-side-sah.webp?w=600&format=webp";
import side1Set from "@/assets/ach/carousel-side-sah.webp?w=400;600;900&format=webp&as=srcset";
import side2 from "@/assets/ach/carousel-side-2.webp?w=600&format=webp";
import side2Set from "@/assets/ach/carousel-side-2.webp?w=400;600;900&format=webp&as=srcset";

// Produktbilleder til karrusellerne — small fallback + responsive srcset.
import pAway from "@/assets/ach/p-away-sah.webp?w=400&format=webp";
import pAwaySet from "@/assets/ach/p-away-sah.webp?w=300;600;900&format=webp&as=srcset";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp?w=400&format=webp";
import pAwayKidsSet from "@/assets/ach/p-away-kids-sah.webp?w=300;600;900&format=webp&as=srcset";
import pAwayKidsJersey from "@/assets/ach/p-away-kids-sah-jersey.webp?w=400&format=webp";
import pAwayKidsJerseySet from "@/assets/ach/p-away-kids-sah-jersey.webp?w=300;600;900&format=webp&as=srcset";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp?w=400&format=webp";
import pBallBlueSet from "@/assets/ach/p-ball-blue-new.webp?w=300;600;900&format=webp&as=srcset";
import pBootbag from "@/assets/ach/p-bootbag-new.webp?w=400&format=webp";
import pBootbagSet from "@/assets/ach/p-bootbag-new.webp?w=300;600;900&format=webp&as=srcset";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp?w=400&format=webp";
import pBallGreenSet from "@/assets/ach/p-ball-green-new.webp?w=300;600;900&format=webp&as=srcset";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp?w=400&format=webp";
import pBallYellowSet from "@/assets/ach/p-ball-yellow-new.webp?w=300;600;900&format=webp&as=srcset";
import pBlanket from "@/assets/ach/p-blanket-new.webp?w=400&format=webp";
import pBlanketSet from "@/assets/ach/p-blanket-new.webp?w=300;600;900&format=webp&as=srcset";
import pHome from "@/assets/ach/p-home-jersey.webp?w=400&format=webp";
import pHomeSet from "@/assets/ach/p-home-jersey.webp?w=300;600;900&format=webp&as=srcset";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp?w=400&format=webp";
import pShortsKidsSet from "@/assets/ach/p-shorts-kids.webp?w=300;600;900&format=webp&as=srcset";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp?w=400&format=webp";
import pShortsKids2526Set from "@/assets/ach/p-shorts-kids-2526.webp?w=300;600;900&format=webp&as=srcset";
import pSocksBlack from "@/assets/ach/p-socks-black.webp?w=400&format=webp";
import pSocksBlackSet from "@/assets/ach/p-socks-black.webp?w=300;600;900&format=webp&as=srcset";
import pSocksWhite from "@/assets/ach/p-socks-white.webp?w=400&format=webp";
import pSocksWhiteSet from "@/assets/ach/p-socks-white.webp?w=300;600;900&format=webp&as=srcset";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp?w=400&format=webp";
import pSocksYellowSet from "@/assets/ach/p-socks-yellow.webp?w=300;600;900&format=webp&as=srcset";
import pShorts from "@/assets/ach/p-shorts.webp?w=400&format=webp";
import pShortsSet from "@/assets/ach/p-shorts.webp?w=300;600;900&format=webp&as=srcset";

const focusProducts: Product[] = [
  { slug: "sah-udebanetroje-25", img: pAway, srcset: pAwaySet, name: "SAH t-shirt", price: "150 kr." },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, srcset: pAwayKidsSet, name: "​SAH hoodie", price: "250 kr." },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, srcset: pBallBlueSet, name: "SAH bøllehat", price: "250 kr." },
  { slug: "sah-stovlepose", img: pBootbag, srcset: pBootbagSet, name: "SAH cap", price: "175 kr." },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, srcset: pBallGreenSet, name: "SAH halstørklæde", price: "175 kr." },
  { slug: "sah-fodbold-gul", img: pBallYellow, srcset: pBallYellowSet, name: "SAH håndklæde", price: "250 kr." },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, srcset: pBlanketSet, name: "SAH flag", price: "175 kr." },
];

const jerseyProducts: Product[] = [
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, srcset: pShortsKidsSet, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, srcset: pAwayKidsJerseySet, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, srcset: pHomeSet, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, srcset: pSocksBlackSet, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, srcset: pSocksWhiteSet, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, srcset: pSocksYellowSet, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, srcset: pShortsKids2526Set, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, srcset: pShortsSet, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
];

export default function HomeBelowFold() {
  return (
    <>
      <CategoryTiles />

      <ProductCarousel
        title="SAH nye merchandise kollektion"
        count="7 produkter"
        subtitle="Stå bag klubben - med din støtte skaber vi store øjeblikke både på og uden for banen."
        products={focusProducts}
        ctaLabel="Se alt merchandise"
        ctaHref="/merchandise"
        sideImage={side1}
        sideImageSrcset={side1Set}
        sideAlt="ACH produkter i fokus"
      />

      <SplitFeature
        imageSide="left"
        image={sectionLeft}
        imageSrcset={sectionLeftSet}
        imageAlt="Merchandise"
        eyebrow="Merchandise"
        title="SAH merchandise til din hverdag"
        body="Vores nye streetwear-linje er skåret helt ind til benet, så du kan bære din stolthed med stil. Vi har skabt et rent og minimalistisk design, der passer perfekt ind i din hverdagsgarderobe – uanset om du er på studiet, caféen eller i hallen. Med en diskret hyldest til holdet kan du mærke fællesskabet og vise, hvem du holder med, uden at gå på kompromis med dit personlige udtryk."
        ctaLabel="Oplev hverdags-looket"
        ctaHref="/merchandise"
      />

      <ProductCarousel
        title="SAH Spillertøj"
        count="8 produkter"
        subtitle="Skanderborg AGF Håndbold - klædt i blå og hvid, skabt til kamp og fællesskab!"
        products={jerseyProducts}
        ctaLabel="Find din spillertrøje her"
        ctaHref="/spillertoj"
        sideImage={side2}
        sideImageSrcset={side2Set}
        sideAlt="ACH Spillertøj"
      />

      <SplitFeature
        imageSide="right"
        image={sectionRight}
        imageSrcset={sectionRightSet}
        imageAlt="ACH Merchandise"
        eyebrow="sah MERCHANDISE"
        title="Håndbold merchandise med stolthed"
        body="For dig, der elsker fællesskabet og stemningen på lægterne. Vi har designet en fan-linje med et helt unikt SAH-mønster, der binder fans, spillere og frivillige sammen i én stærk enhed. Det markante design gør det nemt at genkende andre fans ude i bybilledet, og det fungerer som den perfekte anledning til at falde i snak om holdet."
        ctaLabel="Bliv en del af holdet"
        ctaHref="/se-alt-sah"
      />

      <ClosingHeading />
      <SiteFooter />
    </>
  );
}

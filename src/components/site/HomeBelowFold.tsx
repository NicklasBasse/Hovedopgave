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

// SplitFeature-baggrundsbilleder. AVIF + WebP for ~40% mindre payload.
import sectionLeft from "@/assets/sah/sah-merchandise-hverdag.webp?w=640&format=webp";
import sectionLeftSetWebp from "@/assets/sah/sah-merchandise-hverdag.webp?w=480;800&format=webp&as=srcset";
import sectionLeftSetAvif from "@/assets/sah/sah-merchandise-hverdag.webp?w=480;800&format=avif&as=srcset";
import sectionRight from "@/assets/sah/sah-fan-stemning.webp?w=640&format=webp";
import sectionRightSetWebp from "@/assets/sah/sah-fan-stemning.webp?w=480;800&format=webp&as=srcset";
import sectionRightSetAvif from "@/assets/sah/sah-fan-stemning.webp?w=480;800&format=avif&as=srcset";
// Karrusel lead-card billeder
import side1 from "@/assets/sah/sah-merchandise-kollektion.webp?w=320&format=webp";
import side1SetWebp from "@/assets/sah/sah-merchandise-kollektion.webp?w=320;480&format=webp&as=srcset";
import side1SetAvif from "@/assets/sah/sah-merchandise-kollektion.webp?w=320;480&format=avif&as=srcset";
import side2 from "@/assets/sah/sah-spillertoj-kollektion.webp?w=320&format=webp";
import side2SetWebp from "@/assets/sah/sah-spillertoj-kollektion.webp?w=320;480&format=webp&as=srcset";
import side2SetAvif from "@/assets/sah/sah-spillertoj-kollektion.webp?w=320;480&format=avif&as=srcset";

// Produktbilleder til karrusellerne — small fallback + responsive srcset.
import pAway from "@/assets/sah/p-away-sah.webp?w=320&format=webp";
import pAwaySet from "@/assets/sah/p-away-sah.webp?w=240;480&format=webp&as=srcset";
import pAwaySetAvif from "@/assets/sah/p-away-sah.webp?w=240;480&format=avif&as=srcset";
import pAwayKids from "@/assets/sah/p-away-kids-sah.webp?w=320&format=webp";
import pAwayKidsSet from "@/assets/sah/p-away-kids-sah.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsSetAvif from "@/assets/sah/p-away-kids-sah.webp?w=240;480&format=avif&as=srcset";
import pAwayKidsJersey from "@/assets/sah/p-away-kids-sah-jersey.webp?w=320&format=webp";
import pAwayKidsJerseySet from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsJerseySetAvif from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=avif&as=srcset";
import pBallBlue from "@/assets/sah/p-ball-blue-new.webp?w=320&format=webp";
import pBallBlueSet from "@/assets/sah/p-ball-blue-new.webp?w=240;480&format=webp&as=srcset";
import pBallBlueSetAvif from "@/assets/sah/p-ball-blue-new.webp?w=240;480&format=avif&as=srcset";
import pBootbag from "@/assets/sah/p-bootbag-new.webp?w=320&format=webp";
import pBootbagSet from "@/assets/sah/p-bootbag-new.webp?w=240;480&format=webp&as=srcset";
import pBootbagSetAvif from "@/assets/sah/p-bootbag-new.webp?w=240;480&format=avif&as=srcset";
import pBallGreen from "@/assets/sah/p-ball-green-new.webp?w=320&format=webp";
import pBallGreenSet from "@/assets/sah/p-ball-green-new.webp?w=240;480&format=webp&as=srcset";
import pBallGreenSetAvif from "@/assets/sah/p-ball-green-new.webp?w=240;480&format=avif&as=srcset";
import pBallYellow from "@/assets/sah/p-ball-yellow-new.webp?w=320&format=webp";
import pBallYellowSet from "@/assets/sah/p-ball-yellow-new.webp?w=240;480&format=webp&as=srcset";
import pBallYellowSetAvif from "@/assets/sah/p-ball-yellow-new.webp?w=240;480&format=avif&as=srcset";
import pBlanket from "@/assets/sah/p-blanket-new.webp?w=320&format=webp";
import pBlanketSet from "@/assets/sah/p-blanket-new.webp?w=240;480&format=webp&as=srcset";
import pBlanketSetAvif from "@/assets/sah/p-blanket-new.webp?w=240;480&format=avif&as=srcset";
import pHome from "@/assets/sah/p-home-jersey.webp?w=320&format=webp";
import pHomeSet from "@/assets/sah/p-home-jersey.webp?w=240;480&format=webp&as=srcset";
import pHomeSetAvif from "@/assets/sah/p-home-jersey.webp?w=240;480&format=avif&as=srcset";
import pShortsKids from "@/assets/sah/p-shorts-kids.webp?w=320&format=webp";
import pShortsKidsSet from "@/assets/sah/p-shorts-kids.webp?w=240;480&format=webp&as=srcset";
import pShortsKidsSetAvif from "@/assets/sah/p-shorts-kids.webp?w=240;480&format=avif&as=srcset";
import pShortsKids2526 from "@/assets/sah/p-shorts-kids-2526.webp?w=320&format=webp";
import pShortsKids2526Set from "@/assets/sah/p-shorts-kids-2526.webp?w=240;480&format=webp&as=srcset";
import pShortsKids2526SetAvif from "@/assets/sah/p-shorts-kids-2526.webp?w=240;480&format=avif&as=srcset";
import pSocksBlack from "@/assets/sah/p-socks-black.webp?w=320&format=webp";
import pSocksBlackSet from "@/assets/sah/p-socks-black.webp?w=240;480&format=webp&as=srcset";
import pSocksBlackSetAvif from "@/assets/sah/p-socks-black.webp?w=240;480&format=avif&as=srcset";
import pSocksWhite from "@/assets/sah/p-socks-white.webp?w=320&format=webp";
import pSocksWhiteSet from "@/assets/sah/p-socks-white.webp?w=240;480&format=webp&as=srcset";
import pSocksWhiteSetAvif from "@/assets/sah/p-socks-white.webp?w=240;480&format=avif&as=srcset";
import pSocksYellow from "@/assets/sah/p-socks-yellow.webp?w=320&format=webp";
import pSocksYellowSet from "@/assets/sah/p-socks-yellow.webp?w=240;480&format=webp&as=srcset";
import pSocksYellowSetAvif from "@/assets/sah/p-socks-yellow.webp?w=240;480&format=avif&as=srcset";
import pShorts from "@/assets/sah/p-shorts.webp?w=320&format=webp";
import pShortsSet from "@/assets/sah/p-shorts.webp?w=240;480&format=webp&as=srcset";
import pShortsSetAvif from "@/assets/sah/p-shorts.webp?w=240;480&format=avif&as=srcset";

const focusProducts: Product[] = [
  { slug: "sah-udebanetroje-25", img: pAway, srcset: pAwaySet, avifSrcset: pAwaySetAvif, name: "SAH t-shirt", price: "150 kr." },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, srcset: pAwayKidsSet, avifSrcset: pAwayKidsSetAvif, name: "​SAH hoodie", price: "250 kr." },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, srcset: pBallBlueSet, avifSrcset: pBallBlueSetAvif, name: "SAH bøllehat", price: "250 kr." },
  { slug: "sah-stovlepose", img: pBootbag, srcset: pBootbagSet, avifSrcset: pBootbagSetAvif, name: "SAH cap", price: "175 kr." },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, srcset: pBallGreenSet, avifSrcset: pBallGreenSetAvif, name: "SAH halstørklæde", price: "175 kr." },
  { slug: "sah-fodbold-gul", img: pBallYellow, srcset: pBallYellowSet, avifSrcset: pBallYellowSetAvif, name: "SAH håndklæde", price: "250 kr." },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, srcset: pBlanketSet, avifSrcset: pBlanketSetAvif, name: "SAH flag", price: "175 kr." },
];

const jerseyProducts: Product[] = [
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, srcset: pShortsKidsSet, avifSrcset: pShortsKidsSetAvif, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, srcset: pAwayKidsJerseySet, avifSrcset: pAwayKidsJerseySetAvif, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true },
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, srcset: pHomeSet, avifSrcset: pHomeSetAvif, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, srcset: pSocksBlackSet, avifSrcset: pSocksBlackSetAvif, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, srcset: pSocksWhiteSet, avifSrcset: pSocksWhiteSetAvif, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, srcset: pSocksYellowSet, avifSrcset: pSocksYellowSetAvif, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, srcset: pShortsKids2526Set, avifSrcset: pShortsKids2526SetAvif, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, srcset: pShortsSet, avifSrcset: pShortsSetAvif, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true },
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
        sideImageSrcset={side1SetWebp}
        sideImageAvifSrcset={side1SetAvif}
        sideAlt="SAH merchandise-kollektion præsenteret på model"
      />

      <SplitFeature
        imageSide="left"
        image={sectionLeft}
        imageSrcset={sectionLeftSetWebp}
        imageAvifSrcset={sectionLeftSetAvif}
        imageAlt="SAH streetwear merchandise til hverdagsbrug"
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
        sideImageSrcset={side2SetWebp}
        sideImageAvifSrcset={side2SetAvif}
        sideAlt="SAH spillertøj-kollektion 25/26"
      />

      <SplitFeature
        imageSide="right"
        image={sectionRight}
        imageSrcset={sectionRightSetWebp}
        imageAvifSrcset={sectionRightSetAvif}
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

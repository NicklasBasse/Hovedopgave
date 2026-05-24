import { createFileRoute } from "@tanstack/react-router";
import { PromoBar } from "@/components/site/PromoBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { IntroBlock } from "@/components/site/IntroBlock";
import { CategoryTiles } from "@/components/site/CategoryTiles";
import { ProductCarousel, type Product } from "@/components/site/ProductCarousel";
import { SplitFeature } from "@/components/site/SplitFeature";
import { ClosingHeading } from "@/components/site/ClosingHeading";
import { SiteFooter } from "@/components/site/SiteFooter";

import sectionLeft from "@/assets/ach/section-left-new.webp";
import sectionRight from "@/assets/ach/section-right-new.webp";
import side1 from "@/assets/ach/carousel-side-sah.webp";
import side2 from "@/assets/ach/carousel-side-2.jpg";

import pAway from "@/assets/ach/p-away-sah.webp";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import pBootbag from "@/assets/ach/p-bootbag-new.webp";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp";
import pBlanket from "@/assets/ach/p-blanket-new.webp";
import pSweatshirt from "@/assets/ach/p-sweatshirt.jpg";
import pUmbrella from "@/assets/ach/p-umbrella.jpg";
import pCap from "@/assets/ach/p-cap.jpg";
import pHome from "@/assets/ach/p-home-jersey.webp";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp";
import pSocksBlack from "@/assets/ach/p-socks-black.webp";
import pSocksWhite from "@/assets/ach/p-socks-white.webp";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp";
import pShorts from "@/assets/ach/p-shorts.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AC Horsens Shop | SPORT 24" },
      {
        name: "description",
        content:
          "Køb officielt AC Horsens spillertøj og merchandise hos SPORT 24. Hjemmebanetrøjer, merchandise, fodbolde og fan-merch.",
      },
      { property: "og:title", content: "AC Horsens Shop | SPORT 24" },
      {
        property: "og:description",
        content: "Officielt AC Horsens spillertøj og merchandise hos SPORT 24.",
      },
    ],
  }),
  component: Index,
});

const focusProducts: Product[] = [
  { slug: "sah-udebanetroje-25", img: pAway, name: "SAH t-shirt", price: "150 kr." },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, name: "​SAH hoodie", price: "250 kr." },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, name: "SAH bøllehat", price: "200 kr.", oldPrice: "250 kr.", badge: "KLUBPRIS - SPAR 20%" },
  { slug: "sah-stovlepose", img: pBootbag, name: "AC Horsens Støvlepose", price: "100 kr.", oldPrice: "125 kr.", badge: "KLUBPRIS - SPAR 20%" },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, name: "SAH bøllehat", price: "200 kr.", oldPrice: "250 kr.", badge: "KLUBPRIS - SPAR 20%" },
  { slug: "sah-fodbold-gul", img: pBallYellow, name: "AC Horsens Fodbold", price: "72,80 kr.", oldPrice: "130 kr.", badge: "KLUBPRIS - SPAR 44%" },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, name: "AC Horsens 130x160 Fleecetæppe", price: "200 kr." },
];

const jerseyProducts: Product[] = [
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, name: "AC Horsens Hjemmebaneshorts 24/25 Børn", price: "245 kr.", excluded: true },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, name: "AC Horsens 23/24 Merchandise Børn", price: "420 kr.", excluded: true },
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, name: "AC Horsens Hjemmebanetrøje 25/26", price: "455 kr.", excluded: true },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, name: "AC Horsens Merchandise Strømper 2024", price: "50 kr.", excluded: true },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, name: "AC Horsens Merchandise Strømper 25", price: "65 kr.", excluded: true },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, name: "AC Horsens Hjemmebanestrømper 25/26", price: "105 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, name: "AC Horsens Hjemmebaneshorts 25/26 Børn", price: "260 kr.", excluded: true },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, name: "AC Horsens Hjemmebaneshorts 25/26", price: "300 kr.", excluded: true },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />
      <main>
        <Hero />
        <CategoryTiles />

        <ProductCarousel
          title="SAH nye merchandise kollektion"
          count="7 produkter"
          subtitle="Stå bag klubben - med din støtte skaber vi store øjeblikke både på og uden for banen."
          products={focusProducts}
          ctaLabel="Se alt merchandise"
          ctaHref="/merchandise"
          sideImage={side1}
          sideAlt="ACH produkter i fokus"
        />

        <SplitFeature
          imageSide="left"
          image={sectionLeft}
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
          ctaLabel="Find din trøje her"
          ctaHref="/spillertoj"
          sideImage={side2}
          sideAlt="ACH Spillertøj"
        />

        <SplitFeature
          imageSide="right"
          image={sectionRight}
          imageAlt="ACH Merchandise"
          eyebrow="sah MERCHANDISE"
          title="Håndbold merchandise med stolthed"
          body="For dig, der elsker fællesskabet og stemningen på lægterne. Vi har designet en fan-linje med et helt unikt SAH-mønster, der binder fans, spillere og frivillige sammen i én stærk enhed. Det markante design gør det nemt at genkende andre fans ude i bybilledet, og det fungerer som den perfekte anledning til at falde i snak om holdet."
          ctaLabel="Bliv en del af holdet"
          ctaHref="/se-alt-sah"
        />

        <ClosingHeading />
      </main>
      <SiteFooter />
    </div>
  );
}

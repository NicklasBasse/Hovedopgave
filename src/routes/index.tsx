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

import sectionLeft from "@/assets/ach/section-left.jpg";
import sectionRight from "@/assets/ach/section-right.jpg";
import side1 from "@/assets/ach/carousel-side-sah.webp";
import side2 from "@/assets/ach/carousel-side-2.jpg";

import pAway from "@/assets/ach/p-away-sah.webp";
import pAwayKids from "@/assets/ach/p-away-kids.webp";
import pBallBlue from "@/assets/ach/p-ball-blue.webp";
import pBootbag from "@/assets/ach/p-bootbag.webp";
import pBallGreen from "@/assets/ach/p-ball-green.jpg";
import pBallYellow from "@/assets/ach/p-ball-yellow.jpg";
import pBlanket from "@/assets/ach/p-blanket.jpg";
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
          "Køb officielt AC Horsens spillertøj og merchandise hos SPORT 24. Hjemmebanetrøjer, udebanetrøjer, fodbolde og fan-merch.",
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
  { img: pAway, name: "AC Horsens Udebanetrøje 25", price: "420 kr." },
  { img: pAwayKids, name: "AC Horsens Udebanetrøje 25 Børn", price: "385 kr." },
  { img: pBallBlue, name: "AC Horsens Precision Training Fodbold", price: "200 kr.", oldPrice: "250 kr.", badge: "KLUBPRIS - SPAR 20%" },
  { img: pBootbag, name: "AC Horsens Støvlepose", price: "100 kr.", oldPrice: "125 kr.", badge: "KLUBPRIS - SPAR 20%" },
  { img: pBallGreen, name: "AC Horsens Precision Training Fodbold", price: "200 kr.", oldPrice: "250 kr.", badge: "KLUBPRIS - SPAR 20%" },
  { img: pBallYellow, name: "AC Horsens Fodbold", price: "72,80 kr.", oldPrice: "130 kr.", badge: "KLUBPRIS - SPAR 44%" },
  { img: pBlanket, name: "AC Horsens 130x160 Fleecetæppe", price: "200 kr." },
  { img: pSweatshirt, name: "AC Horsens Sweatshirt", price: "400 kr." },
  { img: pUmbrella, name: "AC Horsens Paraply", price: "75 kr.", oldPrice: "150 kr.", badge: "Slutsalg - SPAR 50%" },
  { img: pCap, name: "AC Horsens Cap", price: "140 kr.", oldPrice: "200 kr.", badge: "Slutsalg - SPAR 30%" },
];

const jerseyProducts: Product[] = [
  { img: pShortsKids, name: "AC Horsens Hjemmebaneshorts 24/25 Børn", price: "245 kr.", excluded: true },
  { img: pAwayKids, name: "AC Horsens 23/24 Udebanetrøje Børn", price: "420 kr.", excluded: true },
  { img: pHome, name: "AC Horsens Hjemmebanetrøje 25/26", price: "455 kr.", excluded: true },
  { img: pSocksBlack, name: "AC Horsens Udebanestrømper 2024", price: "50 kr.", excluded: true },
  { img: pSocksWhite, name: "AC Horsens Udebanestrømper 25", price: "65 kr.", excluded: true },
  { img: pSocksYellow, name: "AC Horsens Hjemmebanestrømper 25/26", price: "105 kr.", excluded: true },
  { img: pShortsKids2526, name: "AC Horsens Hjemmebaneshorts 25/26 Børn", price: "260 kr.", excluded: true },
  { img: pShorts, name: "AC Horsens Hjemmebaneshorts 25/26", price: "300 kr.", excluded: true },
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
          title="ACH-produkter i fokus"
          count="72 produkter"
          subtitle="Stå bag klubben - med din støtte skaber vi store øjeblikke både på og uden for banen."
          products={focusProducts}
          ctaLabel="Se alt fra ACH"
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
        />

        <ProductCarousel
          title="ACH Spillertøj"
          count="8 produkter"
          subtitle="AC Horsens - ren gul stolthed, skabt til kamp og fællesskab!"
          products={jerseyProducts}
          ctaLabel="Find din trøje her"
          sideImage={side2}
          sideAlt="ACH Spillertøj"
        />

        <SplitFeature
          imageSide="right"
          image={sectionRight}
          imageAlt="ACH Merchandise"
          eyebrow="ACH MERCHANDISE"
          title="ACH - Sammen skaber vi minder"
          body="Støt AC Horsens, og vis farverne med stolthed! Køb det nyeste gule merchandise, og vær en del af fællesskabet, både på stadion og i hverdagen. Når du bærer Horsens farver, står du sammen med klubben og byens passion - en ægte gul hyldest til holdet!"
          ctaLabel="Se alt merch"
        />

        <ClosingHeading />
      </main>
      <SiteFooter />
    </div>
  );
}

/**
 * products.ts
 * ----------------------------------------------------------------------------
 * Central "database" over alle produkter på siden. Da projektet er en
 * skole-/demo-side uden rigtig backend, er produktdata blot et statisk
 * TypeScript-array. Det giver flere fordele:
 *   - Lynhurtig opslag (ingen netværkskald)
 *   - Type-sikkerhed via Product-typen
 *   - Nem at vedligeholde: tilføj/redigér ét sted og hele siden opdateres
 *
 * Billederne importeres som ES-modules, så Vite kan optimere og hashe dem
 * ved build (cache-busting + automatisk lazy load).
 */

// ---- Billede-imports (alle webp/jpg ligger i src/assets/ach/) ------------
// Hvert produktbillede importeres TO gange: en lille fallback (`?w=500`)
// og et responsive srcset (`?w=240;480`). Det giver mobil-browsere
// mulighed for at hente en ~80 KB-variant i stedet for 600 KB-originalen.
import pHome from "@/assets/sah/p-home-jersey.webp?w=320&format=webp";
import pHomeSet from "@/assets/sah/p-home-jersey.webp?w=240;480&format=webp&as=srcset";
import pHomeSetAvif from "@/assets/sah/p-home-jersey.webp?w=240;480&format=avif&as=srcset";
import pAway from "@/assets/sah/p-away-sah.webp?w=320&format=webp";
import pAwaySet from "@/assets/sah/p-away-sah.webp?w=240;480&format=webp&as=srcset";
import pAwaySetAvif from "@/assets/sah/p-away-sah.webp?w=240;480&format=avif&as=srcset";
import pAway2 from "@/assets/sah/p-away-sah-2.webp?w=320&format=webp";
import pAway2Set from "@/assets/sah/p-away-sah-2.webp?w=240;480&format=webp&as=srcset";
import pAway2SetAvif from "@/assets/sah/p-away-sah-2.webp?w=240;480&format=avif&as=srcset";
import pAwayKids from "@/assets/sah/p-away-kids-sah.webp?w=320&format=webp";
import pAwayKidsSet from "@/assets/sah/p-away-kids-sah.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsSetAvif from "@/assets/sah/p-away-kids-sah.webp?w=240;480&format=avif&as=srcset";
import pAwayKids2 from "@/assets/sah/p-away-kids-sah-2.webp?w=320&format=webp";
import pAwayKids2Set from "@/assets/sah/p-away-kids-sah-2.webp?w=240;480&format=webp&as=srcset";
import pAwayKids2SetAvif from "@/assets/sah/p-away-kids-sah-2.webp?w=240;480&format=avif&as=srcset";
import pAwayKidsJersey from "@/assets/sah/p-away-kids-sah-jersey.webp?w=320&format=webp";
import pAwayKidsJerseySet from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=webp&as=srcset";
import pAwayKidsJerseySetAvif from "@/assets/sah/p-away-kids-sah-jersey.webp?w=240;480&format=avif&as=srcset";
import pShorts from "@/assets/sah/p-shorts.webp?w=320&format=webp";
import pShortsSet from "@/assets/sah/p-shorts.webp?w=240;480&format=webp&as=srcset";
import pShortsSetAvif from "@/assets/sah/p-shorts.webp?w=240;480&format=avif&as=srcset";
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
import pBallBlue from "@/assets/sah/p-ball-blue-new.webp?w=320&format=webp";
import pBallBlueSet from "@/assets/sah/p-ball-blue-new.webp?w=240;480&format=webp&as=srcset";
import pBallBlueSetAvif from "@/assets/sah/p-ball-blue-new.webp?w=240;480&format=avif&as=srcset";
import pBallGreen from "@/assets/sah/p-ball-green-new.webp?w=320&format=webp";
import pBallGreenSet from "@/assets/sah/p-ball-green-new.webp?w=240;480&format=webp&as=srcset";
import pBallGreenSetAvif from "@/assets/sah/p-ball-green-new.webp?w=240;480&format=avif&as=srcset";
import pBallYellow from "@/assets/sah/p-ball-yellow-new.webp?w=320&format=webp";
import pBallYellowSet from "@/assets/sah/p-ball-yellow-new.webp?w=240;480&format=webp&as=srcset";
import pBallYellowSetAvif from "@/assets/sah/p-ball-yellow-new.webp?w=240;480&format=avif&as=srcset";
import pBootbag from "@/assets/sah/p-bootbag-new.webp?w=320&format=webp";
import pBootbagSet from "@/assets/sah/p-bootbag-new.webp?w=240;480&format=webp&as=srcset";
import pBootbagSetAvif from "@/assets/sah/p-bootbag-new.webp?w=240;480&format=avif&as=srcset";
import pBlanket from "@/assets/sah/p-blanket-new.webp?w=320&format=webp";
import pBlanketSet from "@/assets/sah/p-blanket-new.webp?w=240;480&format=webp&as=srcset";
import pBlanketSetAvif from "@/assets/sah/p-blanket-new.webp?w=240;480&format=avif&as=srcset";
import pSweatshirt from "@/assets/sah/p-sweatshirt.jpg?w=320&format=webp";
import pSweatshirtSet from "@/assets/sah/p-sweatshirt.jpg?w=240;480&format=webp&as=srcset";
import pSweatshirtSetAvif from "@/assets/sah/p-sweatshirt.jpg?w=240;480&format=avif&as=srcset";
import pUmbrella from "@/assets/sah/p-umbrella.jpg?w=320&format=webp";
import pUmbrellaSet from "@/assets/sah/p-umbrella.jpg?w=240;480&format=webp&as=srcset";
import pUmbrellaSetAvif from "@/assets/sah/p-umbrella.jpg?w=240;480&format=avif&as=srcset";
import pCap from "@/assets/sah/p-cap.jpg?w=320&format=webp";
import pCapSet from "@/assets/sah/p-cap.jpg?w=240;480&format=webp&as=srcset";
import pCapSetAvif from "@/assets/sah/p-cap.jpg?w=240;480&format=avif&as=srcset";

/**
 * Type-definition for et produkt.
 * - `slug`       = unikt URL-fragment til /produkt/$slug ruten
 * - `img`/`img2` = hoved- og evt. sekundærbillede til galleriet
 * - `oldPrice`   = bruges til at vise overstreget førpris
 * - `excluded`   = produkter undtaget fra en kampagne (vises med badge)
 * - `hasSizes`   = styrer om størrelsesvælger skal vises på produktsiden
 * - `category`   = bruges til filtrering på underside-niveau
 */
export type Product = {
  slug: string;
  img: string;
  imgSrcset?: string;
  imgAvifSrcset?: string;
  img2?: string;
  img2Srcset?: string;
  img2AvifSrcset?: string;
  name: string;
  price: string;
  oldPrice?: string;
  excluded?: boolean;
  brand: string;
  hasSizes: boolean;
  category: "spillertoj" | "merchandise";
};

// Selve produktkataloget. Rækkefølgen er bevidst: merchandise først,
// derefter spillertøj (følger ønsket layout på "Se alt SAH"-siden).
export const PRODUCTS: Product[] = [
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, imgSrcset: pHomeSet, imgAvifSrcset: pHomeSetAvif, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanetroje-25", img: pAway, imgSrcset: pAwaySet, imgAvifSrcset: pAwaySetAvif, img2: pAway2, img2Srcset: pAway2Set, img2AvifSrcset: pAway2SetAvif, name: "SAH t-shirt", price: "150 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, imgSrcset: pAwayKidsSet, imgAvifSrcset: pAwayKidsSetAvif, img2: pAwayKids2, img2Srcset: pAwayKids2Set, img2AvifSrcset: pAwayKids2SetAvif, name: "SAH hoodie", price: "250 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, imgSrcset: pAwayKidsJerseySet, imgAvifSrcset: pAwayKidsJerseySetAvif, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, imgSrcset: pShortsSet, imgAvifSrcset: pShortsSetAvif, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, imgSrcset: pShortsKidsSet, imgAvifSrcset: pShortsKidsSetAvif, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, imgSrcset: pShortsKids2526Set, imgAvifSrcset: pShortsKids2526SetAvif, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, imgSrcset: pSocksBlackSet, imgAvifSrcset: pSocksBlackSetAvif, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, imgSrcset: pSocksWhiteSet, imgAvifSrcset: pSocksWhiteSetAvif, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, imgSrcset: pSocksYellowSet, imgAvifSrcset: pSocksYellowSetAvif, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, imgSrcset: pBallBlueSet, imgAvifSrcset: pBallBlueSetAvif, name: "SAH bøllehat", price: "250 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, imgSrcset: pBallGreenSet, imgAvifSrcset: pBallGreenSetAvif, name: "SAH halstørklæde", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-fodbold-gul", img: pBallYellow, imgSrcset: pBallYellowSet, imgAvifSrcset: pBallYellowSetAvif, name: "SAH håndklæde", price: "250 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-stovlepose", img: pBootbag, imgSrcset: pBootbagSet, imgAvifSrcset: pBootbagSetAvif, name: "SAH cap", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, imgSrcset: pBlanketSet, imgAvifSrcset: pBlanketSetAvif, name: "SAH flag", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-sweatshirt", img: pSweatshirt, imgSrcset: pSweatshirtSet, imgAvifSrcset: pSweatshirtSetAvif, name: "SAH Sweatshirt", price: "350 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-paraply", img: pUmbrella, imgSrcset: pUmbrellaSet, imgAvifSrcset: pUmbrellaSetAvif, name: "SAH Paraply", price: "180 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-cap", img: pCap, imgSrcset: pCapSet, imgAvifSrcset: pCapSetAvif, name: "SAH Cap", price: "150 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
];

/**
 * Hjælper: find et produkt på dets slug.
 * Bruges af /produkt/$slug ruten til at slå produktet op ud fra URL'en.
 * Returnerer `undefined`, hvis slug'en ikke matcher — så vi kan vise 404.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Hjælper: hent alle produkter i en given kategori.
 * Bruges på undersider som /spillertoj og /merchandise til at filtrere.
 */
export function getProductsByCategory(category: Product["category"]): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

// Tilgængelige størrelser. `as const` gør at TypeScript ved at det
// præcis er disse 6 strenge – derfor kan vi typedefinere Size som union.
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

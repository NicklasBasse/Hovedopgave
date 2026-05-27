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
// og et responsive srcset (`?w=400;800;1200`). Det giver mobil-browsere
// mulighed for at hente en ~80 KB-variant i stedet for 600 KB-originalen.
import pHome from "@/assets/ach/p-home-jersey.webp?w=500&format=webp";
import pHomeSet from "@/assets/ach/p-home-jersey.webp?w=400;800;1200&format=webp&as=srcset";
import pAway from "@/assets/ach/p-away-sah.webp?w=500&format=webp";
import pAwaySet from "@/assets/ach/p-away-sah.webp?w=400;800;1200&format=webp&as=srcset";
import pAway2 from "@/assets/ach/p-away-sah-2.webp?w=500&format=webp";
import pAway2Set from "@/assets/ach/p-away-sah-2.webp?w=400;800;1200&format=webp&as=srcset";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp?w=500&format=webp";
import pAwayKidsSet from "@/assets/ach/p-away-kids-sah.webp?w=400;800;1200&format=webp&as=srcset";
import pAwayKids2 from "@/assets/ach/p-away-kids-sah-2.webp?w=500&format=webp";
import pAwayKids2Set from "@/assets/ach/p-away-kids-sah-2.webp?w=400;800;1200&format=webp&as=srcset";
import pAwayKidsJersey from "@/assets/ach/p-away-kids-sah-jersey.webp?w=500&format=webp";
import pAwayKidsJerseySet from "@/assets/ach/p-away-kids-sah-jersey.webp?w=400;800;1200&format=webp&as=srcset";
import pShorts from "@/assets/ach/p-shorts.webp?w=500&format=webp";
import pShortsSet from "@/assets/ach/p-shorts.webp?w=400;800;1200&format=webp&as=srcset";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp?w=500&format=webp";
import pShortsKidsSet from "@/assets/ach/p-shorts-kids.webp?w=400;800;1200&format=webp&as=srcset";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp?w=500&format=webp";
import pShortsKids2526Set from "@/assets/ach/p-shorts-kids-2526.webp?w=400;800;1200&format=webp&as=srcset";
import pSocksBlack from "@/assets/ach/p-socks-black.webp?w=500&format=webp";
import pSocksBlackSet from "@/assets/ach/p-socks-black.webp?w=400;800;1200&format=webp&as=srcset";
import pSocksWhite from "@/assets/ach/p-socks-white.webp?w=500&format=webp";
import pSocksWhiteSet from "@/assets/ach/p-socks-white.webp?w=400;800;1200&format=webp&as=srcset";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp?w=500&format=webp";
import pSocksYellowSet from "@/assets/ach/p-socks-yellow.webp?w=400;800;1200&format=webp&as=srcset";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp?w=500&format=webp";
import pBallBlueSet from "@/assets/ach/p-ball-blue-new.webp?w=400;800;1200&format=webp&as=srcset";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp?w=500&format=webp";
import pBallGreenSet from "@/assets/ach/p-ball-green-new.webp?w=400;800;1200&format=webp&as=srcset";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp?w=500&format=webp";
import pBallYellowSet from "@/assets/ach/p-ball-yellow-new.webp?w=400;800;1200&format=webp&as=srcset";
import pBootbag from "@/assets/ach/p-bootbag-new.webp?w=500&format=webp";
import pBootbagSet from "@/assets/ach/p-bootbag-new.webp?w=400;800;1200&format=webp&as=srcset";
import pBlanket from "@/assets/ach/p-blanket-new.webp?w=500&format=webp";
import pBlanketSet from "@/assets/ach/p-blanket-new.webp?w=400;800;1200&format=webp&as=srcset";
import pSweatshirt from "@/assets/ach/p-sweatshirt.jpg?w=500&format=webp";
import pSweatshirtSet from "@/assets/ach/p-sweatshirt.jpg?w=400;800;1200&format=webp&as=srcset";
import pUmbrella from "@/assets/ach/p-umbrella.jpg?w=500&format=webp";
import pUmbrellaSet from "@/assets/ach/p-umbrella.jpg?w=400;800;1200&format=webp&as=srcset";
import pCap from "@/assets/ach/p-cap.jpg?w=500&format=webp";
import pCapSet from "@/assets/ach/p-cap.jpg?w=400;800;1200&format=webp&as=srcset";

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
  /** Responsive srcset (vite-imagetools) til hoved-billedet. */
  imgSrcset?: string;
  img2?: string;
  /** Responsive srcset til sekundærbilledet. */
  img2Srcset?: string;
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
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, imgSrcset: pHomeSet, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanetroje-25", img: pAway, imgSrcset: pAwaySet, img2: pAway2, img2Srcset: pAway2Set, name: "SAH t-shirt", price: "150 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, imgSrcset: pAwayKidsSet, img2: pAwayKids2, img2Srcset: pAwayKids2Set, name: "SAH hoodie", price: "250 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, imgSrcset: pAwayKidsJerseySet, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, imgSrcset: pShortsSet, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, imgSrcset: pShortsKidsSet, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, imgSrcset: pShortsKids2526Set, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, imgSrcset: pSocksBlackSet, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, imgSrcset: pSocksWhiteSet, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, imgSrcset: pSocksYellowSet, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, imgSrcset: pBallBlueSet, name: "SAH bøllehat", price: "250 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, imgSrcset: pBallGreenSet, name: "SAH halstørklæde", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-fodbold-gul", img: pBallYellow, imgSrcset: pBallYellowSet, name: "SAH håndklæde", price: "250 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-stovlepose", img: pBootbag, imgSrcset: pBootbagSet, name: "SAH cap", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, imgSrcset: pBlanketSet, name: "SAH flag", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-sweatshirt", img: pSweatshirt, imgSrcset: pSweatshirtSet, name: "SAH Sweatshirt", price: "350 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-paraply", img: pUmbrella, imgSrcset: pUmbrellaSet, name: "SAH Paraply", price: "180 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-cap", img: pCap, imgSrcset: pCapSet, name: "SAH Cap", price: "150 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
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

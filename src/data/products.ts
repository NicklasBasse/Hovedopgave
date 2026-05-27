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
import pHome from "@/assets/ach/p-home-jersey.webp";
import pAway from "@/assets/ach/p-away-sah.webp";
import pAway2 from "@/assets/ach/p-away-sah-2.webp";
import pAwayKids from "@/assets/ach/p-away-kids-sah.webp";
import pAwayKids2 from "@/assets/ach/p-away-kids-sah-2.webp";
import pAwayKidsJersey from "@/assets/ach/p-away-kids-sah-jersey.webp";
import pShorts from "@/assets/ach/p-shorts.webp";
import pShortsKids from "@/assets/ach/p-shorts-kids.webp";
import pShortsKids2526 from "@/assets/ach/p-shorts-kids-2526.webp";
import pSocksBlack from "@/assets/ach/p-socks-black.webp";
import pSocksWhite from "@/assets/ach/p-socks-white.webp";
import pSocksYellow from "@/assets/ach/p-socks-yellow.webp";
import pBallBlue from "@/assets/ach/p-ball-blue-new.webp";
import pBallGreen from "@/assets/ach/p-ball-green-new.webp";
import pBallYellow from "@/assets/ach/p-ball-yellow-new.webp";
import pBootbag from "@/assets/ach/p-bootbag-new.webp";
import pBlanket from "@/assets/ach/p-blanket-new.webp";
import pSweatshirt from "@/assets/ach/p-sweatshirt.jpg";
import pUmbrella from "@/assets/ach/p-umbrella.jpg";
import pCap from "@/assets/ach/p-cap.jpg";

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
  img2?: string;
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
  { slug: "sah-hjemmebanetroje-25-26", img: pHome, name: "SAH hjemmebane spillershorts 25/26", price: "200 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanetroje-25", img: pAway, img2: pAway2, name: "SAH t-shirt", price: "150 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-udebanetroje-25-born", img: pAwayKids, img2: pAwayKids2, name: "SAH hoodie", price: "250 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-udebane-spillertroje-25-26", img: pAwayKidsJersey, name: "SAH udebane spillertrøje 25/26", price: "375 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-25-26", img: pShorts, name: "SAH udebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-24-25-born", img: pShortsKids, name: "SAH hjemmebane spillertrøje 25/26", price: "375 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebaneshorts-25-26-born", img: pShortsKids2526, name: "SAH hjemmebane spillershorts 25/26 Børn", price: "150 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanestromper-2024", img: pSocksBlack, name: "SAH udebane spillershorts 25/26", price: "200 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-udebanestromper-25", img: pSocksWhite, name: "SAH hjemmebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-hjemmebanestromper-25-26", img: pSocksYellow, name: "SAH udebane spillertrøje 25/26 Børn", price: "275 kr.", excluded: true, brand: "adidas", hasSizes: true, category: "spillertoj" },
  { slug: "sah-precision-training-fodbold", img: pBallBlue, name: "SAH bøllehat", price: "250 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-precision-training-fodbold-gron", img: pBallGreen, name: "SAH halstørklæde", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-fodbold-gul", img: pBallYellow, name: "SAH håndklæde", price: "250 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-stovlepose", img: pBootbag, name: "SAH cap", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-130x160-fleecetaeppe", img: pBlanket, name: "SAH flag", price: "175 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-sweatshirt", img: pSweatshirt, name: "SAH Sweatshirt", price: "350 kr.", brand: "SAH", hasSizes: true, category: "merchandise" },
  { slug: "sah-paraply", img: pUmbrella, name: "SAH Paraply", price: "180 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
  { slug: "sah-cap", img: pCap, name: "SAH Cap", price: "150 kr.", brand: "SAH", hasSizes: false, category: "merchandise" },
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

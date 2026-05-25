/**
 * cookies.ts
 * ----------------------------------------------------------------------------
 * Hjælpefunktioner til at læse/skrive cookies i browseren samt en lille
 * "samtykke-store" der gemmer brugerens cookie-valg (necessary, functional,
 * analytics, marketing).
 *
 * Vi bruger cookies (ikke localStorage), fordi:
 *  1) Cookies har en udløbsdato (her 365 dage) – derfor husker browseren
 *     valget på tværs af sessioner.
 *  2) Cookies kan deles på tværs af subdomæner og er den standard, GDPR
 *     reglerne forventer for samtykke.
 *
 * Filen er bevidst lille og uden afhængigheder, så den kan køres både i
 * browseren og i en SSR (server-side rendering) kontekst uden at fejle.
 * Derfor laver hver funktion en `typeof document === "undefined"` check.
 */

// Typedefinition for de fire cookie-kategorier.
// "necessary" er altid `true` (kan ikke fravælges), de øvrige er booleans.
export type ConsentCategories = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Navne på de cookies vi selv bruger. Holdes som konstanter, så vi
// ikke risikerer stavefejl andre steder i koden.
const CONSENT_KEY = "sah_cookie_consent"; // gemmer JSON med brugerens valg
const CART_KEY = "sah_cart_count";        // gemmer antal varer i kurven

/**
 * Sætter en cookie i browseren.
 * @param name  cookie-navn (fx "sah_cart_count")
 * @param value værdien der skal gemmes (URL-encodes for sikkerhed)
 * @param days  antal dage cookien skal leve (default 365)
 *
 * `SameSite=Lax` betyder, at cookien ikke sendes med ved cross-site
 * requests (beskytter mod CSRF). `path=/` gør, at cookien gælder hele siden.
 */
export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return; // SSR-safe guard
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // 864e5 = ms i et døgn
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Henter en cookie ud fra dens navn.
 * Bruger et regex til at finde "navn=værdi" i den lange document.cookie streng.
 * Returnerer `null` hvis cookien ikke findes.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Sletter en cookie ved at sætte dens udløbsdato til år 1970 (fortiden),
 * så browseren med det samme fjerner den.
 */
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/**
 * Læser brugerens samtykke-valg ud af cookien.
 * Returnerer `null` hvis brugeren endnu ikke har valgt noget
 * (så viser vi cookie-banneret). Try/catch beskytter mod ugyldig JSON.
 */
export function getConsent(): ConsentCategories | null {
  const raw = getCookie(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentCategories;
  } catch {
    return null;
  }
}

/**
 * Gemmer brugerens samtykke og udsender et custom event,
 * så andre dele af appen (fx useCart-hooket) kan reagere med det samme
 * – uden at vi behøver at genindlæse siden.
 */
export function saveConsent(consent: ConsentCategories) {
  setCookie(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("sah:consent-changed", { detail: consent }));
}

// Eksporteres som konstant, så andre filer importerer navnet
// frem for at hardcode strengen flere steder.
export const CART_COOKIE = CART_KEY;

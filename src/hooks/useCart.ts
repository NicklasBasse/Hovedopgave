/**
 * useCart.ts
 * ----------------------------------------------------------------------------
 * Lille global "store" der holder styr på antal varer i kurven og synkroniserer
 * tallet med en cookie (kun hvis brugeren har givet samtykke til funktionelle
 * cookies).
 *
 * Vi bruger Reacts indbyggede `useSyncExternalStore` i stedet for fx Redux
 * eller Zustand – det er den officielle React 18+ måde at koble ekstern state
 * sammen med komponenter, og den er ekstremt let og uden afhængigheder.
 *
 * Flowet:
 *  1) Når en komponent (fx kurv-ikonet i SiteHeader) bruger `useCartCount()`,
 *     bliver den abonnent (subscriber) på store'en.
 *  2) Når `cartStore.add()` kaldes, opdateres tællingen, cookien
 *     opdateres (hvis tilladt), og alle abonnenter får besked via `emit()`.
 *  3) Hvis brugeren ændrer sit cookie-samtykke (event "sah:consent-changed"),
 *     reagerer vi: sletter cookien hvis funktionelle cookies fravælges,
 *     eller gemmer den aktuelle værdi hvis de accepteres.
 */
import { useSyncExternalStore } from "react";
import { CART_COOKIE, getConsent, getCookie, setCookie, deleteCookie } from "@/lib/cookies";

// Modul-lokale variable – fungerer som vores "global state" for hele appen.
// `count` er antal varer; `hydrated` sikrer vi kun læser cookien én gang;
// `listeners` er det Set som React bruger til at notificere komponenter.
let count = 0;
let hydrated = false;
const listeners = new Set<() => void>();

// Kalder alle registrerede listeners – det får komponenter til at re-render.
function emit() {
  listeners.forEach((l) => l());
}

/**
 * Initial "hydrering": læser den gemte kurv-værdi ud af cookien
 * første gang store'en bruges. Kører kun i browseren (ikke under SSR).
 * Registrerer samtidig en lytter på samtykke-ændringer.
 */
function hydrate() {
  if (hydrated || typeof document === "undefined") return;
  hydrated = true;

  // Læs kun den gemte kurv hvis brugeren har accepteret funktionelle cookies.
  const consent = getConsent();
  if (consent?.functional) {
    const raw = getCookie(CART_COOKIE);
    const n = raw ? parseInt(raw, 10) : 0;
    if (!Number.isNaN(n)) count = n;
  }

  // Reager når brugeren ændrer sit samtykke i cookie-banneret.
  // Fravælges funktionelle cookies, sletter vi straks vores data.
  window.addEventListener("sah:consent-changed", () => {
    const c = getConsent();
    if (!c?.functional) {
      deleteCookie(CART_COOKIE);
    } else {
      setCookie(CART_COOKIE, String(count));
    }
  });
}

/**
 * Skriver det aktuelle antal til cookien – men kun hvis brugeren
 * har givet samtykke. Dermed overholder vi GDPR.
 */
function persist() {
  const consent = getConsent();
  if (consent?.functional) {
    setCookie(CART_COOKIE, String(count));
  }
}

/**
 * Det offentlige API til at ændre kurven.
 * Eksporteres så fx produktsiden kan kalde `cartStore.add(1)` når
 * brugeren trykker "Læg i kurv".
 */
export const cartStore = {
  add(qty = 1) {
    hydrate();   // sørg for at vi er hydreret før vi muterer
    count += qty;
    persist();   // gem til cookie hvis tilladt
    emit();      // fortæl alle komponenter at de skal re-render
  },
  get() {
    return count;
  },
};

/**
 * subscribe + getSnapshot er det interface, React kræver for at
 * `useSyncExternalStore` kan abonnere på vores eksterne store.
 */
function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb); // unsubscribe ved unmount
}

/**
 * React-hook der returnerer det aktuelle antal varer i kurven.
 * Det tredje argument er en SSR-snapshot (samme som klient-snapshot her),
 * så koden også fungerer under server-side rendering uden at fejle.
 */
export function useCartCount() {
  return useSyncExternalStore(subscribe, () => count, () => count);
}

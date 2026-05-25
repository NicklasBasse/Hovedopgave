import { useSyncExternalStore } from "react";
import { CART_COOKIE, getConsent, getCookie, setCookie, deleteCookie } from "@/lib/cookies";

let count = 0;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof document === "undefined") return;
  hydrated = true;
  const consent = getConsent();
  if (consent?.functional) {
    const raw = getCookie(CART_COOKIE);
    const n = raw ? parseInt(raw, 10) : 0;
    if (!Number.isNaN(n)) count = n;
  }
  window.addEventListener("sah:consent-changed", () => {
    const c = getConsent();
    if (!c?.functional) {
      deleteCookie(CART_COOKIE);
    } else {
      setCookie(CART_COOKIE, String(count));
    }
  });
}

function persist() {
  const consent = getConsent();
  if (consent?.functional) {
    setCookie(CART_COOKIE, String(count));
  }
}

export const cartStore = {
  add(qty = 1) {
    hydrate();
    count += qty;
    persist();
    emit();
  },
  get() {
    return count;
  },
};

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useCartCount() {
  return useSyncExternalStore(subscribe, () => count, () => count);
}

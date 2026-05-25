// Simple cookie helpers + consent store
export type ConsentCategories = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "sah_cookie_consent";
const CART_KEY = "sah_cart_count";

export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function getConsent(): ConsentCategories | null {
  const raw = getCookie(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentCategories;
  } catch {
    return null;
  }
}

export function saveConsent(consent: ConsentCategories) {
  setCookie(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("sah:consent-changed", { detail: consent }));
}

export const CART_COOKIE = CART_KEY;

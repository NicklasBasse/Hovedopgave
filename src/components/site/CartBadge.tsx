/**
 * CartBadge.tsx
 * ----------------------------------------------------------------------------
 * Lille badge der viser antal varer i kurven. Bevidst splittet ud i sin egen
 * komponent, så `useCart`-hooket + `cookies.ts` IKKE havner i den initiale
 * JS-bundle (Lighthouse mobil: "Reduce unused JavaScript"). SiteHeader
 * lazy-importerer denne komponent — koden hentes først efter hero-billedet
 * er malet, hvilket reducerer det kritiske JS som mobil-browseren skal
 * parse for at vise above-the-fold indhold.
 */
import { useCartCount } from "@/hooks/useCart";

export default function CartBadge() {
  const cartCount = useCartCount();
  if (cartCount <= 0) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold leading-none text-white"
    >
      {cartCount}
    </span>
  );
}

/**
 * utils.ts
 * ----------------------------------------------------------------------------
 * Hjælpefunktion `cn()` — den eneste utility vi bruger globalt.
 *
 * Hvorfor findes den?
 *   - I React/Tailwind-projekter er det meget almindeligt at bygge className
 *     dynamisk: f.eks. "px-4" + en variant + en optional state-klasse.
 *   - Det giver to udfordringer:
 *       1) Vi vil gerne kunne sende arrays, objekter eller falske værdier
 *          ind uden manuelt at filtrere dem fra.
 *       2) To Tailwind-klasser kan være i konflikt (f.eks. "p-2" og "p-4"),
 *          og vi vil have den SIDST angivne til at "vinde" — sådan som man
 *          intuitivt forventer.
 *   - `clsx` løser problem 1 (sammensætter klasser smart).
 *   - `tailwind-merge` løser problem 2 (de-duplikerer Tailwind-konflikter).
 */

// clsx: standardværktøjet til at sammensætte classNames betinget.
// ClassValue er den fælles type for alt clsx accepterer (string, array, object, …).
import { clsx, type ClassValue } from "clsx";

// twMerge: parser Tailwind-klasser og fjerner "tabere" ved konflikt.
import { twMerge } from "tailwind-merge";

/**
 * cn = "className". Sammensætter klasser intelligent.
 *
 * Eksempel:
 *   cn("p-2", isActive && "bg-red-500", "p-4")
 *   → "bg-red-500 p-4"   (p-2 overskrives af p-4 — Tailwind-konflikten løses)
 */
export function cn(...inputs: ClassValue[]) {
  // 1) clsx(...inputs)        → flader inputs ud til én streng af klasser
  // 2) twMerge(...)           → fjerner duplikerede/konfliktende Tailwind-klasser
  return twMerge(clsx(inputs));
}

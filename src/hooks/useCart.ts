import { useSyncExternalStore } from "react";

let count = 0;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const cartStore = {
  add(qty = 1) {
    count += qty;
    emit();
  },
  get() {
    return count;
  },
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useCartCount() {
  return useSyncExternalStore(subscribe, () => count, () => count);
}

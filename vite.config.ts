// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
//
// Bemærk: vite-imagetools er fjernet bevidst. Vi serverer originale billedfiler
// 1:1 uden re-encoding for at sikre 100% original billedkvalitet på tværs af
// hele sitet. Eksisterende imports med `?w=...&format=...&as=srcset` queries
// fungerer stadig — Vite ignorerer ukendte query-parametre og returnerer
// URL'en til originalfilen.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});

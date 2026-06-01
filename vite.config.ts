// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      // Build-time generation af responsive billeder via ?w=...&format=...
      // Globale defaults: lavere kvalitet → markant mindre filer → bedre
      // Website Carbon score (mål: A). Visuelt næsten identisk pga. AVIF/WebP's
      // perceptuelle koder ved q=55-70.
      // Bedst mulig billedkvalitet på tværs af hele sitet. Per-billede
      // override muligt via `&quality=XX` i import-querien.
      imagetools({
        defaultDirectives: (url) => {
          const params = new URLSearchParams(url.search);
          const fmt = params.get("format");
          if (fmt === "avif" && !params.has("quality")) {
            params.set("quality", "90");
            params.set("effort", "9");
          } else if (fmt === "webp" && !params.has("quality")) {
            params.set("quality", "95");
            params.set("effort", "6");
          }
          return params;
        },
      }),
    ],
  },
});

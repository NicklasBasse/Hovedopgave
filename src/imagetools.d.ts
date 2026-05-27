/**
 * imagetools.d.ts
 * ----------------------------------------------------------------------------
 * TypeScript-deklaration der lærer TS at forstå Vite-imagetools' query-syntaks
 * (fx `?w=640;1280&format=webp&as=srcset`). Uden denne fil ville import-stier
 * med querystrings fejle ved typecheck.
 *
 * Vi dækker både relative stier og `@/...`-alias ved at deklarere flere
 * varianter — TS's `paths`-resolver omskriver `@/` før module-pattern matching.
 */
declare module "*?w=*" {
  const value: string;
  export default value;
}
declare module "*?format=*" {
  const value: string;
  export default value;
}
declare module "*&as=srcset" {
  const value: string;
  export default value;
}
declare module "*&as=metadata" {
  const value: Record<string, unknown>;
  export default value;
}

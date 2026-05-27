/**
 * imagetools.d.ts
 * ----------------------------------------------------------------------------
 * TypeScript-deklaration der lærer TS at forstå Vite-imagetools' query-syntaks
 * (fx `?w=640;1280&format=webp&as=srcset`). Uden denne fil ville import-stier
 * med querystrings fejle ved typecheck.
 */
declare module "*.webp?*" {
  const value: string;
  export default value;
}
declare module "*.jpg?*" {
  const value: string;
  export default value;
}
declare module "*.png?*" {
  const value: string;
  export default value;
}

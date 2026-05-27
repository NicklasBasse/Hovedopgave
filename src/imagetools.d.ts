/**
 * imagetools.d.ts
 * ----------------------------------------------------------------------------
 * TypeScript-deklaration så TS forstår Vite-imagetools' query-syntaks
 * (fx `...webp?w=640;1280&format=webp&as=srcset`).
 *
 * TS tillader kun ÉT `*` per module-pattern, så vi bruger query-strengens
 * sidste segment som "anker". Alle imagetools-returns er strings, så det er
 * sikkert at returnere `string`.
 */
declare module "*&as=srcset" {
  const value: string;
  export default value;
}
declare module "*&format=webp" {
  const value: string;
  export default value;
}
declare module "*&format=avif" {
  const value: string;
  export default value;
}

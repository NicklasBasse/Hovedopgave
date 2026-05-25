/**
 * ClosingHeading.tsx
 * ----------------------------------------------------------------------------
 * Lille tekst-sektion der vises nederst på forsiden, lige før footeren.
 * Fungerer som en "afsluttende værdiproposition" der gentager SPORT 24's
 * løfter: gode priser, hurtig levering og fuld returret. Ren tekst-komponent
 * uden interaktion.
 */
export function ClosingHeading() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-16 text-center">
      <h2 className="text-2xl font-black tracking-tight md:text-4xl">
        Altid gode priser, hurtig levering og 365 dages fuld returret
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-[15px] text-foreground/70">
        Hos SPORT 24 har vi noget for hele familien. Se vores store udvalg.
      </p>
    </section>
  );
}

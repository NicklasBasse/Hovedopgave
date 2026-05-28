/**
 * IntroBlock.tsx
 * ----------------------------------------------------------------------------
 * Intro-sektion på forsiden mellem hero og fliser. Viser et lille eyebrow,
 * en stor overskrift, undertekst og tre tag-knapper. Knapperne er pt. blot
 * dummy-links (`href="#"`), da denne komponent er en visuel intro – ikke
 * en navigationskomponent.
 */
export function IntroBlock() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-14 text-center">
      {/* Lille label ovenover overskriften ("eyebrow") */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Skanderborg AGF Håndbold
      </p>
      <h2 className="text-3xl font-black tracking-tight md:text-5xl">
        Klæd dig i SAH's farver
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-[15px] text-foreground/80">
        Tilgængelig online og i SPORT 24 – SAH – Sammen skaber vi minder
      </p>
      {/* Tre tag-knapper – kosmetiske, peger på "#" */}
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {[
          { label: "Spillertøj" },
          { label: "Merch" },
          { label: "Se alt SAH" },
        ].map((b) => (
          <a
            key={b.label}
            href="#"
            className="rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-background hover:text-foreground"
          >
            {b.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function IntroBlock() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-14 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        AC Horsens
      </p>
      <h2 className="text-3xl font-black tracking-tight md:text-5xl">
        Klæd dig i AC Horsens farver
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-[15px] text-foreground/80">
        Tilgængelig online og i SPORT 24 - AC Horsens - Sammen skaber vi minder
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {[
          { label: "Spillertøj" },
          { label: "Merch" },
          { label: "Se alt ACH" },
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

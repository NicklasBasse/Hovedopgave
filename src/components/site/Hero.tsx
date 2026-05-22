import heroImg from "@/assets/ach/hero.jpg";

export function Hero() {
  return (
    <section className="relative w-full">
      <h1 className="sr-only">AC Horsens forside</h1>
      <div className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[24/9]">
        <img
          src={heroImg}
          alt="AC Horsens topbillede 2025"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Bottom-left text + CTAs */}
        <div className="absolute bottom-8 left-4 max-w-[640px] text-white md:bottom-16 md:left-16">
          <p className="text-xs font-bold uppercase tracking-wider md:text-sm">
            Skanderborg agf håndbold
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] md:text-5xl lg:text-4xl">
            BYENS BEDSTE<br />SAH's nye merchandise kollektion
          </h2>
          <p className="mt-4 text-sm md:text-base">
            Ny merchandise kollektion til at skabe lokal stolthed og fællesskab
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#spillertoj"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Spillertøj
            </a>
            <a
              href="#merch"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Merch
            </a>
            <a
              href="#alt"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Se alt SAH
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

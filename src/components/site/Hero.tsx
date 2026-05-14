import heroImg from "@/assets/ach/hero.jpg";
import jerseyImg from "@/assets/ach/p-home-jersey.jpg";

export function Hero() {
  return (
    <section className="relative w-full">
      <h1 className="sr-only">AC Horsens forside</h1>
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="AC Horsens topbillede 2025"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* Bottom-left text + CTAs */}
        <div className="absolute bottom-6 left-4 max-w-[560px] text-white md:bottom-12 md:left-12">
          <p className="text-xs font-bold uppercase tracking-wider md:text-sm">
            AC Horsens
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl">
            Tag AC Horsens med dig<br />i hverdagen og til kamp
          </h2>
          <p className="mt-4 text-sm md:text-base">
            Tilgængelig online og i SPORT 24 - Sammen for Horsens!
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
              Se alt AC Horsens
            </a>
          </div>
        </div>

        {/* Overlay product card */}
        <div className="absolute bottom-6 right-6 hidden w-[220px] bg-white p-3 shadow-lg lg:block">
          <img
            src={jerseyImg}
            alt="AC Horsens Hjemmebanetrøje 25/26"
            width={600}
            height={600}
            className="h-40 w-full object-contain"
            loading="lazy"
          />
          <p className="mt-2 text-[13px] font-semibold leading-tight">
            AC Horsens Hjemmebanetrøje 25/26
          </p>
          <p className="mt-1 text-base font-bold">455 kr.</p>
          <span className="mt-2 inline-block bg-brand-yellow px-2 py-0.5 text-[11px] font-bold uppercase">
            Skarp Pris
          </span>
        </div>
      </div>
    </section>
  );
}

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />

        {/* Overlay product card */}
        <div className="absolute bottom-6 right-6 hidden w-[260px] bg-white p-3 shadow-lg md:block">
          <img
            src={jerseyImg}
            alt="AC Horsens Hjemmebanetrøje 25/26"
            width={600}
            height={600}
            className="h-44 w-full object-contain"
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

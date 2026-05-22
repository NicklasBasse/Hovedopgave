import { Facebook, Instagram, Youtube } from "lucide-react";

const kundeservice = [
  "Se butikker og åbningstider",
  "Mail: kundeservice@sport24.dk",
  "Telefon: 3021 3850",
  "Chat: Start chat",
];

const kundeserviceLinks = ["Kundeservice og info", "Køb gavekort", "Konkurrencer", "Job", "Bliv elev"];

const hjaelp = [
  "Levering & Tracking",
  "Reklamation",
  "Returnering",
  "Returportal",
  "Betaling",
  "Gavekort & Tilgodebevis",
  "Øvrige spørgsmål",
  "Fortrydelsesret",
  "Handelsbetingelser",
  "Persondatapolitik",
  "Opdatér cookie samtykke",
  "Om vores pristyper",
  "Click & Collect",
];

const klub = [
  "Om Klub SPORT 24",
  "Bliv medlem af Klub SPORT 24",
  "Bonus",
  "Kvitteringer",
  "Medlemspriser",
  "Afmeld nyhedsmail/sms",
  "Hjælp til log ind",
  null,
  "Om SPORT 24",
  "SPORT 24 koncepterne",
  "Teamsport og B2B",
  "Aftryk i samfundet",
];

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground">
      {/* Dark promo band */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black md:text-5xl">
              Altid gode priser, hurtig levering og 365 dages fuld returret
            </h2>
            <p className="mt-4 text-sm text-white/80 md:text-base">
              Hos SPORT 24 har vi noget for hele familien. Se vores store udvalg
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center rounded-full bg-brand-red px-8 py-4 text-base font-bold text-white hover:opacity-90"
          >
            Shop til gode priser
          </a>
        </div>
      </div>

      {/* Footer columns */}
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-4">
        {/* Brand column */}
        <div>
          <a href="/" className="inline-flex items-center" aria-label="SPORT 24">
            <img src={sport24Logo} alt="SPORT 24" className="h-12 w-auto" />
          </a>
          <p className="mt-6 text-sm leading-relaxed text-foreground/80">
            SPORT 24 er en danskejet og landsdækkende sportskæde. Vi er hele familiens sportskæde, som
            hylder glæden ved at bevæge sig. Hos os skal sport føles sjovt og bringe glæde. Uanset niveau og
            ambitioner hjælper vi med at dyrke glæden.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-foreground hover:text-brand-red">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram" className="text-foreground hover:text-brand-red">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="YouTube" className="text-foreground hover:text-brand-red">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#1aa3d6] px-3 py-2 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1aa3d6] font-bold">
              e
            </span>
            <span className="text-sm font-semibold">e-mærket</span>
          </div>
        </div>

        {/* Kundeservice */}
        <div>
          <h3 className="text-lg font-bold">Kundeservice</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {kundeservice.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-brand-red">{item}</a>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-sm">
            <p className="font-semibold">Telefon åbningstider:</p>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between gap-6"><span>Man. - Fre.</span><span>kl. 09:30 - 20:00</span></div>
              <div className="flex justify-between gap-6"><span>Lør.</span><span>kl. 09:00 - 15:00</span></div>
              <div className="flex justify-between gap-6"><span>Søn.</span><span>kl. 10.00 - 14.00</span></div>
            </div>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {kundeserviceLinks.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-brand-red">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hjælp */}
        <div>
          <h3 className="text-lg font-bold">Hjælp</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {hjaelp.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-brand-red">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Klub SPORT 24 */}
        <div>
          <h3 className="text-lg font-bold">Klub SPORT 24</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {klub.map((item, i) =>
              item === null ? (
                <li key={`gap-${i}`} className="h-4" aria-hidden="true" />
              ) : (
                <li key={item}>
                  <a href="#" className="hover:text-brand-red">{item}</a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

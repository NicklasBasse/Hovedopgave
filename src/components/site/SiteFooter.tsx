/**
 * SiteFooter.tsx
 * ----------------------------------------------------------------------------
 * Footer som vises i bunden af alle sider. Den består af tre dele:
 *   1) Mørkt promo-bånd med et stort budskab + CTA-knap.
 *   2) Fire kolonner: brand-info, kundeservice, hjælp og Klub SPORT 24.
 *   3) Disclaimer der gør opmærksom på at siden er til skolebrug.
 *
 * Link-lister er definerede som konstanter i toppen af filen, så det er nemt
 * at tilføje/redigere uden at rode i JSX. `kundeserviceLinks` indeholder bl.a.
 * et reelt link til /readme – de øvrige peger på "#" da der ikke er rigtige
 * undersider for dem i demoen.
 */
import { Facebook, Instagram, Youtube } from "lucide-react";
import sport24Logo from "@/assets/sport24-logo.webp";

// Tekstlinjer der vises i Kundeservice-blokken (kontakt-info).
const kundeservice = [
  "Se butikker og åbningstider",
  "Mail: kundeservice@sport24.dk",
  "Telefon: 3021 3850",
  "Chat: Start chat",
];

// Linkliste – objekter med både label og href, så vi kan lade enkelte
// links pege på rigtige sider (fx /readme), mens andre er placeholdere.
const kundeserviceLinks = [
  { label: "Kundeservice og info", href: "#" },
  { label: "Køb gavekort", href: "#" },
  { label: "Konkurrencer", href: "#" },
  { label: "Job", href: "#" },
  { label: "Bliv elev", href: "#" },
  { label: "Læs mere om siden", href: "/readme" },
];

// Hjælp-blokken – rene strenge da alle linker til "#".
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

// Klub-blokken. `null`-elementet bruges som visuel afstand mellem
// "Klub SPORT 24"-relaterede links og de generelle "Om"-links.
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
      {/* ---------- Mørkt promo-bånd øverst i footeren ---------- */}
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

      {/* ---------- Hovedindhold: 4 kolonner på desktop ---------- */}
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-4">
        {/* Kolonne 1: brand, beskrivelse, sociale medier og e-mærke */}
        <div>
          <a href="/" className="inline-flex items-center" aria-label="SPORT 24">
            <img
              src={sport24Logo}
              alt="SPORT 24"
              width={400}
              height={125}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto"
            />
          </a>
          <p className="mt-6 text-sm leading-relaxed text-foreground/80">
            SPORT 24 er en danskejet og landsdækkende sportskæde. Vi er hele familiens sportskæde, som
            hylder glæden ved at bevæge sig. Hos os skal sport føles sjovt og bringe glæde. Uanset niveau og
            ambitioner hjælper vi med at dyrke glæden.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-foreground hover:text-brand-red">
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Instagram" className="text-foreground hover:text-brand-red">
              <Instagram className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" aria-label="YouTube" className="text-foreground hover:text-brand-red">
              <Youtube className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          {/* e-mærket-badge – trustmark der vises som "kvalitetsstempel" */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#1aa3d6] px-3 py-2 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1aa3d6] font-bold">
              e
            </span>
            <span className="text-sm font-semibold">e-mærket</span>
          </div>
        </div>

        {/* Kolonne 2: Kundeservice + telefon-åbningstider + link-liste */}
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
              <li key={item.label}>
                <a href={item.href} className="hover:text-brand-red">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolonne 3: Hjælp/FAQ-links */}
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

        {/* Kolonne 4: Klub SPORT 24 + Om-links (adskilt af null-spacer) */}
        <div>
          <h3 className="text-lg font-bold">Klub SPORT 24</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {klub.map((item, i) =>
              item === null ? (
                // Tom li bruges som visuel afstand mellem to grupper af links
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

      {/* Disclaimer – nederst på siden, gør det klart at det er en demo */}
      <div className="border-t border-border bg-background py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Denne hjemmeside er udelukkende til skolebrug og repræsentere ikke SPORT24
        </p>
      </div>
    </footer>
  );
}

/**
 * CategoryNavSections.tsx
 * ----------------------------------------------------------------------------
 * Navigation med 3 kategorier (Spillertøj, Merchandise, Alt fra SAH) efterfulgt
 * af 3 tekstsektioner — bygget efter strukturen på
 * https://www.sport24.dk/kategori/silkeborg-if-shop/merchandise
 */
import { Link } from "@tanstack/react-router";

type CatKey = "spillertoj" | "merchandise" | "sah";

const NAV: { key: CatKey; label: string; to: string }[] = [
  { key: "spillertoj", label: "Spillertøj", to: "/spillertoj" },
  { key: "merchandise", label: "Merchandise", to: "/merchandise" },
  { key: "sah", label: "Alt fra SAH", to: "/se-alt-sah" },
];

const SECTIONS: {
  key: CatKey;
  heading: string;
  text: string;
  links: { label: string; to: string }[];
}[] = [
  {
    key: "spillertoj",
    heading: "HELE KOLLEKTIONEN ER LANDET",
    text:
      "Ventetiden er endelig ovre! Vi er stolte af at præsentere et helt nyt og lokalt udvalg af SAH-merchandise. Uanset om du er til det rene, minimalistiske hverdagslook eller bærer vores nye fan-mønster med stolthed, har vi designet noget, der samler os som klub.",
    links: [
      { label: "Gå til Merchandise", to: "/merchandise" },
      { label: "Gå til Alt fra SAH", to: "/se-alt-sah" },
    ],
  },
  {
    key: "merchandise",
    heading: "BÆR FÆLLESSKABET I HVERDAGEN",
    text:
      "Stoltheden rækker meget længere end de 60 minutter på banen. Vores nye, unikke fan-mønster er bygget af halve cirkler, der smelter sammen og bliver hele. Det symboliserer, at vi altid løfter i flok. Det markante design gør det nemt at genkende andre fans i bybilledet, og fungerer som den perfekte anledning til at falde i snak.",
    links: [
      { label: "Gå til Spillertøj", to: "/spillertoj" },
      { label: "Gå til Alt fra SAH", to: "/se-alt-sah" },
    ],
  },
  {
    key: "sah",
    heading: "MODERNE STREETWEAR TIL DIN HVERDAG",
    text:
      "Til dig, der ønsker at vise dit tilhørsforhold med et mere diskret og stilrent udtryk, har vi skabt en dedikeret streetwear-linje. Det er moderne hverdagsdesign, der nemt integreres i din almindelige garderobe. Gode stunder, gode venner og god stil – tag holdet med dig overalt.",
    links: [
      { label: "Gå til Spillertøj", to: "/spillertoj" },
      { label: "Gå til Merchandise", to: "/merchandise" },
    ],
  },
];

export function CategoryNavSections() {
  return (
    <section className="bg-white text-[#1A202A]">
      {/* Navigation – sporty, ALL CAPS, navy underline on hover */}
      <nav
        aria-label="SAH kategorier"
        className="border-b border-neutral-200"
      >
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-4 sm:gap-8 sm:py-6">
          {NAV.map((n) => (
            <li key={n.key}>
              <Link
                to={n.to}
                className="inline-block px-3 py-2 text-sm font-extrabold uppercase tracking-wider text-[#1A202A] transition hover:text-[#1A202A] hover:underline underline-offset-8 sm:text-base"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Tre sub-sektioner */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {SECTIONS.map((s, i) => (
          <article
            key={s.key}
            id={s.key}
            className={
              "text-center " +
              (i > 0 ? "mt-12 border-t border-neutral-200 pt-12 sm:mt-16 sm:pt-16" : "")
            }
          >
            <h2 className="text-2xl font-extrabold uppercase tracking-wide text-[#1A202A] sm:text-3xl md:text-4xl">
              {s.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-[Noto_Sans,sans-serif] text-base leading-relaxed text-neutral-700 sm:text-lg">
              {s.text}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {s.links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-semibold text-[#1A202A] underline underline-offset-4 transition hover:text-[#1A202A]/70 sm:text-base"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

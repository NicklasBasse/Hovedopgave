import { Link } from "@tanstack/react-router";
import jersey from "@/assets/sah/tile-sah-spillertoj.webp";
import merch from "@/assets/sah/tile-sah-merchandise.webp";
import logo from "@/assets/sah/tile-sah-logo.webp";

type CatKey = "spillertoj" | "merchandise" | "sah";

const NAV: { key: CatKey; label: string; to: string; img: string }[] = [
  { key: "spillertoj", label: "Spillertøj", to: "/spillertoj", img: jersey },
  { key: "merchandise", label: "Merchandise", to: "/merchandise", img: merch },
  { key: "sah", label: "Alt fra SAH", to: "/se-alt-sah", img: logo },
];

const SECTIONS: {
  key: CatKey;
  heading: string;
  text: string;
  links: { label: string; to: string }[];
}[] = [
  {
    key: "spillertoj",
    heading: "DEN OFFICIELLE SPILLERDRAGT",
    text:
      "Her finder du holdets officielle kamptøj. Men stoltheden over SAH rækker meget længere end de 60 minutter på banen. Derfor har vi skabt et helt nyt, dedikeret merchandise-kollektion til dig som fan. Vi har skåret larmen væk og designet et univers, der lader dig vise dit tilhørsforhold i hverdagen. Udforsk vores nye fan-mønster eller det moderne streetwear-look herunder.",
    links: [
      { label: "Gå til Merchandise", to: "/merchandise" },
      { label: "Gå til Alt fra SAH", to: "/se-alt-sah" },
    ],
  },
  {
    key: "merchandise",
    heading: "HELE KOLLEKTIONEN ER LANDET",
    text:
      "Ventetiden er endelig ovre! Vi er stolte af at præsentere et helt nyt og lokalt udvalg af SAH-merchandise. Uanset om du er til det rene, minimalistiske hverdagslook eller bærer vores nye fan-mønster med stolthed, har vi designet noget, der samler os som klub.",
    links: [
      { label: "Gå til Spillertøj", to: "/spillertoj" },
      { label: "Gå til Alt fra SAH", to: "/se-alt-sah" },
    ],
  },
  {
    key: "sah",
    heading: "FRA HALLEN TIL HVERDAGEN",
    text:
      "Som en forlængelse af vores nye fan-mønster, byder kollektionen også på en rendyrket streetwear-linje. Vi ved nemlig, at vores fans er forskellige. Til dig, der ønsker et mere diskret og stilrent udtryk, har vi skabt moderne hverdagsdesign, der nemt integreres i din almindelige garderobe. Gode stunder, gode venner og god stil – uanset hvilket look du vælger, bærer du fællesskabet med dig overalt.",
    links: [
      { label: "Gå til Spillertøj", to: "/spillertoj" },
      { label: "Gå til Merchandise", to: "/merchandise" },
    ],
  },
];

type Props = {
  showNavigation?: boolean;
  activeKey?: CatKey;
};

export function CategoryNavSections({ showNavigation = true, activeKey }: Props) {
  const sections = activeKey
    ? SECTIONS.filter((section) => section.key === activeKey)
    : SECTIONS;

  return (
    <section className="bg-background text-sah-navy">
      <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-10 md:pb-20 md:pt-14">
        {showNavigation && (
          <nav aria-label="SAH kategorier" className="mb-12 md:mb-16">
            <ul className="flex gap-5 md:gap-10 lg:gap-12">
              {NAV.map((n) => (
                <li key={n.key}>
                  <Link to={n.to} className="group flex w-[92px] shrink-0 flex-col items-center text-center md:w-[124px] lg:w-[140px]">
                    <span className="flex h-[92px] w-[92px] items-center justify-center overflow-hidden rounded-full bg-muted md:h-[124px] md:w-[124px] lg:h-[140px] lg:w-[140px]">
                      <img
                        src={n.img}
                        alt=""
                        aria-hidden="true"
                        width={140}
                        height={140}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-3 text-sm font-bold text-foreground">{n.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="max-w-[760px]">
        {sections.map((s, i) => (
          <article
            key={s.key}
            id={s.key}
            className={
              "text-left " +
              (i > 0 ? "mt-9 pt-1 md:mt-11" : "")
            }
          >
            <h2 className="font-sans text-[22px] font-black uppercase leading-tight text-sah-navy md:text-[28px]">
              {s.heading}
            </h2>
            <p className="mt-3 max-w-[720px] font-sans text-[15px] leading-7 text-foreground/75 md:text-base md:leading-8">
              {s.text}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {s.links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-semibold text-sah-navy underline underline-offset-4 transition hover:text-sah-navy/70 md:text-[15px]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

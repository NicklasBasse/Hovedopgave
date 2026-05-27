/**
 * use-mobile.tsx
 * ----------------------------------------------------------------------------
 * React-hook der svarer på spørgsmålet "er brugeren på en mobil-skærm?".
 *
 * Hvorfor er den nødvendig?
 *   - Tailwind kan håndtere langt det meste responsive design via CSS-klasser
 *     (md:flex, lg:grid osv.), men nogle steder skal selve JSX-strukturen
 *     ændres (fx vis et drawer i stedet for et dropdown). Det skal afgøres
 *     i JavaScript — og det er præcis hvad denne hook gør.
 *
 * Hooken bruger `window.matchMedia` (browserens native media-query-API) for
 * at lytte effektivt på viewport-ændringer — det er hurtigere end at sætte
 * en `resize`-handler og selv tjekke width.
 */
import * as React from "react";

// Brækpunktet "mobil" stopper ved 767px. Matcher Tailwinds standard `md:` (768px).
// Lægges som konstant så vi ikke risikerer at have to forskellige værdier i koden.
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // State: starter som `undefined` så vi tydeligt kan se "endnu ikke målt".
  // Det bruges fx under SSR hvor `window` ikke findes.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Opret en MediaQueryList for "skærm-bredde mindre end 768px".
    // Browseren holder selv styr på om matchet ændrer sig — effektivt og uden polling.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler: kører hver gang viewport krydser brækpunktet.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Begynd at lytte på ændringer (rotation, vinduesresize, devtools-toggle …).
    mql.addEventListener("change", onChange);

    // Kør målingen ÉN gang straks, så vi har en korrekt startværdi.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup: fjern lytteren når komponenten unmounter — undgår memory leaks.
    return () => mql.removeEventListener("change", onChange);
  }, []); // tomt dependency-array → effekten kører kun ved mount/unmount

  // `!!isMobile` tvinger undefined → false, så returtypen er ren boolean.
  return !!isMobile;
}

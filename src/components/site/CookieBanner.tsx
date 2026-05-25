/**
 * CookieBanner.tsx
 * ----------------------------------------------------------------------------
 * Cookie-samtykke banner der vises i bunden af siden, første gang en bruger
 * besøger sitet (dvs. når der endnu ikke findes en samtykke-cookie).
 *
 * Banneret tilbyder de tre standardvalg, som GDPR/ePrivacy lægger op til:
 *   - "Accepter alle"  → sætter alle kategorier til true
 *   - "Afvis"          → kun nødvendige cookies tillades
 *   - "Tilpas"         → bruger kan slå hver kategori til/fra individuelt
 *
 * Banneret rendres ind via __root.tsx, så det er tilgængeligt på alle sider.
 */
import { useEffect, useState } from "react";
import { getConsent, saveConsent, type ConsentCategories } from "@/lib/cookies";

// Default-værdier brugt i "Tilpas"-tilstanden, før brugeren har rørt ved noget.
// `necessary` er altid `true`, da den dækker nødvendige cookies (fx samtykket selv).
const DEFAULT: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export function CookieBanner() {
  // Styring af om banneret overhovedet er synligt
  const [open, setOpen] = useState(false);
  // Styring af om vi viser den udvidede "Tilpas"-visning
  const [customize, setCustomize] = useState(false);
  // Lokal kopi af brugerens valg mens de tilpasser
  const [prefs, setPrefs] = useState<ConsentCategories>(DEFAULT);

  // Når komponenten mounter: tjek om brugeren allerede har taget stilling.
  // Hvis ikke (getConsent() === null) → vis banneret.
  useEffect(() => {
    if (!getConsent()) setOpen(true);
  }, []);

  // Returnér null så banneret helt forsvinder fra DOM når det ikke skal vises.
  if (!open) return null;

  // Tre handlers – én pr. knap. Alle gemmer samtykket og lukker banneret.
  const acceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: true, marketing: true });
    setOpen(false);
  };
  const rejectAll = () => {
    saveConsent({ necessary: true, functional: false, analytics: false, marketing: false });
    setOpen(false);
  };
  const savePrefs = () => {
    saveConsent(prefs);
    setOpen(false);
  };

  return (
    // role="dialog" + aria-label gør banneret tilgængeligt for skærmlæsere.
    // z-[100] sikrer det lægger sig oven på alt andet indhold på siden.
    <div
      role="dialog"
      aria-label="Cookie samtykke"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background shadow-2xl"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
        {!customize ? (
          // ----- STANDARDVISNING: kort tekst + tre knapper -----
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-base font-semibold text-foreground">Vi bruger cookies</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Vi anvender cookies for at huske dine valg – bl.a. til at gemme varer i din kurv.
                Du kan acceptere alle, afvise ikke-nødvendige eller tilpasse dine valg.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={rejectAll}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Afvis
              </button>
              <button
                onClick={() => setCustomize(true)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Tilpas
              </button>
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Accepter alle
              </button>
            </div>
          </div>
        ) : (
          // ----- TILPAS-VISNING: liste med checkbokse pr. kategori -----
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Tilpas cookies</h2>
              <p className="mt-1 text-sm text-muted-foreground">Vælg hvilke cookies du vil tillade.</p>
            </div>
            <div className="space-y-3">
              {/* Konfiguration af de fire kategorier mappes ud som rækker.
                  "necessary" er disabled, fordi den ikke kan fravælges. */}
              {([
                { key: "necessary", title: "Nødvendige", desc: "Kræves for at siden fungerer. Kan ikke fravælges.", disabled: true },
                { key: "functional", title: "Funktionelle", desc: "Husker valg som varer i din kurv.", disabled: false },
                { key: "analytics", title: "Statistik", desc: "Hjælper os med at forstå brug af siden.", disabled: false },
                { key: "marketing", title: "Marketing", desc: "Bruges til personaliseret indhold og annoncer.", disabled: false },
              ] as const).map((c) => (
                <label key={c.key} className="flex items-start justify-between gap-4 rounded-md border border-border p-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4"
                    checked={prefs[c.key]}
                    disabled={c.disabled}
                    // Opdaterer kun den enkelte nøgle i prefs-objektet (immutable update).
                    onChange={(e) => setPrefs((p) => ({ ...p, [c.key]: e.target.checked }))}
                  />
                </label>
              ))}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setCustomize(false)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Tilbage
              </button>
              <button
                onClick={savePrefs}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Gem valg
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

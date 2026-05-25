/**
 * PromoBar.tsx
 * ----------------------------------------------------------------------------
 * En smal gul stribe i toppen af alle sider (over SiteHeader) som viser et
 * tilbud/markedsføringsbudskab. Holdt bevidst minimalistisk – kun en linje
 * tekst – så den ikke skygger for resten af headeren.
 */
export function PromoBar() {
  return (
    <div className="w-full bg-brand-yellow text-foreground">
      <div className="mx-auto max-w-[1440px] px-6 py-2.5 text-center text-[13px] font-semibold tracking-wide">
        Kun for medlemmer af Klub SPORT 24 - SPAR 20% PÅ ALT*
      </div>
    </div>
  );
}

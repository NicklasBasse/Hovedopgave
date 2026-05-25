import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PromoBar } from "@/components/site/PromoBar";
import { Info, School, ShoppingBag, ShieldCheck, Cookie } from "lucide-react";

export const Route = createFileRoute("/readme")({
  head: () => ({
    meta: [
      { title: "Læs mere om SAH Shop | SPORT 24" },
      {
        name: "description",
        content:
          "Læs mere om SAH Shop – en skoleprojekt-webshop for Skanderborg AGF Håndbold hos SPORT 24.",
      },
      { property: "og:title", content: "Læs mere om SAH Shop | SPORT 24" },
      {
        property: "og:description",
        content: "Læs mere om SAH Shop – en skoleprojekt-webshop for Skanderborg AGF Håndbold hos SPORT 24.",
      },
    ],
  }),
  component: ReadMePage,
});

function ReadMePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <PromoBar />
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-6 py-16">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-black md:text-5xl">Læs mere om SAH Shop</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            En skoleprojekt-webshop udviklet for Skanderborg AGF Håndbold i samarbejde med SPORT 24.
          </p>
        </div>

        {/* Info cards */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10">
              <School className="h-6 w-6 text-brand-red" />
            </div>
            <h2 className="mt-6 text-xl font-bold">Formål</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Denne hjemmeside er udelukkende til skolebrug. Den repræsenterer ikke den rigtige SPORT 24,
              men er et studieprojekt udviklet for at demonstrere moderne webudvikling, e-commerce flows og
              responsivt design med React og TanStack.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10">
              <ShoppingBag className="h-6 w-6 text-brand-red" />
            </div>
            <h2 className="mt-6 text-xl font-bold">Produkter</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Webshoppen viser et fiktivt udvalg af officielt SAH-spillertøj og merchandise. Alle produkter,
              billeder, tekster og priser er til illustrativt brug og kan afvige fra virkeligheden.
              Produktbilleder er genereret eller hentet fra åbne kilder.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10">
              <Cookie className="h-6 w-6 text-brand-red" />
            </div>
            <h2 className="mt-6 text-xl font-bold">Cookies og privatliv</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Vi bruger cookies til at huske din indkøbskurv (funktionelle cookies). Du kan til enhver tid
              ændre dit cookie-samtykke via banneret i bunden af siden eller knappen "Opdatér cookie samtykke"
              i footeren. Der indsamles ingen personlige data.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10">
              <ShieldCheck className="h-6 w-6 text-brand-red" />
            </div>
            <h2 className="mt-6 text-xl font-bold">Køb og betaling</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Kurv-funktionen på siden er kun til demonstration. Der foregår ingen reel handel, og du kan
              ikke gennemføre et køb. Ingen betalingsinformationer behandles, og ingen ordrer afsendes.
              Kontakt venligst den rigtige SPORT 24 for faktiske køb.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-muted p-8 text-center">
          <Info className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <strong>Disclaimer:</strong> Denne hjemmeside er udelukkende til skolebrug og repræsenterer
            ikke SPORT 24 eller Skanderborg AGF Håndbold officielt. Alle varemærker, logoer og produkter
            tilhører deres respektive ejere.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

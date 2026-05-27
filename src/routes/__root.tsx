/**
 * __root.tsx
 * ----------------------------------------------------------------------------
 * Den absolutte rod-rute for hele appen i TanStack Router. Alt indhold –
 * uanset hvilken side brugeren besøger – rendres inde i denne rute.
 *
 * Her gør vi tre vigtige ting:
 *   1) Definerer HTML-skallen (<html>, <head>, <body>) via `shellComponent`.
 *   2) Sætter standard meta-tags (titel, beskrivelse, Open Graph, Twitter).
 *   3) Pakker hele appen ind i providers (QueryClientProvider) og rendrer
 *      det globale cookie-banner samt et "Spring til indhold"-skip link
 *      for tilgængelighed.
 *
 * Vi har også 404- og fejlskærme defineret her, så de er centrale og
 * konsistente på tværs af hele sitet.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import appCss from "../styles.css?url";
// CookieBanner lazy-loades så den ikke blokerer initial JS (Lighthouse:
// "Reduce unused JavaScript"). Banneret er under-the-fold og ikke kritisk.
const CookieBanner = lazy(() =>
  import("@/components/site/CookieBanner").then((m) => ({ default: m.CookieBanner })),
);

/**
 * 404-skærm. Vises hvis brugeren rammer en URL der ikke findes.
 * Designet er centreret, venligt og følger sitets visuelle identitet
 * med mørkt tema, semantiske farve-tokens og en klar CTA tilbage til forsiden.
 */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        {/* Stort 404-tal — bruger accent-farven for at skabe visuel vægt */}
        <h1
          className="text-[10rem] font-black leading-none tracking-tighter text-primary"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          404
        </h1>

        {/* Underoverskrift på dansk */}
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Siden blev ikke fundet
        </h2>

        {/* Forklarende tekst — guider brugeren videre */}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Den side du leder efter, findes ikke eller er blevet flyttet.
          Tjek URL'en, eller gå tilbage til forsiden.
        </p>

        {/* CTA-knap til forsiden — samme styling som primære knapper på sitet */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Gå til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Global fejl-skærm. Vises hvis en rute kaster en uventet fejl.
 * Tilbyder en "Try again"-knap der:
 *   - kalder router.invalidate() → tvinger loaders til at køre igen
 *   - kalder reset() → nulstiller error boundary
 */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error); // log til konsollen så udviklere kan debugge
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Selve rod-ruten. `createRootRouteWithContext` giver os mulighed for at
 * tildele en typed kontekst (her QueryClient) til alle børneruter.
 */
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // head() sætter <head>-indhold der gælder hele sitet (medmindre en
  // underside overskriver det). OG-tags og Twitter Cards bruges når
  // siden deles på sociale medier.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "This application replicates the Sport 24 landing page, offering a visually identical experience." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "This application replicates the Sport 24 landing page, offering a visually identical experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "This application replicates the Sport 24 landing page, offering a visually identical experience." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68690062-3f34-4560-8630-b53595d81321/id-preview-cd7ae605--820c6175-e1b3-4210-9376-9b0c903c3229.lovable.app-1778856792417.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/68690062-3f34-4560-8630-b53595d81321/id-preview-cd7ae605--820c6175-e1b3-4210-9376-9b0c903c3229.lovable.app-1778856792417.png" },
    ],
    // Indlæs Tailwind-genereret CSS én gang for hele appen
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,        // selve <html>-skallen
  component: RootComponent,         // hvad der renderes inde i <body>
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Den allerøverste HTML-skal. TanStack Router kalder denne under SSR
 * for at producere det færdige HTML-dokument.
 * lang="da" → fortæller browseren at sidens sprog er dansk
 * (vigtigt for skærmlæsere og SEO).
 */
function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Det "rigtige" rod-komponent, der wrapper alle ruter med providers.
 * - QueryClientProvider giver alle børn adgang til React Query (cache, fetch).
 * - <Outlet /> er det sted hvor den aktive underrute (fx forsiden) rendres.
 * - <CookieBanner /> ligger udenfor <main> så den ikke forstyrrer indholdet.
 */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Skip-link: skjult indtil tastatur-fokus, så tastatur-brugere
          kan springe forbi headeren direkte til hovedindholdet
          (WCAG 2.4.1 Bypass Blocks). Peger på #main-content som
          den enkelte underside selv eksponerer på sit <main>. */}
      <a href="#main-content" className="skip-link">Spring til indhold</a>
      {/* Outlet er en logisk container – IKKE et <main>-element –
          så hver side kan eje præcis ét <main>-landemærke uden
          duplikering (WCAG 1.3.1 / ARIA landmark best practice). */}
      <Outlet />
      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
    </QueryClientProvider>
  );
}

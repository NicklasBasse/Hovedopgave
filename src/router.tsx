import { QueryClient } from "@tanstack/react-query";
import { createRouter, Link, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Global fallback 404 — vises når routeren ikke finder en matchende rute.
 * Svarer til `notFoundComponent` på rod-ruten, men fungerer som
 * sikkerhedsnet hvis en underrute ikke selv håndterer 404.
 */
function DefaultNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <h1
          className="text-[10rem] font-black leading-none tracking-tighter text-primary"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          404
        </h1>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Siden blev ikke fundet
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Den side du leder efter, findes ikke eller er blevet flyttet.
        </p>
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
 * Global fallback fejlskærm — vises når en rute kaster en uventet fejl
 * og ikke selv har defineret en `errorComponent`.
 */
function DefaultError({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Siden kunne ikke indlæses
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Noget gik galt. Prøv igen, eller gå tilbage til forsiden.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Prøv igen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Gå til forsiden
          </a>
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: DefaultNotFound,
    defaultErrorComponent: DefaultError,
  });

  return router;
};

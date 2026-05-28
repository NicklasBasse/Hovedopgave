/**
 * Render en simpel HTML-fejlside.
 */

export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="da">
<head><meta charset="utf-8"><title>Fejl</title></head>
<body style="font-family:system-ui,sans-serif;padding:2rem;text-align:center;">
  <h1>Der opstod en fejl</h1>
  <p>Prøv at genindlæse siden.</p>
</body>
</html>`;
}

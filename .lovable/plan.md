# AC Horsens Landing Page Clone

Recreate the Sport24 AC Horsens landing page (https://www.sport24.dk/achorsens/) at `/` with the same structure, spacing, colors, and Danish copy. Product/hero images will be AI-generated placeholders (yellow/black football themed) since the originals are copyrighted.

## Sections (top to bottom)

1. **Yellow promo bar** — `Kun for medlemmer af Klub SPORT 24 - SPAR 20% PÅ ALT*` (black text on bright yellow)
2. **Header** — burger icon, nav (Kvinder, Mænd, Børn, Aktiviteter, Gode priser), centered SPORT 24 red logo, search bar (`Hvad leder du efter?`), account / wishlist / cart icons
3. **Hero banner** — full-width AC Horsens topbillede image, with overlay product card (right side) for "AC Horsens Hjemmebanetrøje 25/26 — 455 kr. — Skarp Pris", H1 visually hidden "AC Horsens forside"
4. **Intro block** — small label `AC Horsens`, H2 `Klæd dig i AC Horsens farver`, paragraph `Tilgængelig online og i SPORT 24 - AC Horsens - Sammen skaber vi minder`, three pill buttons: Spillertøj / Merch / Se alt ACH
5. **3 circular category tiles** — Spillertrøjer, Merchandise, Se alt ACH
6. **Product carousel #1** — H2 `ACH-produkter i fokus`, subtitle `(72 produkter) — Stå bag klubben...`, horizontal scroll of 10 product cards (name, price, badge), prev/next arrows, `Se alt fra ACH` button + tall side image
7. **Split section #1 (image left, text right)** — small label `Hjemmebanetrøjen`, H2 `Når design og fodbold smelter sammen`, paragraph, CTA `Køb spillertrøjen`
8. **Product carousel #2** — H2 `ACH Spillertrøjer`, subtitle `(19 produkter) — AC Horsens - ren gul stolthed...`, 11 product cards, `Find din trøje her` + side image
9. **Split section #2 (text left, image right)** — small label `ACH MERCHANDISE`, H2 `ACH - Sammen skaber vi minder`, paragraph, CTA `Se alt merch`
10. **Footer-ish closer** — H2 `Altid gode priser, hurtig levering og 365 dages fuld returret`

All copy in Danish, exactly as on the source page (including "Undtaget af kampagnen", "Skarp Pris", "KLUBPRIS - SPAR 20%", "Slutsalg - SPAR 50%", etc.).

## Design tokens (src/styles.css)

- `--background`: #ffffff
- `--foreground`: #1a1a1a (near-black)
- `--primary` (Sport24 red): oklch(~0.55 0.22 25) → #E30613
- `--accent` (promo yellow): #FFE600
- `--muted`: #f5f5f5
- `--border`: #e5e5e5
- Radius: pill buttons (9999px), 8px on cards
- Font: system sans (Sport24 uses a humanist sans; use `Inter` + bold weights to approximate). Headings bold, generous tracking on small uppercase labels.
- Container max-width ~1440px, horizontal padding 24px

## Files

- `src/routes/index.tsx` — replace placeholder with full landing composition
- `src/components/site/PromoBar.tsx`
- `src/components/site/SiteHeader.tsx`
- `src/components/site/Hero.tsx`
- `src/components/site/CategoryTiles.tsx`
- `src/components/site/ProductCarousel.tsx` (reused twice, takes `title`, `subtitle`, `products[]`, `cta`, `sideImage`)
- `src/components/site/SplitFeature.tsx` (reused twice with `imageSide: 'left' | 'right'`)
- `src/components/site/IntroBlock.tsx`
- `src/components/site/ClosingHeading.tsx`
- `src/styles.css` — add tokens above
- `src/routes/__root.tsx` — update `<title>` to `AC Horsens Shop | SPORT 24` and meta description

## Images (generated)

All saved under `src/assets/ach/`:
- `hero.jpg` — yellow/black football stadium topbillede (1920×1080)
- `tile-spillertroj.png`, `tile-merch.png`, `tile-logo.png` — 600×600 round category tiles
- `section-left.jpg`, `section-right.jpg` — 1920×1080 split-section images
- `carousel-side-1.jpg`, `carousel-side-2.jpg` — 480×600 tall side cards
- ~12 product shots (yellow football jerseys, shorts, socks, balls, cap, umbrella, blanket) at 600×600

Generated with `imagegen` `fast` tier (no text in images). Filenames imported as ES modules so Vite hashes them.

## Out of scope

- No real navigation / cart / search functionality (static visual clone)
- No responsive mobile menu drawer (header collapses to burger + logo + icons on mobile)
- No backend, no Lovable Cloud

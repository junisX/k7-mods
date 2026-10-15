# K7 Mods — Minecraft-Mods

Dunkle, minimalistische One-Pager-Seite mit direkten **Download-Buttons** für deine
Minecraft-Mods (aktuell: No Totem POP Animation, InfiniteKR's Auktion).

**Stack:** React 19 · Vite 6 · TypeScript · Tailwind CSS · lucide-react
**Ohne** Framework-Ballast: Animations-Einblendungen laufen über CSS + IntersectionObserver
(JS-Bundle ~75 KB gzip), SEO-, A11y- und Reduced-Motion-Basics sind eingebaut.

---

## Lokal starten

```bash
npm install     # einmalig
npm run dev     # Entwicklungsserver → http://localhost:5173
npm run build   # Produktionsbuild nach ./dist
npm run preview # gebaute Version lokal ansehen
```

---

## Inhalte ändern (das Wichtigste)

**Alle Inhalte liegen in einer einzigen Datei: [`src/data/site.ts`](src/data/site.ts)**

| Was | Wo |
| --- | --- |
| Name / Slogan | `site.name`, `site.tagline` |
| Deine Profile (CurseForge, GitHub …) | `site.links` |
| Statistik-Zahlen im Hero | `stats` (rechnet `projects` automatisch aus) |
| **Deine Projekte** | `array projects` |
| Farben (Akzentgrün, Flächen) | `tailwind.config.js` → `colors` |

Ein neues Projekt einfach als Objekt anhängen:

```ts
{
  slug: 'mein-projekt',          // eindeutiger Kurzname (für Cover-Muster/Namen)
  title: 'Mein Mod',
  category: 'mod',               // 'mod' | 'modpack' | 'plugin' | 'datapack'
  short: 'Ein-Satz-Beschreibung.',
  versions: ['1.21.4'],
  loaders: ['Fabric'],
  meta: 'v1.0.0 · 8,3 KB',       // kleine Kennzahl neben dem Download-Icon
  coverSeed: 4,                  // 0–9, erzeugt das Pixel-Muster
  accent: '#66C93F',             // Farbe des Covers
  icon: iconMeinMod,             // optional: quadratisches Icon (PNG-Import)
  coverImage: coverScreenshot,   // optional: Screenshot statt Pixel-Muster
  links: [
    { label: 'Download', url: 'https://github.com/…/releases/download/…/mod.jar' },
    { label: 'GitHub', url: 'https://github.com/…' },
  ],
},
```

Bilder brauchst du nicht – ohne `coverImage` generiert `src/components/PixelCover.tsx`
ein Pixel-Muster. Für einen Screenshot das Bild nach `src/assets/` legen, oben
importieren und als `coverImage` eintragen (ideales Seitenverhältnis: ca. 16:9).

---

## Veröffentlichen (GitHub Pages)

Die Seite baut und deployed automatisch über GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. Repo auf GitHub anlegen und pushen:
   ```bash
   git init
   git add .
   git commit -m "K7 Mods Website"
   git branch -M main
   git remote add origin https://github.com/<DEIN-USER>/<REPO>.git
   git push -u origin main
   ```
2. In GitHub: **Settings → Pages → Source: GitHub Actions** auswählen.
3. Nach dem ersten Push baut die Action → die Seite liegt unter
   `https://<DEIN-USER>.github.io/<REPO>/`

Alternativ als eigene Domain: in den Repo-Einstellungen unter *Pages → Custom
domain* eintragen, DNS auf `/<REPO>` oder CNAME zeigen.

> `vite.config.ts` enthält bereits `base: './'`, damit die Assets auf GitHub
> Pages unter einem Subpfad korrekt laden.

---

## Struktur

```
index.html                Meta/SEO/OG, Fonts, JSON-LD, Favicon
public/
├── robots.txt            Crawler-Hinweise + Sitemap-Referenz
├── sitemap.xml           Sitemap
└── 404.html              leitet auf die Startseite um
src/
├── App.tsx               Seitenzusammenbau + Skip-Link
├── data/site.ts          ⬅ alle Inhalte (Projekte, Links, Zahlen)
├── index.css             Tailwind-Basis, Utilities, Einblend-Animationen
└── components/
    ├── Header.tsx        sticky Navigation + Mobile-Menü
    ├── Hero.tsx          Headline, CTA, Statistik
    ├── Projects.tsx      automatische Filter + Karten-Grid
    ├── Reveal.tsx        Einblenden beim Scrollen (CSS/IO)
    ├── PixelCover.tsx    generiertes Pixel-Cover bzw. Bild
    └── Footer.tsx        Footer + externe Links
```

### Was eingebaut ist

- **Download zuerst:** pro Karte ein grüner Download-Button, Rest dezent
- **Filter automatisch:** nur Kategorien mit echten Projekten, mit Anzahl
- **SEO:** Description, Open Graph, Twitter Card, Canonical, `robots.txt`,
  `sitemap.xml`, JSON-LD (`WebSite` + `SoftwareApplication`)
- **A11y:** Kontrast-WCAG-geprüft, Skip-Link, `aria-*`, Tastatur-Focus,
  `prefers-reduced-motion` respektiert
- **Performance:** ~75 KB JS gzip, nur lokal gehostete Assets, gehashte Dateinamen

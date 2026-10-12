# K7 Mods — Minecraft-Projekte

Dunkle, minimalistische One-Pager-Website zur Präsentation deiner Minecraft-Projekte
(Mods, Modpacks, Plugins, Datapacks) mit Links zu CurseForge, Modrinth & GitHub.

**Stack:** React 19 · Vite 6 · TypeScript · Tailwind CSS · Framer Motion · lucide-react

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
| Name / Slogan / Beschreibung | `site.name`, `site.tagline`, `site.description` |
| Deine Profile (CurseForge, GitHub …) | `site.links` |
| Statistik-Zahlen im Hero | `site.stats` |
| **Deine Projekte** | `array projects` |
| Farben (Akzentgrün, Flächen) | `tailwind.config.js` → `colors` |

Ein neues Projekt einfach als Objekt anhängen:

```ts
{
  slug: 'mein-projekt',          // eindeutiger Kurzname (für Cover-Muster/Namen)
  title: 'Mein Mod',
  category: 'mod',               // 'mod' | 'modpack' | 'plugin' | 'datapack'
  short: 'Ein-Satz-Beschreibung.',
  description: 'Längere Beschreibung …',
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
index.html                Einstieg, Fonts, Favicon
src/
├── App.tsx               Seitenzusammenbau
├── data/site.ts          ⬅ alle Inhalte (Projekte, Links, Texte)
├── index.css             Tailwind-Basis, Utilities (.card, .btn, .eyebrow)
└── components/
    ├── Header.tsx        sticky Navigation + Mobile-Menü
    ├── Hero.tsx          Headline, CTA, Statistik
    ├── Projects.tsx      Filter + Karten-Grid
    ├── PixelCover.tsx    generiertes Pixel-Cover pro Projekt
    ├── About.tsx         „Über“-Sektion
    └── Footer.tsx        Footer + externe Links
```

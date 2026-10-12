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
  downloads: '1.2k',
  coverSeed: 4,                  // 0–9, erzeugt das Pixel-Muster
  accent: '#66C93F',             // Farbe des Covers
  links: [
    { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft/…' },
  ],
},
```

Bilder werden nicht gebraucht – jedes Cover ist ein generiertes Pixel-Muster
(`src/components/PixelCover.tsx`). Möchtest du echte Screenshots, ersetze die
`PixelCover`-Komponente durch ein `<img>`.

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

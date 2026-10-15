/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  K7 MODS — ZENTRALE KONFIGURATION
 *
 *  Hier änderst du alles Wichtigste:
 *   • site.name / site.tagline  → Name & Slogan
 *   • site.links                → deine echten Profile (leere URL = Button aus)
 *   • projects[]                → deine Minecraft-Projekte
 *   • stats                     → Hero-Kennzahlen (rechnet sich selbst aus)
 *
 *  Neues Projekt: Objekt in `projects` kopieren und anpassen.
 *  Danach: `npm run dev` zum Testen, `npm run build` für den Production-Build.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Category = 'mod' | 'modpack' | 'plugin' | 'datapack';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  short: string;
  versions: string[];
  loaders: string[];
  /** kleine Kennzahl neben dem Download-Icon, z.B. "v1.0.0 · 8,3 KB" */
  meta: string;
  /** Zahl von 0–9 → steuert das Pixel-Muster im Cover */
  coverSeed: number;
  /** Hex-Farbe für das Cover, z.B. '#66C93F' */
  accent: string;
  /** optionales Quadrat-Icon (PNG-Import), erscheint mittig im Cover */
  icon?: string;
  /** optionales Vorschaubild (Import) — ersetzt das Pixel-Muster komplett */
  coverImage?: string;
  links: ProjectLink[];
}

export const site = {
  name: 'K7 Mods',
  tagline: 'Minecraft-Projekte, sauber gebaut.',
  // ⬇️ Leere URL blendet den jeweiligen Button komplett aus
  links: {
    /** Mod-Quellcode */
    github: 'https://github.com/junisX/no-totem-pop-animation',
    /** Repository dieser Website */
    website: 'https://github.com/junisX/k7-mods',
    curseforge: '',
    modrinth: '',
    discord: '',
  },
};

export const categoryLabels: Record<Category, string> = {
  mod: 'Mod',
  modpack: 'Modpack',
  plugin: 'Plugin',
  datapack: 'Datapack',
};

export const projects: Project[] = [
  {
    slug: 'no-totem-pop-animation',
    title: 'No Totem POP Animation',
    category: 'mod',
    short: 'Kein Vollbild-Totem mehr – Sound & Effekt bleiben.',
    versions: ['1.21.11'],
    loaders: ['Fabric'],
    meta: 'v1.0.0 · 8,3 KB',
    coverSeed: 4,
    accent: '#66C93F',
    links: [
      {
        label: 'Download',
        url: 'https://github.com/junisX/no-totem-pop-animation/releases/latest/download/no-totem-pop-animation-1.21.11-1.0.0.jar',
      },
      { label: 'GitHub', url: 'https://github.com/junisX/no-totem-pop-animation' },
    ],
  },
  {
    slug: 'infinitekr-auktion',
    title: "InfiniteKR's Auktion",
    category: 'mod',
    short: 'Live-Auktion für Streams – direkt im Spiel.',
    versions: ['1.21.11'],
    loaders: ['Fabric'],
    meta: 'v1.1.0 · 64,7 KB',
    coverSeed: 6,
    accent: '#3DDC84',
    links: [
      {
        label: 'Download',
        url: 'https://github.com/junisX/infinitekr-auktion/releases/download/v1.1.0/InfiniteKR-Auktion-1.21.11.jar',
      },
      { label: 'GitHub', url: 'https://github.com/junisX/infinitekr-auktion' },
    ],
  },
];

/* ── Hero-Kennzahlen: ergeben sich automatisch aus `projects` ─────────────── */

/** vergleicht Versionsnummern wie "1.21.11" > "1.21.4" */
function cmpVersion(a: string, b: string): number {
  const pa = a.split(/[.\-+]/).map((n) => parseInt(n, 10) || 0);
  const pb = b.split(/[.\-+]/).map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

const versions = [...new Set(projects.flatMap((p) => p.versions))].sort(cmpVersion);
const loaders = [...new Set(projects.flatMap((p) => p.loaders))];

export const stats = [
  { value: String(projects.length), label: 'Projekte' },
  { value: versions.length ? versions[versions.length - 1] : '—', label: 'Minecraft' },
  { value: loaders.length <= 2 ? loaders.join(' + ') : `${loaders.length} Loader`, label: 'Modloader' },
  { value: 'Kostenlos', label: 'Download' },
];

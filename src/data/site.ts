/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  K7 MODS — ZENTRALE KONFIGURATION
 *
 *  Hier änderst du alles Wichtige:
 *   •site.name / site.tagline  → Name & Slogan
 *   •site.links                → deine echten Profile (CurseForge, GitHub …)
 *   •projects[]                → deine Minecraft-Projekte
 *
 *  TIPP: Ersetze die `links`-Einträge und `coverSeed`/`accent` bleiben wie sie sind.
 *  Nach Änderungen: `npm run build` (oder `npm run dev` zum Testen).
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
  description: string;
  versions: string[];
  loaders: string[];
  downloads: string;
  /** Zahl von 0–9 → steuert das Pixel-Muster im Cover */
  coverSeed: number;
  /** Hex-Farbe für das Cover, z.B. '#66C93F' */
  accent: string;
  links: ProjectLink[];
}

export const site = {
  name: 'K7 Mods',
  tagline: 'Minecraft-Projekte, sauber gebaut.',
  description:
    'Mods, Modpacks, Plugins und Datapacks für Minecraft — minimalistisch designt, stabil getestet und open source.',
  // ⬇️ Deine echten Profile eintragen (leere Strings blenden den Button aus)
  links: {
    curseforge: 'https://www.curseforge.com/minecraft',
    modrinth: 'https://modrinth.com/',
    github: 'https://github.com/',
    discord: '',
  },
  stats: [
    { value: '250k+', label: 'Downloads' },
    { value: '6', label: 'Projekte' },
    { value: '1.21', label: 'Aktuelle Version' },
    { value: '100%', label: 'Open Source' },
  ],
};

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Alle' },
  { id: 'mod', label: 'Mods' },
  { id: 'modpack', label: 'Modpacks' },
  { id: 'plugin', label: 'Plugins' },
  { id: 'datapack', label: 'Datapacks' },
];

export const categoryLabels: Record<Category, string> = {
  mod: 'Mod',
  modpack: 'Modpack',
  plugin: 'Plugin',
  datapack: 'Datapack',
};

export const projects: Project[] = [
  {
    slug: 'k7-ore-depths',
    title: 'K7 Ore Depths',
    category: 'mod',
    short: 'Neue Unterwelt-Varianten für jedes Erz.',
    description:
      'Erweitert die Weltgenerierung um seltene Tiefen-Varianten der gängigen Erze, inklusive eigener Biome, Strukturen und Balanced-Drops. Volle Kompatibilität zu World-Edit und Terralith.',
    versions: ['1.21.4', '1.21.1', '1.20.6'],
    loaders: ['Fabric', 'NeoForge'],
    downloads: '98.4k',
    coverSeed: 3,
    accent: '#66C93F',
    links: [
      { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft' },
      { label: 'Modrinth', url: 'https://modrinth.com/' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
  },
  {
    slug: 'k7-survival-pack',
    title: 'K7 Survival Pack',
    category: 'modpack',
    short: 'Leichtgewichtiges Survival-Pack ohne Lag.',
    description:
      'Ein strikt kuratiertes Pack mit 80 Mods, das auch auf mittleren Rechnern flüssig läuft. Fokus auf Performance, Qualität-of-Life und einen sauberen, ruhigen Look.',
    versions: ['1.21.1'],
    loaders: ['NeoForge'],
    downloads: '61.2k',
    coverSeed: 7,
    accent: '#4FA3FF',
    links: [
      { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
  },
  {
    slug: 'k7-utilities',
    title: 'K7 Utilities',
    category: 'plugin',
    short: 'Admin-Toolkit für Paper-Server.',
    description:
      'Ein Plugin mit Claims, Economy, Teleport-Warps, moderaten Utility-Commands und einem klaren GUI. Keine Bloat-Features, kein Tracking, konfigurierbar in einer YAML.',
    versions: ['1.21.x', '1.20.x'],
    loaders: ['Paper', 'Purpur'],
    downloads: '44.9k',
    coverSeed: 1,
    accent: '#FFB020',
    links: [
      { label: 'GitHub', url: 'https://github.com/' },
      { label: 'Modrinth', url: 'https://modrinth.com/' },
    ],
  },
  {
    slug: 'k7-dungeon-run',
    title: 'K7 Dungeon Run',
    category: 'datapack',
    short: 'Prozedurale Dungeons mit Boss-Fight.',
    description:
      'Reines Datapack, kein Mod nötig: prozedural generierte Dungeon-Räume, Loot-Tabellen, Checkpoints und ein Boss-Fight mit mehreren Phasen. Läuft auf Vanilla-Servern.',
    versions: ['1.21.x'],
    loaders: ['Vanilla'],
    downloads: '27.3k',
    coverSeed: 5,
    accent: '#E4574C',
    links: [
      { label: 'Modrinth', url: 'https://modrinth.com/' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
  },
  {
    slug: 'k7-performance',
    title: 'K7 Performance',
    category: 'mod',
    short: 'Mehr TPS, weniger Stutter.',
    description:
      'Sammelt bewährte Rendering- und Chunk-Optimierungen in einem einzigen Mod. Misst automatisch und passt Cache-Größen an deine Hardware an — messbar +15 % TPS.',
    versions: ['1.21.4', '1.21.1'],
    loaders: ['Fabric'],
    downloads: '35.8k',
    coverSeed: 9,
    accent: '#B48CFF',
    links: [
      { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
  },
  {
    slug: 'k7-arena',
    title: 'K7 Arena',
    category: 'plugin',
    short: 'Minigame-Lobby für kleine Server.',
    description:
      'Einrichtbare Arenen für Sumo, Spleef und Bedwars-Light, mit automatischem Matchmaking, Scoreboard und Spectator-Modus. Setup in unter zwei Minuten.',
    versions: ['1.21.x'],
    loaders: ['Paper'],
    downloads: '18.1k',
    coverSeed: 2,
    accent: '#3FD8C8',
    links: [
      { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft' },
      { label: 'GitHub', url: 'https://github.com/' },
    ],
  },
];

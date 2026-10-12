import { Github, Globe } from 'lucide-react';
import Logo from './Logo';
import { site } from '../data/site';

const nav = [
  { label: 'Projekte', href: '#projekte' },
  { label: 'Über', href: '#ueber' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const externals = [
    { label: 'CurseForge', url: site.links.curseforge },
    { label: 'Modrinth', url: site.links.modrinth },
    { label: 'GitHub', url: site.links.github },
    { label: 'Discord', url: site.links.discord },
  ].filter((l) => l.url);

  return (
    <footer id="kontakt" className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] py-16">
      <div className="grid-dots pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-60" />

      <div className="container-x relative">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo size={28} />
              <span className="text-[15px] font-semibold tracking-tight text-white">
                K7 <span className="text-grass">Mods</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {site.tagline} Alle Projekte sind kostenlos und werden quelloffen entwickelt.
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-pixel text-zinc-500">
                Seite
              </h4>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-pixel text-zinc-500">
                Extern
              </h4>
              <ul className="mt-4 space-y-2.5">
                {externals.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {l.label}
                      <Globe size={12} className="opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-zinc-600">
            © {year} {site.name} — nicht mit Mojang/Microsoft verbunden.
          </p>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-grass"
          >
            <Github size={14} />
            Diese Seite auf GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { site } from '../data/site';

const links = [
  { label: 'Projekte', href: '#projekte' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <Logo size={30} />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            K7 <span className="text-grass">Mods</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          {site.links.curseforge && (
            <a
              href={site.links.curseforge}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost ml-3 !py-2"
            >
              CurseForge
            </a>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/5 md:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Hauptnavigation (mobil)"
          className="border-t border-white/[0.07] bg-ink-950/95 backdrop-blur-xl md:hidden"
        >
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            {site.links.curseforge && (
              <a
                href={site.links.curseforge}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost mt-2"
              >
                CurseForge öffnen
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

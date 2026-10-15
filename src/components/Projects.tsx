import { useMemo, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import PixelCover from './PixelCover';
import Reveal from './Reveal';
import { categoryLabels, projects, type Category, type Project } from '../data/site';

function Card({ project }: { project: Project }) {
  const download = project.links.find((l) => /download/i.test(l.label));

  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <PixelCover
        seed={project.coverSeed}
        accent={project.accent}
        label={project.slug}
        icon={project.icon}
        image={project.coverImage}
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{ color: project.accent, backgroundColor: `${project.accent}1A` }}
          >
            {categoryLabels[project.category]}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
            <Download size={12} aria-hidden="true" />
            {project.meta}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{project.short}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {[...project.loaders, ...project.versions.slice(0, 2)].map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          {project.links.map((link) => {
            const isDownload = link === download;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} — ${link.label}`}
                className={
                  isDownload
                    ? 'btn-primary !px-4 !py-2.5 !text-xs'
                    : 'inline-flex items-center gap-1.5 rounded-lg border border-white/[0.12] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-white'
                }
              >
                {isDownload && <Download size={14} aria-hidden="true" />}
                {link.label}
                {!isDownload && <ArrowUpRight size={13} aria-hidden="true" />}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category | 'all'>('all');

  /** nur Kategorien, die wirklich Projekte haben – mit Anzahl */
  const available = useMemo(() => {
    const counts = new Map<Category, number>();
    projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [...counts.entries()].map(([id, count]) => ({
      id,
      label: categoryLabels[id],
      count,
    }));
  }, []);

  const showFilters = available.length > 1;

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="projekte" className="scroll-mt-20 pb-24 pt-16">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">// Downloads</p>
            <h2 className="mt-3 flex items-baseline gap-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Mods
              <span className="font-mono text-sm font-normal text-zinc-400">
                {projects.length} verfügbar
              </span>
            </h2>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Projekte filtern">
              {[{ id: 'all' as const, label: 'Alle', count: projects.length }, ...available].map(
                (c) => {
                  const isActive = active === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActive(c.id)}
                      aria-pressed={isActive}
                      className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-grass text-ink-950'
                          : 'border border-white/[0.1] text-zinc-400 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {c.label}
                      <span className={isActive ? 'opacity-70' : 'text-zinc-400'}>
                        {' '}
                        {c.count}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>

        <div
          className={`mt-10 grid gap-6 ${
            filtered.length === 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filtered.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={Math.min(i * 70, 280)}
              className={filtered.length === 1 ? 'sm:col-span-2' : ''}
            >
              <Card project={p} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-zinc-400">
            Noch keine Projekte in dieser Kategorie.
          </p>
        )}
      </div>
    </section>
  );
}

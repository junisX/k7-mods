import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import PixelCover from './PixelCover';
import {
  categories,
  categoryLabels,
  projects,
  type Category,
  type Project,
} from '../data/site';

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.06, 0.3) }}
      className="card group flex flex-col overflow-hidden"
    >
      <PixelCover seed={project.coverSeed} accent={project.accent} label={project.slug} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span
            className="rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{ color: project.accent, backgroundColor: `${project.accent}1A` }}
          >
            {categoryLabels[project.category]}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
            <Download size={12} />
            {project.downloads}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-zinc-400">{project.short}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-500">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {[...project.loaders, ...project.versions.slice(0, 2)].map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-zinc-500"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-grass/40 hover:bg-grass/10 hover:text-grass-soft"
            >
              {link.label}
              <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category | 'all'>('all');

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="projekte" className="scroll-mt-20 py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">// Projekte</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Alles, was ich gebaut habe
            </h2>
            <p className="mt-3 max-w-lg text-sm text-zinc-500">
              Jedes Projekt ist kostenlos, upgedatet und läuft auf aktuellen Minecraft-Versionen.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-grass text-ink-950'
                      : 'border border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p, i) => (
            <Card key={p.slug} project={p} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-zinc-500">
            Noch keine Projekte in dieser Kategorie.
          </p>
        )}
      </div>
    </section>
  );
}

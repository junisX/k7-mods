import { motion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';
import { site } from '../data/site';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* Hintergrund: Punktraster + Farbschimmer */}
      <div className="grid-dots pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-grass/10 blur-[130px]" />

      <div className="container-x relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="eyebrow"
        >
          Minecraft · Mods · Plugins
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.06 }}
          className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
        >
          {site.name}
          <span className="block text-zinc-500">{site.tagline}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.14 }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-400"
        >
          {site.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.22 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#projekte" className="btn-primary">
            Projekte ansehen
            <ArrowDown size={16} />
          </a>
          {site.links.github && (
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              <Github size={16} />
              Source auf GitHub
            </a>
          )}
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.34 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-4"
        >
          {site.stats.map((s) => (
            <div key={s.label} className="bg-ink-900 px-5 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                {s.label}
              </dt>
              <dd className="mt-1.5 text-xl font-semibold text-white">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

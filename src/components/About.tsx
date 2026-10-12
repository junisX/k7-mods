import { motion } from 'framer-motion';
import { Check, Github, MessageSquare } from 'lucide-react';
import { site } from '../data/site';

const ease = [0.22, 1, 0.36, 1] as const;

const points = [
  {
    title: 'Open Source',
    text: 'Jeder Code liegt öffentlich auf GitHub — fork, prüf, bau mit.',
  },
  {
    title: 'Performance first',
    text: 'Kein Bloat: nur Features, die wirklich etwas bringen und getestet sind.',
  },
  {
    title: 'Regelmäßige Updates',
    text: 'Neue Minecraft-Versionen werden typischerweise innerhalb weniger Tage unterstützt.',
  },
];

export default function About() {
  return (
    <section id="ueber" className="scroll-mt-20 border-t border-white/[0.06] py-24">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="eyebrow">// Über</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Gebaut aus Leidenschaft
            <br />
            an Vanilla-nahem Minecraft.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            {site.name} ist die Sammlung meiner Minecraft-Projekte. Ich baue kleine, fokussierte
            Tools statt riesiger All-in-One-Pakete — sauber dokumentiert, kompatibel zu gängigen
            Modloadern und ohne Telemetrie.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {site.links.github && (
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                <Github size={16} />
                GitHub
              </a>
            )}
            {site.links.discord && (
              <a
                href={site.links.discord}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                <MessageSquare size={16} />
                Discord
              </a>
            )}
            {site.links.modrinth && (
              <a
                href={site.links.modrinth}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                Modrinth
              </a>
            )}
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          {points.map((p) => (
            <li key={p.title} className="card flex gap-4 p-6">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-grass/15 text-grass">
                <Check size={15} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">{p.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

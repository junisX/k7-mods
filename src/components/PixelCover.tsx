import { useMemo } from 'react';

interface PixelCoverProps {
  seed: number;
  accent: string;
  label: string;
  /** optionales Quadrat-Icon, wird mittig über das Muster gelegt */
  icon?: string;
  /** optionales Vorschaubild – ersetzt das Pixel-Muster */
  image?: string;
}

/** Deterministischer Pseudo-Zufall, damit das Muster pro Projekt stabil bleibt */
function mulberry32(seed: number) {
  let a = seed * 1831565813 + 0x6d2b79f5;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 16;
const ROWS = 9;

/** Blocky, minimalistisches Cover — kein Bild-Asset nötig */
export default function PixelCover({ seed, accent, label, icon, image }: PixelCoverProps) {
  const blocks = useMemo(() => {
    const rnd = mulberry32(seed);
    const cells: { x: number; y: number; o: number }[] = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const r = rnd();
        if (r > 0.82) cells.push({ x, y, o: 0.85 });
        else if (r > 0.7) cells.push({ x, y, o: 0.32 });
        else if (r > 0.66) cells.push({ x, y, o: 0.12 });
      }
    }
    return cells;
  }, [seed]);

  return (
    <div className="relative h-40 w-full overflow-hidden sm:h-44">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
      <svg
        viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect width={COLS * 10} height={ROWS * 10} fill="#0A0C0E" />
        <g>
          {blocks.map((b, i) => (
            <rect
              key={i}
              x={b.x * 10}
              y={b.y * 10}
              width="10"
              height="10"
              fill={accent}
              opacity={b.o}
            />
          ))}
        </g>
        {/* weicher Farbschimmer unten rechts */}
        <defs>
          <linearGradient id={`g-${seed}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect width={COLS * 10} height={ROWS * 10} fill={`url(#g-${seed})`} />
      </svg>
      )}

      {/* Abblendung nach unten, damit die Cards ruhig bleiben */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent" />

      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/15"
        />
      )}

      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-pixel text-white/45">
        {label}
      </span>
    </div>
  );
}

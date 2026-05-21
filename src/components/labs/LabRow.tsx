/* Lab row card — editorial theme matching landing page */
import Link from 'next/link';

interface Lab {
  slug: string;
  title: string;
  difficulty: string;
  description: string;
  tags: string[];
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'text-[#4ade80]',
  intermediate: 'text-[var(--red)]',
};

export default function LabRow({ lab, index }: { lab: Lab; index: number }) {
  const diffKey = lab.difficulty.toLowerCase();
  const diffColor = DIFFICULTY_COLOR[diffKey] ?? 'text-[#888]';

  return (
    <Link
      href={`/labs/${lab.slug}`}
      className="group flex items-start md:items-center justify-between gap-6 border-b border-[var(--border)] px-0 py-5 transition-colors duration-200 hover:bg-white/[0.015]"
    >
      {/* Index number */}
      <span
        className="shrink-0 text-[11px] text-[#333] w-6 pt-0.5"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold text-white group-hover:text-[var(--red)] transition-colors leading-snug">
          {lab.title}
        </h3>
        <p
          className="mt-0.5 text-[12px] text-[#555] leading-relaxed truncate"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {lab.description}
        </p>
      </div>

      {/* Tags */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {lab.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[9px] border border-[var(--border)] text-[#444] px-2 py-0.5 tracking-wide"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Difficulty + arrow */}
      <div className="flex items-center gap-4 shrink-0">
        <span
          className={`text-[10px] tracking-[0.15em] uppercase ${diffColor} hidden sm:block`}
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {lab.difficulty}
        </span>
        <span className="text-[#333] group-hover:text-white transition-colors text-sm">
          →
        </span>
      </div>
    </Link>
  );
}

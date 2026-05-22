import Link from 'next/link';

interface Lab {
  slug: string;
  title: string;
  difficulty: string;
  description: string;
  tags: string[];
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'border-[#4ade80]/60 text-[#4ade80]',
  intermediate: 'border-[var(--red)]/60 text-[var(--red)]',
};

export default function LabCard({ lab, index }: { lab: Lab; index: number }) {
  const diffKey = lab.difficulty.toLowerCase();
  const diffStyle = DIFFICULTY_COLOR[diffKey] ?? 'border-white/20 text-[#aaa]';

  return (
    <Link
      href={`/labs/${lab.slug}`}
      className="group relative flex flex-col justify-between h-[210px] border border-white/10 bg-[#0e0e0e] p-6 transition-all duration-200 hover:border-[var(--red)] hover:bg-[#121212] hover:-translate-y-0.5"
    >
      {/* Corner Brackets decoration (cyber theme) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/25 group-hover:border-[var(--red)] transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/25 group-hover:border-[var(--red)] transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/25 group-hover:border-[var(--red)] transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/25 group-hover:border-[var(--red)] transition-colors" />

      {/* Top Telemetry Info */}
      <div className="flex items-center justify-between gap-4">
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-[#999]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          [ LAB: 0{index + 1} ]
        </span>
        <span
          className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${diffStyle}`}
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {lab.difficulty}
        </span>
      </div>

      {/* Main Info */}
      <div className="flex-1 mt-4 min-w-0">
        <h3
          className="text-[17px] font-bold text-white group-hover:text-[var(--red)] transition-colors tracking-tight line-clamp-1"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {lab.title}
        </h3>
        <p
          className="mt-2 text-[11.5px] text-[#c0c0c0] leading-relaxed line-clamp-2"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {lab.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-white/[0.06]">
        {/* Tags */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          {lab.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[8.5px] border border-white/10 text-[#aaa] px-2 py-0.5 tracking-wide shrink-0"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Link indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="text-[9px] tracking-[0.15em] uppercase text-[#999] group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            Launch
          </span>
          <span className="text-[#999] group-hover:text-white group-hover:translate-x-0.5 transition-all text-sm">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

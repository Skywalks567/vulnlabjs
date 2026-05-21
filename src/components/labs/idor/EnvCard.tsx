import Link from 'next/link';

interface EnvCardProps {
  label: string;
  badge: string;
  description: string;
  href: string;
  accent?: boolean;
}

export default function EnvCard({
  label,
  badge,
  description,
  href,
  accent,
}: EnvCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between gap-6 border border-[var(--border-strong)] p-6 transition-colors duration-200 hover:border-[var(--red)] hover:bg-white/[0.02]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {label}
        </span>
        <span
          className={`text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border ${
            accent
              ? 'border-[var(--red)] text-[var(--red)]'
              : 'border-[var(--border-strong)] text-[#4ade80]'
          }`}
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {badge}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-[12px] text-[#555] leading-relaxed"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        {description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-2">
        <span
          className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${
            accent
              ? 'text-[var(--red)] group-hover:text-white'
              : 'text-[#4ade80] group-hover:text-white'
          }`}
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Launch Instance
        </span>
        <span className="text-[var(--muted)] group-hover:text-white transition-colors text-sm">
          →
        </span>
      </div>
    </Link>
  );
}

'use client';

import { useEffect, useState } from 'react';

const LINES = [
  { text: 'npx prisma db push', type: 'cmd' },
  { text: '✓ database synced with prisma schema', type: 'ok' },
  { text: 'npm run prisma:seed', type: 'cmd' },
  { text: 'seeding: alice / bob / admin accounts...', type: 'info' },
  { text: '✓ seed complete', type: 'ok' },
  { text: 'npm run dev', type: 'cmd' },
  { text: '  ▲ next.js 16 ready on http://localhost:3000', type: 'info' },
  { text: '! system online — begin vulnerability testing', type: 'warn' },
];

export default function HeroTerminal() {
  const [shown, setShown] = useState<typeof LINES>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < LINES.length) {
      const t = setTimeout(() => {
        setShown((p) => [...p, LINES[idx]]);
        setIdx((p) => p + 1);
      }, 900);
      return () => clearTimeout(t);
    }
    const loop = setTimeout(() => {
      setShown([]);
      setIdx(0);
    }, 5000);
    return () => clearTimeout(loop);
  }, [idx]);

  const color = (type: string) => {
    if (type === 'cmd') return 'text-white';
    if (type === 'ok') return 'text-[#4ade80]';
    if (type === 'warn') return 'text-[var(--red)] font-medium';
    return 'text-[#b0b0b0]';
  };

  return (
    <div
      className="w-full relative border border-[var(--border-strong)] bg-[#0e0e0e] rounded-sm overflow-hidden"
      style={{ fontFamily: 'var(--font-dm-mono)' }}
    >
      {/* Cyber Corner Brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 pointer-events-none" />

      {/* window bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[#111]">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--red)]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#555]" />
        <span className="ml-3 text-[10px] text-[#888] tracking-wider select-none">
          vulnlabjs — zsh
        </span>
      </div>

      {/* output */}
      <div className="p-4 text-[11px] leading-6 min-h-[220px] flex flex-col gap-0.5">
        {shown.map((line, i) => (
          <div key={i} className={`${color(line.type)} flex gap-2`}>
            {line.type === 'cmd' && (
              <span className="text-[var(--red)] select-none shrink-0">›</span>
            )}
            <span className={line.type !== 'cmd' ? 'pl-4' : ''}>
              {line.text}
            </span>
          </div>
        ))}
        {idx < LINES.length && (
          <div className="flex gap-2 pl-4">
            <span className="cursor-blink text-[#4ade80]">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

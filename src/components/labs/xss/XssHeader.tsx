'use client';

const TAGS = ['Injection', 'XSS', 'Client-Side'];

export default function XssHeader() {
  return (
    <div className="relative mb-12 border-b border-[var(--border)] pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 reveal reveal-1">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[var(--red)]" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--red)]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            OWASP A03:2021 — Injection
          </span>
        </div>
        <h1
          className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          XSS
        </h1>
        <p
          className="text-[10px] tracking-[0.1em] uppercase text-[#c0c0c0] mt-1"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Cross-Site Scripting
        </p>
      </div>

      <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
        <span
          className="text-[9px] border border-[#4ade80] text-[#4ade80] px-3 py-1 tracking-[0.2em] uppercase font-bold"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Difficulty: Beginner
        </span>
        <div className="flex gap-2">
          {TAGS.map((t) => (
            <span
              key={t}
              className="text-[9px] border border-[var(--border-strong)] text-[#e0e0e0] px-2 py-0.5 tracking-wide"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

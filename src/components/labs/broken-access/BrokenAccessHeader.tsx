'use client';

const TAGS = [
  'Access Control',
  'Privilege Escalation',
  'RBAC',
  'Session Cookies',
];

export default function BrokenAccessHeader() {
  return (
    <div className="relative mb-12 border-b border-[var(--border)] pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 reveal reveal-1">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[var(--red)]" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--red)] font-semibold"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            OWASP A01:2021 — Broken Access Control
          </span>
        </div>
        <h1
          className="text-4.5xl lg:text-6.5xl font-black text-white tracking-tighter uppercase leading-none"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Broken Access
        </h1>
        <p
          className="text-[10px] tracking-[0.1em] uppercase text-[#c0c0c0] mt-1"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Privilege Escalation &amp; Role Bypass
        </p>
      </div>

      <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
        <span
          className="text-[9px] border border-[#f39c12] text-[#f39c12] px-3 py-1 tracking-[0.2em] uppercase font-bold"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Difficulty: Intermediate
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

/* Scrolling lab name ticker — editorial-style marquee */
const LABS = [
  'SQL Injection',
  'Cross-Site Scripting',
  'Broken Access Control',
  'IDOR',
  'Insecure File Upload',
  'JWT Misconfiguration',
  'SSRF Simulation',
];

export default function LabMarquee() {
  /* duplicate for seamless loop */
  const items = [...LABS, ...LABS];

  return (
    <div className="reveal reveal-5 relative overflow-hidden border-y border-[var(--border)] py-3 mt-16">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10" />

      <div className="marquee-track flex w-max gap-0">
        {items.map((lab, i) => (
          <div key={i} className="flex items-center gap-0 shrink-0">
            <span
              className="text-[11px] tracking-[0.2em] uppercase text-[#b8b8b8] px-6 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {lab}
            </span>
            <span className="text-[var(--red)] text-[8px] shrink-0">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}

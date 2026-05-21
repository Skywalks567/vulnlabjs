/* Three-column editorial feature breakdown */
const FEATURES = [
  {
    num: '01',
    title: 'Real Exploits, Real Code',
    body: 'Execute live SQL injections, XSS payloads, IDOR bypasses, and more against a real running Next.js application — not a toy simulation.',
  },
  {
    num: '02',
    title: 'Then Fix What You Broke',
    body: 'Every vulnerable endpoint has a patched counterpart. Study the diff. Understand why the fix works at the code level.',
  },
  {
    num: '03',
    title: 'Full Production Stack',
    body: 'Prisma 7, Supabase Postgres, and Next.js API routes — the same stack running in real products. What you learn here transfers.',
  },
];

export default function FeatureStrip() {
  return (
    <section className="reveal reveal-4 mt-24 border-t border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {FEATURES.map((f) => (
          <div
            key={f.num}
            className="px-8 py-10 group hover:bg-white/[0.015] transition-colors duration-300"
          >
            <div
              className="text-[11px] tracking-[0.25em] text-[var(--red)] mb-5"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {f.num}
            </div>
            <h3 className="text-[17px] font-semibold text-white leading-snug mb-3">
              {f.title}
            </h3>
            <p className="text-[13px] leading-[1.75] text-[#666]">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

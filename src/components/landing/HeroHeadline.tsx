/* Hero typographic headline block */
export default function HeroHeadline() {
  return (
    <div className="reveal reveal-1">
      {/* Eyebrow label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 max-w-[40px] bg-[var(--red)]" />
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--red)]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          v2.0 — OWASP Top 10 Labs
        </span>
      </div>

      {/* Main headline — intentionally oversized, typographic focus */}
      <h1
        className="font-sans font-extrabold leading-[1.0] tracking-[-0.02em] text-white"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        <span className="block">Break</span>
        <span className="block text-[var(--red)]">Things.</span>
        <span className="block">Fix Them.</span>
      </h1>

      {/* Sub-descriptor */}
      <p
        className="mt-8 max-w-md text-[15px] leading-[1.7] text-[#b8b8b8]"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        A self-hosted penetration testing sandbox. Run real exploits against
        real vulnerabilities — SQL injection, XSS, IDOR, JWT attacks — then
        patch them. Built on Next.js 16 + Prisma 7 + Supabase.
      </p>
    </div>
  );
}

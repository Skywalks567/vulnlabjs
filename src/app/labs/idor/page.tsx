import EnvCard from '@/components/labs/idor/EnvCard';
import ExploitHint from '@/components/labs/idor/ExploitHint';
import Link from 'next/link';

const TAGS = ['Access Control', 'API', 'IDOR'];
const OBJECTIVES = [
  'Log in as Alice (User ID: 2)',
  "Steal Bob's private note by tampering with the ID parameter",
  "Access the Admin's secret note to capture the flag",
];

export default function IdorPage() {
  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/labs" className="hover:text-white transition-colors">
            Labs
          </Link>
          <span>/</span>
          <span className="text-[var(--red)]">IDOR</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[var(--border)] pb-10 mb-12 reveal reveal-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--red)]" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-[var(--red)]"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              A01:2021 — Broken Access Control
            </span>
            <span
              className="ml-2 text-[9px] border border-[#4ade80] text-[#4ade80] px-2 py-0.5 tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              Beginner
            </span>
          </div>
          <h1
            className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Insecure Direct Object Reference
          </h1>
          <p
            className="mt-3 text-[13px] text-[#555] max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            The application trusts user-supplied object IDs without verifying
            ownership. Change the ID parameter in a request — and you can access
            data belonging to someone else.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TAGS.map((t) => (
              <span
                key={t}
                className="text-[9px] border border-[var(--border-strong)] text-[#444] px-2 py-0.5 tracking-wide"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Body: 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* Left: objectives + payload hint */}
          <div className="flex flex-col gap-8 reveal reveal-2">
            {/* Objectives */}
            <div>
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)] mb-4"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                Mission Objectives
              </p>
              <ol className="flex flex-col gap-3">
                {OBJECTIVES.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="shrink-0 text-[10px] text-[var(--red)] pt-0.5 w-5"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span
                      className="text-[13px] text-[#aaa]"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      {obj}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Payload hint */}
            <ExploitHint />

            {/* Writeup link */}
            <Link
              href="/labs/idor/writeup"
              className="group flex items-center gap-2 w-fit border-b border-[var(--border)] pb-1 hover:border-[var(--red)] transition-colors"
            >
              <span
                className="text-[11px] tracking-[0.15em] uppercase text-[var(--muted)] group-hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                Read Writeup &amp; Analysis
              </span>
              <span className="text-[var(--muted)] group-hover:text-white transition-colors text-sm">
                →
              </span>
            </Link>
          </div>

          {/* Right: environment launchers */}
          <div className="flex flex-col gap-4 reveal reveal-3">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)] mb-1"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              Environments
            </p>
            <EnvCard
              label="Vulnerable Environment"
              badge="exploitable"
              description="A simple note-taking application without ownership validation. Every requested ID is processed directly by the server."
              href="/labs/idor/vulnerable"
              accent
            />
            <EnvCard
              label="Secured Environment"
              badge="patched"
              description="The same note-taking application but with strict ownerId verification on every database query."
              href="/labs/idor/fixed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

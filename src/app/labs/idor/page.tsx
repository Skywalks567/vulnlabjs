import EnvCard from '@/components/labs/idor/EnvCard';
import ExploitHint from '@/components/labs/idor/ExploitHint';
import MissionDossier from '@/components/labs/idor/MissionDossier';
import Link from 'next/link';

const TAGS = ['Access Control', 'API', 'IDOR'];

export default function IdorPage() {
  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-[#dcdcdc]"
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

        {/* Massive Editorial Header */}
        <div className="relative mb-12 border-b border-[var(--border)] pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 reveal reveal-1">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[var(--red)]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[var(--red)]"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                OWASP A01:2021 — Broken Access Control
              </span>
            </div>
            <h1
              className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              IDOR
            </h1>
            <p
              className="text-[10px] tracking-[0.1em] uppercase text-[#c0c0c0] mt-1"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              Insecure Direct Object Reference
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

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* Left: dossier + hints */}
          <div className="flex flex-col gap-10 reveal reveal-2">
            <div className="border-b border-[var(--border)] pb-8">
              <p
                className="text-[14px] text-gray-200 leading-relaxed max-w-3xl"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                Insecure Direct Object Reference occurs when a web application
                exposes direct access to database records based on user-supplied
                parameters, without verifying if the user has correct ownership
                rights.
              </p>
            </div>

            <MissionDossier />
            <ExploitHint />
          </div>

          {/* Right: sidebar launcher */}
          <div className="flex flex-col gap-6 reveal reveal-3">
            <div>
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)] mb-3"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                Environments
              </p>
              <div className="flex flex-col gap-4">
                <EnvCard
                  label="Vulnerable Environment"
                  badge="exploitable"
                  description="A simple note-taking application without ownership validation. Every requested ID is processed directly by the database query."
                  href="/labs/idor/vulnerable"
                  accent
                />
                <EnvCard
                  label="Secured Environment"
                  badge="patched"
                  description="The same note-taking application but with strict ownerId verification on every single database query."
                  href="/labs/idor/fixed"
                />
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}

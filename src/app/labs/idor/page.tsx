import Breadcrumb from '@/components/labs/Breadcrumb';
import EnvCard from '@/components/labs/idor/EnvCard';
import IdorHeader from '@/components/labs/idor/IdorHeader';
import MissionDossier from '@/components/labs/idor/MissionDossier';
import Link from 'next/link';

export default function IdorPage() {
  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'IDOR' }]} backHref="/labs" />

        {/* Modular Header */}
        <IdorHeader />

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
          </div>

          {/* Right: environments selection list & writeup */}
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

            {/* Cybernetic Cyberpunk Writeup & Analysis Card */}
            <div className="border-t border-[var(--border)] pt-6">
              <Link
                href="/labs/idor/writeup"
                className="group block relative border border-[var(--border-strong)] bg-[#0e0e0e] p-4 font-mono transition-all duration-300 hover:border-[var(--red)] hover:bg-[#111]"
              >
                {/* Cyberpunk accent corners */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/20 pointer-events-none group-hover:border-[var(--red)]/40 transition-colors" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 pointer-events-none group-hover:border-[var(--red)]/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 pointer-events-none group-hover:border-[var(--red)]/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/20 pointer-events-none group-hover:border-[var(--red)]/40 transition-colors" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--red)] font-bold block mb-1">
                      📖 MISSION LOGS
                    </span>
                    <h3 className="text-white text-[11px] font-bold uppercase tracking-wider group-hover:text-[var(--red)] transition-colors">
                      Threat Report &amp; Writeup
                    </h3>
                    <p className="text-[9.5px] text-[#777] mt-1.5 leading-relaxed font-sans normal-case group-hover:text-white/60 transition-colors">
                      Review complete vulnerability analysis, exploitation
                      steps, and secure coding blueprint.
                    </p>
                  </div>
                  <span className="text-[var(--muted)] group-hover:text-[var(--red)] group-hover:translate-x-0.5 transition-all text-xs font-bold shrink-0 self-center">
                    →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

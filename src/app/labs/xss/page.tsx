import Breadcrumb from '@/components/labs/Breadcrumb';
import EnvCard from '@/components/labs/EnvCard';
import XssHeader from '@/components/labs/xss/XssHeader';
import XssMission from '@/components/labs/xss/XssMission';
import Link from 'next/link';

export default function XssPage() {
  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'Cross-Site Scripting' }]}
          backHref="/labs"
        />

        {/* Modular Header */}
        <XssHeader />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* Left: dossier + scope */}
          <div className="flex flex-col gap-10 reveal reveal-2">
            <div className="border-b border-[var(--border)] pb-8">
              <p
                className="text-[14px] text-gray-200 leading-relaxed max-w-3xl"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                Cross-Site Scripting (XSS) occurs when an application includes
                untrusted data in a web page without proper validation or
                escaping, allowing attackers to execute malicious scripts
                directly in the victim&apos;s browser.
              </p>
            </div>

            <XssMission />
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
                  description="A message board vulnerable to both Reflected (search query) and Stored (comments input) Cross-Site Scripting attacks."
                  href="/labs/xss/vulnerable"
                  accent
                />
                <EnvCard
                  label="Secured Environment"
                  badge="patched"
                  description="The same message board sanitized with strict context-aware HTML escaping and robust Content Security Policies (CSP)."
                  href="/labs/xss/fixed"
                />
              </div>
            </div>

            {/* Cybernetic Cyberpunk Writeup & Analysis Card */}
            <div className="border-t border-[var(--border)] pt-6">
              <Link
                href="/labs/xss/writeup"
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
                      Review complete client-side script injection analysis,
                      execution vectors, and context-aware mitigation
                      blueprints.
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

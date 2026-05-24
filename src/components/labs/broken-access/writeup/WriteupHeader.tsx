'use client';

import Breadcrumb from '@/components/labs/Breadcrumb';

export default function WriteupHeader() {
  return (
    <div className="mb-10">
      <Breadcrumb
        items={[
          { label: 'Broken Access Control', href: '/labs/broken-access' },
          { label: 'Writeup' },
        ]}
        backHref="/labs/broken-access"
      />

      <div className="border-b border-[var(--border)] pb-6 mb-8">
        <h1 className="font-syne text-3xl font-extrabold text-white tracking-tight uppercase">
          Broken Access{' '}
          <span className="text-[var(--red)]">Threat Report &amp; Writeup</span>
        </h1>
        <p className="mt-2 text-[10px] text-[#a0a0a0] font-mono tracking-wider">
          CLASSIFIED INTEL // PRIVILEGE ESCALATION VULNERABILITY ARCHIVE
        </p>
      </div>

      {/* Lab Info Bento Tag */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-[var(--border-strong)] bg-[#0e0e0e] font-mono text-[10.5px]">
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Vulnerability
          </span>
          <span className="text-white font-bold">
            Broken Access Control (Vertical)
          </span>
        </div>
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Difficulty
          </span>
          <span className="text-[#f39c12] font-bold">🟠 INTERMEDIATE</span>
        </div>
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Impact
          </span>
          <span className="text-[var(--red)] font-bold">
            🔴 CRITICAL (Admin Takeover)
          </span>
        </div>
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Target API
          </span>
          <span className="text-white font-bold">
            /api/broken-access/vulnerable
          </span>
        </div>
      </div>
    </div>
  );
}

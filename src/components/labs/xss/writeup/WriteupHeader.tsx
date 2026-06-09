'use client';

import Breadcrumb from '@/components/labs/Breadcrumb';

export default function WriteupHeader() {
  return (
    <div className="mb-10">
      <Breadcrumb
        items={[{ label: 'XSS', href: '/labs/xss' }, { label: 'Writeup' }]}
        backHref="/labs/xss"
      />

      <div className="border-b border-[var(--border)] pb-6 mb-8">
        <h1 className="font-syne text-3xl font-extrabold text-white tracking-tight uppercase">
          XSS{' '}
          <span className="text-[var(--red)]">Threat Report &amp; Writeup</span>
        </h1>
        <p className="mt-2 text-[10px] text-[#a0a0a0] font-mono tracking-wider">
          CLASSIFIED INTEL // VULNERABILITY ARCHIVE
        </p>
      </div>

      {/* Lab Info Bento Tag */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-[var(--border-strong)] bg-[#0e0e0e] font-mono text-[10.5px]">
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Vulnerability
          </span>
          <span className="text-white font-bold">
            Cross-Site Scripting (XSS)
          </span>
        </div>
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Difficulty
          </span>
          <span className="text-[#4ade80] font-bold">🟢 EASY</span>
        </div>
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Impact
          </span>
          <span className="text-[var(--red)] font-bold">
            🔴 HIGH (Session Hijacking)
          </span>
        </div>
        <div>
          <span className="text-[#666] block uppercase text-[9px] tracking-wider">
            Target API
          </span>
          <span className="text-white font-bold">/api/xss/vulnerable</span>
        </div>
      </div>
    </div>
  );
}

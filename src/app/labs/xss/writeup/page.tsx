'use client';

import ExploitSection from '@/components/labs/xss/writeup/ExploitSection';
import MitigationSection from '@/components/labs/xss/writeup/MitigationSection';
import VulnerabilitySection from '@/components/labs/xss/writeup/VulnerabilitySection';
import WriteupHeader from '@/components/labs/xss/writeup/WriteupHeader';

export default function XssWriteupPage() {
  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        {/* Modular Header */}
        <WriteupHeader />

        {/* Bento Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
          {/* Left Side: Vulnerability Analysis */}
          <VulnerabilitySection />

          {/* Right Side: Exploit Instructions */}
          <ExploitSection />

          {/* Bottom Side: Full Mitigation and Defense Architecture (Spans full width) */}
          <MitigationSection />
        </div>
      </div>
    </div>
  );
}

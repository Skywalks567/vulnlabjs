'use client';

import ExploitSection from '@/components/labs/broken-access/writeup/ExploitSection';
import MitigationSection from '@/components/labs/broken-access/writeup/MitigationSection';
import VulnerabilitySection from '@/components/labs/broken-access/writeup/VulnerabilitySection';
import WriteupHeader from '@/components/labs/broken-access/writeup/WriteupHeader';

export default function BrokenAccessWriteupPage() {
  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        {/* Modular Header */}
        <WriteupHeader />

        {/* Bento Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
          {/* Left Side: Vulnerability Analysis */}
          <VulnerabilitySection />

          {/* Right Side: Exploit Walkthrough */}
          <ExploitSection />

          {/* Bottom Side: Mitigation Blueprint */}
          <MitigationSection />
        </div>
      </div>
    </div>
  );
}

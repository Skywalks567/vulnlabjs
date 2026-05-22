'use client';

import { useState } from 'react';

const VULN_CODE = `// Insecure GET Route
const note = await prisma.labNote.findUnique({
  where: { id }
}); // Bypasses ownership check!`;

const FIXED_CODE = `// Secure GET Route (Owner Validation)
const note = await prisma.labNote.findUnique({
  where: { id }
});

// Strict ownership check!
if (note.ownerId !== currentUserId) {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 403 }
  );
}`;

export default function DefenseExplanation() {
  const [activeTab, setActiveTab] = useState<'vuln' | 'fixed'>('fixed');

  return (
    <div className="red-bar pl-4 mt-6">
      <div className="flex items-center justify-between gap-4 mb-3 font-mono">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)]">
          Defense Blueprint
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('vuln')}
            className={`text-[9px] px-2 py-0.5 border tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'vuln'
                ? 'border-[var(--red)] text-[var(--red)] font-bold'
                : 'border-white/10 text-white/40 hover:text-white'
            }`}
          >
            Vulnerable
          </button>
          <button
            onClick={() => setActiveTab('fixed')}
            className={`text-[9px] px-2 py-0.5 border tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'fixed'
                ? 'border-[#4ade80] text-[#4ade80] font-bold'
                : 'border-white/10 text-white/40 hover:text-white'
            }`}
          >
            Secured
          </button>
        </div>
      </div>

      <pre className="border border-white/10 bg-[#0e0e0e] p-4 text-[10.5px] leading-relaxed whitespace-pre font-mono overflow-x-auto text-[#aaa]">
        {activeTab === 'vuln' ? (
          <code className="text-[var(--red)]">{VULN_CODE}</code>
        ) : (
          <code className="text-[#4ade80]">{FIXED_CODE}</code>
        )}
      </pre>
    </div>
  );
}

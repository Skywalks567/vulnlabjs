'use client';

import { useState } from 'react';

const VULN_CODE = `// Insecure GET Route
export async function GET() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value || 'user';
  
  // ❌ CRITICAL: Blindly trusts client-supplied cookie!
  if (role.toLowerCase() === 'admin') {
    return NextResponse.json({
      status: 'COMPROMISED',
      flag: 'CTF{broken_access_control_escalation}',
      logs: [...]
    });
  }
}`;

const FIXED_CODE = `// Secure GET Route (Server-Side Session Validation)
export async function GET() {
  // ✅ SECURE: Simulate validating active user session ID (Alice, ID: 2)
  const sessionUserId = 2;

  // ✅ SECURE: Fetch actual role securely from the database
  const user = await prisma.labUser.findUnique({
    where: { id: sessionUserId },
    select: { role: true }
  });

  if (user && user.role.toLowerCase() === 'admin') {
    return NextResponse.json({
      status: 'SECURED',
      flag: 'CTF{broken_access_control_escalation}'
    });
  }
  return NextResponse.json(
    { error: 'Forbidden' },
    { status: 403 }
  );
}`;

export default function DefenseExplanation() {
  const [activeTab, setActiveTab] = useState<'vuln' | 'fixed'>('fixed');

  return (
    <div className="red-bar pl-4 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-3 sm:gap-6 mb-3 font-mono">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)] shrink-0">
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

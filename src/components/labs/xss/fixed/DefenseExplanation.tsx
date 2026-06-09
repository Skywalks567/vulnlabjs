'use client';

import { useState } from 'react';

const VULN_CODE = `// Vulnerable Frontend (React)
{/* ❌ dangerouslySetInnerHTML executes arbitrary tags
    if the content bypasses the browser's basic protections
    (like using <svg onload=...>) */}
<p
  dangerouslySetInnerHTML={{ __html: c.content }}
  className="text-[#aaa] leading-relaxed"
/>

// Vulnerable Backend API
const newComment = {
  author: author.trim(),
  content: content.trim(), // ❌ No sanitization
};`;

const FIXED_CODE = `// Secured Frontend (React)
{/* ✅ React safely encodes characters by default
    (converts < to &lt; etc.) preventing execution */}
<p className="text-[#888] leading-relaxed">
  {c.content}
</p>

// Secured Backend API
function sanitizeHtml(str: string) {
  return str.replace(/[&<>"']/g, /* escape html ... */);
}
const newComment = {
  author: sanitizeHtml(author.trim()),
  content: sanitizeHtml(content.trim()), // ✅ Sanitized
};`;

export default function DefenseExplanation() {
  const [activeTab, setActiveTab] = useState<'vuln' | 'fixed'>('fixed');

  return (
    <div className="border border-[#4ade80]/20 bg-[#0e0e0e] p-5 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-3 sm:gap-6 mb-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#4ade80] font-bold shrink-0">
          Defense Blueprint
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('vuln')}
            className={`text-[9px] px-3 py-1 border tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'vuln'
                ? 'border-[var(--red)] text-[var(--red)] font-bold bg-[var(--red)]/10'
                : 'border-white/10 text-white/40 hover:text-white'
            }`}
          >
            Vulnerable
          </button>
          <button
            onClick={() => setActiveTab('fixed')}
            className={`text-[9px] px-3 py-1 border tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'fixed'
                ? 'border-[#4ade80] text-[#4ade80] font-bold bg-[#4ade80]/10'
                : 'border-white/10 text-white/40 hover:text-white'
            }`}
          >
            Secured
          </button>
        </div>
      </div>

      <pre className="border border-white/10 bg-[#070707] p-4 text-[10.5px] leading-relaxed whitespace-pre font-mono overflow-x-auto text-[#aaa]">
        {activeTab === 'vuln' ? (
          <code className="text-[var(--red)]">{VULN_CODE}</code>
        ) : (
          <code className="text-[#4ade80]">{FIXED_CODE}</code>
        )}
      </pre>
    </div>
  );
}

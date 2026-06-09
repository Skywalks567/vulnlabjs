'use client';

export default function MitigationSection() {
  return (
    <div className="lg:col-span-2 border border-[#4ade80]/30 bg-[#05100a] p-6 relative font-mono text-[11px] leading-relaxed mt-4">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#4ade80]/50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#4ade80]/50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#4ade80]/50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#4ade80]/50 pointer-events-none" />

      <div className="text-[#4ade80] uppercase tracking-[0.2em] font-bold border-b border-[#4ade80]/20 pb-2 mb-6 flex items-center gap-3">
        <span>[ 03. DEFENSE ARCHITECTURE ]</span>
        <span className="text-[9px] bg-[#4ade80]/20 text-[#4ade80] px-2 py-0.5 rounded-sm">
          SECURED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-[10px] border-b border-white/10 pb-1">
            Mitigation Strategy
          </h3>
          <p className="text-[#aaa] mb-4">
            The ultimate defense against XSS is ensuring that user input is
            never interpreted as active content by the browser. This requires a
            defense-in-depth approach involving input sanitization,
            context-aware encoding, and strict Content Security Policies (CSP).
          </p>

          <ul className="space-y-3 text-[#aaa]">
            <li className="flex items-start gap-2">
              <span className="text-[#4ade80] mt-0.5">✓</span>
              <span>
                <strong className="text-white">
                  Server-Side Sanitization:
                </strong>{' '}
                Escape HTML entities before storing them in the database.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#4ade80] mt-0.5">✓</span>
              <span>
                <strong className="text-white">
                  Safe Framework Rendering:
                </strong>{' '}
                Use default framework abstractions (like React&apos;s curly
                braces <code className="text-[#4ade80]">{`{content}`}</code>)
                which automatically encode output.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#4ade80] mt-0.5">✓</span>
              <span>
                <strong className="text-white">Avoid Dangerous APIs:</strong>{' '}
                Never use{' '}
                <code className="text-[#4ade80]">dangerouslySetInnerHTML</code>{' '}
                or <code className="text-[#4ade80]">innerHTML</code> directly
                with untrusted data without routing it through a purifier like
                DOMPurify.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-[10px] border-b border-white/10 pb-1">
            Implementation Diff
          </h3>
          <div className="bg-[#0b0b0b] border border-white/5 rounded text-xs overflow-hidden">
            <div className="flex bg-[#111] border-b border-white/5 text-[#666] text-[9px] uppercase tracking-wider">
              <div className="flex-1 p-2 text-center border-r border-white/5">
                Vulnerable
              </div>
              <div className="flex-1 p-2 text-center text-[#4ade80]">Fixed</div>
            </div>
            <div className="flex divide-x divide-white/5">
              <div className="flex-1 p-3 overflow-x-auto">
                <pre className="text-[var(--red)] font-mono text-[9px] leading-relaxed">
                  {`// Backend
const newComment = {
  content: content.trim()
};

// Frontend
<p dangerouslySetInnerHTML={{ 
  __html: c.content 
}} />`}
                </pre>
              </div>
              <div className="flex-1 p-3 bg-[#4ade80]/5 overflow-x-auto">
                <pre className="text-[#4ade80] font-mono text-[9px] leading-relaxed">
                  {`// Backend
const newComment = {
  content: sanitize(content)
};

// Frontend
<p>
  {c.content}
</p>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

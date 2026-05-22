'use client';

export default function MitigationSection() {
  return (
    <div className="border border-[var(--border)] bg-[#070707] p-6 relative font-mono text-[11px] leading-relaxed col-span-1 lg:col-span-2">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />

      <div className="text-[#4ade80] uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-2 mb-4">
        [ 03. DEFENSE &amp; MITIGATION BLUEPRINT (DEFENSE-IN-DEPTH) ]
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#aaa]">
        {/* Core Strategy 1 */}
        <div className="space-y-2 border-r border-white/5 pr-4 last:border-0 last:pr-0">
          <h4 className="text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="text-[#4ade80]">01.</span> CRYPTOGRAPHIC SESSIONS
          </h4>
          <p className="text-[10.5px]">
            Never trust raw custom headers (like{' '}
            <code className="text-white">X-User-Id</code>) directly from the
            client, as they are trivial to spoof. Utilize cryptographically
            signed session cookies or secure{' '}
            <strong className="text-white">JSON Web Tokens (JWT)</strong> to
            manage user authentication safely.
          </p>
        </div>

        {/* Core Strategy 2 */}
        <div className="space-y-2 border-r border-white/5 pr-4 last:border-0 last:pr-0">
          <h4 className="text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="text-[#4ade80]">02.</span> STRICT OWNERSHIP
            VERIFICATION
          </h4>
          <p className="text-[10.5px]">
            Always enforce strict server-side authorization checks. Fetch the
            requested resource by its unique identifier, then validate its
            ownership before returning any data to the frontend:
          </p>
          <pre className="text-[#4ade80] font-mono text-[9px] bg-black/40 p-2 border border-white/5 rounded overflow-x-auto leading-relaxed">
            {`if (note.ownerId !== sessionUserId) {
  return response.json(
    { error: 'Forbidden' },
    { status: 403 }
  );
}`}
          </pre>
        </div>

        {/* Core Strategy 3 */}
        <div className="space-y-2 last:border-0 last:pr-0">
          <h4 className="text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="text-[#4ade80]">03.</span> NON-ENUMERABLE KEYS
            (UUID)
          </h4>
          <p className="text-[10.5px]">
            Avoid exposing sequential integer IDs (
            <code className="text-white">1</code>,{' '}
            <code className="text-white">2</code>,{' '}
            <code className="text-white">3</code>). Employ{' '}
            <strong className="text-white">UUID v4</strong> hashes (e.g.,{' '}
            <code className="text-[9.5px] text-[#4ade80]">
              f81d4fae-7dec...
            </code>
            ) to prevent attackers from scanning or enumerating objects via
            simple integer guessing or automated sweeps.
          </p>
        </div>
      </div>
    </div>
  );
}

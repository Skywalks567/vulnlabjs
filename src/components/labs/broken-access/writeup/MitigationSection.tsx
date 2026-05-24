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
            <span className="text-[#4ade80]">01.</span> SERVER-SIDE PRIVILEGE
            STORE
          </h4>
          <p className="text-[10.5px]">
            Never trust user privileges sent directly from client-controlled
            parameters (like custom headers or cookie strings). Store the
            authoritative user role within the database or inside a
            cryptographically sealed session.
          </p>
        </div>

        {/* Core Strategy 2 */}
        <div className="space-y-2 border-r border-white/5 pr-4 last:border-0 last:pr-0">
          <h4 className="text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="text-[#4ade80]">02.</span> DATABASE-BACKED
            AUTHORIZATION
          </h4>
          <p className="text-[10.5px]">
            For sensitive API endpoints, retrieve the user identity from a
            signed session ID and verify their database-defined role before
            proceeding:
          </p>
          <pre className="text-[#4ade80] font-mono text-[9px] bg-black/40 p-2 border border-white/5 rounded overflow-x-auto leading-relaxed">
            {`const user = await prisma.labUser.findUnique({
  where: { id: sessionUserId },
  select: { role: true }
});

if (!user || user.role !== 'admin') {
  return forbiddenResponse();
}`}
          </pre>
        </div>

        {/* Core Strategy 3 */}
        <div className="space-y-2 last:border-0 last:pr-0">
          <h4 className="text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
            <span className="text-[#4ade80]">03.</span> SECURE COOKIE DIRECTIVES
          </h4>
          <p className="text-[10.5px]">
            When setting cookies, secure them with the following attributes:
            <br />• <strong className="text-white">HttpOnly</strong>: Disallows
            client-side Javascript access (mitigating XSS and DevTools injection
            scripts).
            <br />• <strong className="text-white">Secure</strong>: Restricts
            cookies to HTTPS connections only.
            <br />• <strong className="text-white">SameSite=Strict</strong>:
            Protects against Cross-Site Request Forgery (CSRF).
          </p>
        </div>
      </div>
    </div>
  );
}

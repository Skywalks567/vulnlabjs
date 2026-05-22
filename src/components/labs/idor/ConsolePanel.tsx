import { useEffect, useState } from 'react';

interface ConsolePanelProps {
  mode: 'vulnerable' | 'fixed';
  noteId: string;
  loading: boolean;
  error: string;
  note: {
    id: number;
    title: string;
    content: string;
    owner?: {
      id: number;
      username: string;
      email: string;
    };
  } | null;
}

export default function ConsolePanel({
  mode,
  noteId,
  loading,
  error,
  note,
}: ConsolePanelProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLogs((prev) =>
          [...prev, `[SEND] GET /api/idor/${mode}?id=${noteId}`].slice(-6),
        );
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [loading, noteId, mode]);

  useEffect(() => {
    if (note) {
      const timer = setTimeout(() => {
        setLogs((prev) =>
          [
            ...prev,
            `[RECV] 200 OK (${JSON.stringify(note).length} bytes)`,
            `[DATA] Decrypted title: "${note.title}"`,
          ].slice(-6),
        );
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [note]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        const code = mode === 'fixed' ? '403 Forbidden' : '400 Bad Request';
        setLogs((prev) => [...prev, `[ERR!] ${code} - ${error}`].slice(-6));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [error, mode]);

  const isVulnerable = mode === 'vulnerable';

  return (
    <div className="border border-[var(--border-strong)] bg-[#0e0e0e] p-6 relative font-mono text-[11px] flex flex-col justify-between h-[360px]">
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 pointer-events-none" />

      <div>
        <div className="text-[var(--red)] uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-2 mb-4">
          [ CONSOLE TELEMETRY ]
        </div>
        <div className="space-y-3 mb-6 text-[#c0c0c0]">
          <p>
            <span className="text-[#666] font-bold">SESSION:</span> Alice (ID:
            2)
          </p>
          <p>
            <span className="text-[#666] font-bold">OBJECTIVE:</span>{' '}
            {isVulnerable
              ? "Access Bob's private note and admin's note to leak target data."
              : 'Verify that unauthorized queries are correctly blocked at database boundary.'}
          </p>
        </div>
      </div>

      <div className="border border-white/5 bg-[#060606] p-4 flex-1 flex flex-col justify-end gap-1.5 overflow-hidden">
        <div className="text-[#444] uppercase tracking-wider text-[9px] mb-auto font-bold border-b border-white/5 pb-1">
          HTTP Session Logs
        </div>
        {logs.length === 0 ? (
          <div className="text-[#444] animate-pulse">
            Awaiting network trigger...
          </div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis ${
                log.startsWith('[SEND]')
                  ? 'text-[#38bdf8]'
                  : log.startsWith('[RECV]')
                    ? 'text-[#4ade80]'
                    : log.startsWith('[ERR!]')
                      ? 'text-[var(--red)] font-semibold'
                      : 'text-[#aaa]'
              }`}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

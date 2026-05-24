import { useEffect, useState } from 'react';

interface ConsolePanelProps {
  mode: 'vulnerable' | 'fixed';
  role: string;
  loading: boolean;
  error: string;
  data: {
    status?: string;
    flag?: string;
    usersCount?: number;
  } | null;
}

export default function ConsolePanel({
  mode,
  role,
  loading,
  error,
  data,
}: ConsolePanelProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLogs([
          `[TX] GET /api/broken-access/${mode} HTTP/1.1`,
          `[TX] Host: localhost:3000`,
          `[TX] Connection: keep-alive`,
          `[TX] Cookie: role=${role}`,
        ]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [loading, role, mode]);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          `\u00A0`, // Empty spacer line
          `[RX] HTTP/1.1 200 OK`,
          `[RX] Content-Type: application/json`,
          `[RX] { "status": "${data.status}", "flag": "${data.flag}" }`,
        ]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          `\u00A0`, // Empty spacer line
          `[RX] HTTP/1.1 403 Forbidden`,
          `[RX] Content-Type: application/json`,
          `[RX] { "error": "Administrative privilege required" }`,
        ]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const isVulnerable = mode === 'vulnerable';

  return (
    <div className="border border-[var(--border-strong)] bg-[#0e0e0e] p-6 relative font-mono text-[11px] flex flex-col justify-between h-[380px]">
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 pointer-events-none" />

      <div>
        <div className="text-[var(--red)] uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-2 mb-4">
          [ CONSOLE TELEMETRY ]
        </div>
        <div className="space-y-2 mb-4 text-[#c0c0c0] text-[10.5px]">
          <p>
            <span className="text-[#666] font-bold">SESSION:</span> Alice (ID:
            2)
          </p>
          <p>
            <span className="text-[#666] font-bold">ACTIVE COOKIE:</span>{' '}
            <span
              className={
                role.toLowerCase() === 'admin'
                  ? 'text-[#4ade80] font-bold'
                  : 'text-white'
              }
            >
              role={role}
            </span>
          </p>
          <p>
            <span className="text-[#666] font-bold">OBJECTIVE:</span>{' '}
            {isVulnerable
              ? 'Bypass authorization checks'
              : 'Verify that server session cookies are cryptographically authenticated.'}
          </p>
        </div>
      </div>

      <div className="border border-white/5 bg-[#060606] p-4 flex-grow flex flex-col justify-end gap-1 overflow-hidden select-text">
        <div className="text-[#444] uppercase tracking-wider text-[9px] mb-auto font-bold border-b border-white/5 pb-1">
          HTTP Request/Response Logs
        </div>
        <div className="font-mono text-[10px] space-y-0.5 max-h-32 overflow-y-auto leading-normal">
          {logs.length === 0 ? (
            <div className="text-[#444] animate-pulse">
              Awaiting network trigger...
            </div>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className={`whitespace-nowrap overflow-hidden text-ellipsis ${
                  log.startsWith('[TX]')
                    ? 'text-[#38bdf8]'
                    : log.startsWith('[RX]')
                      ? 'text-[#4ade80]'
                      : log.includes('403') || log.includes('error')
                        ? 'text-[var(--red)] font-semibold'
                        : 'text-[#888]'
                }`}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

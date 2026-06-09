import { useEffect, useRef } from 'react';

interface ConsolePanelProps {
  mode: 'vulnerable' | 'fixed';
  logs: string[];
  activeTab: 'reflected' | 'stored';
}

export default function ConsolePanel({
  mode,
  logs,
  activeTab,
}: ConsolePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

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
        <div className="space-y-2 mb-4 text-[#c0c0c0] text-[10.5px]">
          <p>
            <span className="text-[#666] font-bold">SESSION:</span> Guest User
            (Anonymous)
          </p>
          <p>
            <span className="text-[#666] font-bold">VECTOR:</span>{' '}
            <span className="text-white font-bold uppercase">
              {activeTab} XSS
            </span>
          </p>
          <p>
            <span className="text-[#666] font-bold">OBJECTIVE:</span>{' '}
            {isVulnerable
              ? activeTab === 'reflected'
                ? 'Execute Reflected XSS payloads.'
                : 'Execute Stored XSS payloads.'
              : 'Validate context-aware encoding and CSP policies.'}
          </p>
        </div>
      </div>

      <div className="border border-white/5 bg-[#060606] p-4 flex-grow flex flex-col justify-end gap-1 overflow-hidden select-text">
        <div className="text-[#444] uppercase tracking-wider text-[9px] mb-2 font-bold border-b border-white/5 pb-1">
          HTTP Request/Response Logs
        </div>
        <div
          ref={scrollRef}
          className="font-mono text-[9.5px] space-y-1 max-h-36 overflow-y-auto leading-normal scrollbar-thin"
        >
          {logs.length === 0 ? (
            <div className="text-[#444] animate-pulse">
              Awaiting network traffic...
            </div>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className={`whitespace-pre overflow-hidden text-ellipsis ${
                  log.startsWith('[TX]')
                    ? 'text-[#38bdf8]'
                    : log.startsWith('[RX]')
                      ? 'text-[#4ade80]'
                      : log.startsWith('[!]')
                        ? 'text-[var(--red)] font-bold'
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

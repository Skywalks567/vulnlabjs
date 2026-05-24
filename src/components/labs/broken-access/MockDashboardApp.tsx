'use client';

import { useState } from 'react';

interface MockDashboardProps {
  role: string;
  data: {
    status?: string;
    flag?: string;
    usersCount?: number;
    logs?: string[];
  } | null;
  loading: boolean;
  error: string;
  onRefresh: () => void;
}

export default function MockDashboardApp({
  role,
  data,
  loading,
  error,
  onRefresh,
}: MockDashboardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'admin'>('profile');

  const handleTabChange = (tab: 'profile' | 'admin') => {
    setActiveTab(tab);
    onRefresh();
  };

  return (
    <div className="border border-[var(--border-strong)] bg-[#0c0c0c] flex flex-col h-[460px] overflow-hidden">
      {/* Browser Bar */}
      <div className="bg-[#070707] px-4 py-2.5 border-b border-[var(--border)] flex items-center gap-3 select-none">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-grow bg-[#141414] border border-white/5 rounded px-3 py-1 text-[10px] text-[#888] font-mono flex items-center justify-between">
          <span>http://enterprise.local/dashboard</span>
          <span className="text-[8px] text-[#4ade80] tracking-wider uppercase font-bold">
            ● Secure Connection
          </span>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="bg-white/5 border border-white/10 text-white font-mono text-[9px] px-2.5 py-1 hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer shrink-0"
        >
          🔄 REFRESH
        </button>
      </div>

      {/* App Navbar */}
      <div className="flex bg-[#0f0f0f] border-b border-white/5 font-mono text-[11px] font-bold">
        <button
          onClick={() => handleTabChange('profile')}
          className={`px-6 py-3 transition-colors ${activeTab === 'profile' ? 'bg-[#0c0c0c] text-white border-b border-[var(--red)]' : 'text-[#777] hover:text-[#bbb]'}`}
        >
          👤 USER PROFILE
        </button>
        <button
          onClick={() => handleTabChange('admin')}
          className={`px-6 py-3 transition-colors ${activeTab === 'admin' ? 'bg-[#0c0c0c] text-white border-b border-[var(--red)]' : 'text-[#777] hover:text-[#bbb]'}`}
        >
          🔑 ADMIN CONSOLE
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 text-[#ccc] font-sans">
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 border-r border-white/5 pr-6 font-mono text-xs">
              <h3 className="text-white font-bold text-sm tracking-tight uppercase">
                [ session_dossier ]
              </h3>
              <p>
                <span className="text-[#666]">USERNAME:</span> alice
              </p>
              <p>
                <span className="text-[#666]">EMAIL:</span> alice@vulnlab.local
              </p>
              <p>
                <span className="text-[#666]">ROLE:</span>{' '}
                <span className="text-[#4ade80] border border-[#4ade80]/20 bg-[#4ade80]/5 px-2 py-0.5 rounded text-[10px]">
                  {role.toUpperCase()}
                </span>
              </p>
            </div>
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-white font-bold text-sm tracking-tight uppercase">
                [ gateway_telemetry ]
              </h3>
              <p>
                <span className="text-[#666]">CONNECTION:</span>{' '}
                <span className="text-[#4ade80] font-bold">CONNECTED</span>
              </p>
              <p>
                <span className="text-[#666]">ENCRYPTION:</span>{' '}
                <span className="text-white">TLS_AES_256_GCM</span>
              </p>
              <p>
                <span className="text-[#666]">LATENCY:</span>{' '}
                <span className="text-white">12ms</span>
              </p>
              <p>
                <span className="text-[#666]">TERMINAL:</span>{' '}
                <span className="text-white">node-alice-terminal</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between h-full font-mono text-[11px]">
            {error ? (
              <div className="m-auto text-center space-y-3 p-6 border border-[var(--red)]/20 bg-[var(--red)]/5 rounded max-w-sm">
                <div className="text-[var(--red)] font-bold text-[14px]">
                  ⚠️ 403 ACCESS DENIED
                </div>
                <p className="text-[#aaa] text-[10px] leading-relaxed">
                  Forbidden: Administrative privilege required.
                </p>
              </div>
            ) : data ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white font-bold uppercase">
                    [ ADMINISTRATIVE CONTROL CENTER ]
                  </span>
                  <span className="text-[#4ade80] border border-[#4ade80]/20 bg-[#4ade80]/5 px-2 rounded font-bold text-[9px] animate-pulse">
                    UNLOCKED
                  </span>
                </div>
                <div className="space-y-2 text-[10.5px]">
                  <p>
                    <span className="text-[#666]">SYSTEM STATUS:</span>{' '}
                    <span className="text-[var(--red)] font-bold">
                      {data.status}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#666]">TOTAL ACTIVE USERS:</span>{' '}
                    <span className="text-white">{data.usersCount}</span>
                  </p>
                  <p className="bg-[#4ade80]/10 border border-[#4ade80]/20 p-3 text-[#4ade80] font-bold text-xs">
                    FLAG RECOVERED: {data.flag}
                  </p>
                </div>
              </div>
            ) : (
              <div className="m-auto text-[#444] animate-pulse">
                Contacting administrative secure vault...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

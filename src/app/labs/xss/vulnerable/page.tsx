'use client';
import Breadcrumb from '@/components/labs/Breadcrumb';
import ConsolePanel from '@/components/labs/xss/ConsolePanel';
import ExploitHint from '@/components/labs/xss/vulnerable/ExploitHint';
import MockMessageBoard from '@/components/labs/xss/vulnerable/MockMessageBoard';
import { useEffect, useState } from 'react';

export default function XssVulnerablePage() {
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [reflectedSolved, setReflectedSolved] = useState(false);
  const [storedSolved, setStoredSolved] = useState(false);
  const [activeTab, setActiveTab] = useState<'reflected' | 'stored'>(
    'reflected',
  );
  const [searchQueryId, setSearchQueryId] = useState(0);
  const fetchBoardData = async (query = '') => {
    if (query) setSearchQueryId((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      `[TX] GET /api/xss/vulnerable?search=${encodeURIComponent(query)} HTTP/1.1`,
      `[TX] Host: localhost:3000`,
    ]);
    try {
      const res = await fetch(
        `/api/xss/vulnerable?search=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setComments(data.comments || []);
      setSearchQuery(data.search || '');
      setLogs((prev) => [
        ...prev,
        `[RX] HTTP/1.1 200 OK`,
        `[RX] Content-Type: application/json`,
        `[RX] Echoed Query: "${data.search}"`,
      ]);
    } catch {
      setLogs((prev) => [...prev, `[!] RX Error: Connection reset`]);
    }
  };
  const handlePostComment = async (author: string, content: string) => {
    setLogs((prev) => [
      ...prev,
      `[TX] POST /api/xss/vulnerable HTTP/1.1`,
      `[TX] Content-Type: application/json`,
      `[TX] Payload: { author: "${author}", content: "${content.substring(0, 15)}..." }`,
    ]);
    try {
      const res = await fetch('/api/xss/vulnerable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });
      const data = await res.json();
      if (data.status === 'SUCCESS') {
        setLogs((prev) => [
          ...prev,
          `[RX] HTTP/1.1 200 OK`,
          `[RX] Comment seeded successfully.`,
        ]);
        fetchBoardData(searchQuery);
      }
    } catch {
      setLogs((prev) => [...prev, `[!] RX Error: Submission failed`]);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBoardData();
    }, 0);
    if (typeof window !== 'undefined') {
      const originalAlert = window.alert;
      window.alert = (msg) => {
        setLogs((prev) => [
          ...prev,
          `[!] ALERT INTERCEPTED: "${msg}"`,
          `[!] CRITICAL: Client-side JS execution triggered!`,
        ]);
        if (
          activeTab === 'stored' ||
          (msg && msg.toString().toLowerCase().includes('stored'))
        ) {
          setStoredSolved(true);
        } else {
          setReflectedSolved(true);
        }
        originalAlert(msg);
      };
      return () => {
        window.alert = originalAlert;
        clearTimeout(timer);
      };
    }
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="editorial-lines min-h-screen pb-12">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <Breadcrumb
          items={[
            { label: 'Cross-Site Scripting', href: '/labs/xss' },
            { label: 'Vulnerable' },
          ]}
          backHref="/labs/xss"
        />
        <div className="mb-10 border-b border-[var(--border)] pb-6 flex justify-between items-end">
          <div>
            <h1 className="font-syne text-2xl font-bold text-white tracking-tight uppercase">
              XSS <span className="text-[var(--red)]">Vulnerable Target</span>
            </h1>
            <p className="mt-2 text-[10px] text-[#a0a0a0] font-mono tracking-wider">
              MISSION PATH: /labs/xss/vulnerable
            </p>
          </div>
          <div className="font-mono text-[10px] text-right text-[#a0a0a0]">
            CTF MODE ENABLED
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
          <div className="flex flex-col gap-6 w-full shrink-0">
            <ConsolePanel mode="vulnerable" logs={logs} activeTab={activeTab} />
            <ExploitHint key={activeTab} activeTab={activeTab} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="border border-white/10 bg-[#0c0c0c] p-5 font-mono text-[11px] space-y-3">
              <span className="text-[#666] uppercase text-[9px] block">
                CTF FLAG TRACKER
              </span>
              <div className="flex flex-col sm:flex-row justify-between gap-3 border-t border-white/5 pt-3">
                <div>
                  <span
                    className={
                      reflectedSolved
                        ? 'text-[#4ade80] font-bold'
                        : 'text-white/40'
                    }
                  >
                    [ {reflectedSolved ? '★' : ' '} ] REFLECTED XSS
                  </span>
                  <div className="text-[10px] text-[#888] mt-1">
                    {reflectedSolved
                      ? 'CTF{reflected_xss_mainframe_bypass}'
                      : 'Popping alert(...) via query echo...'}
                  </div>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-6">
                  <span
                    className={
                      storedSolved
                        ? 'text-[#4ade80] font-bold'
                        : 'text-white/40'
                    }
                  >
                    [ {storedSolved ? '★' : ' '} ] STORED XSS
                  </span>
                  <div className="text-[10px] text-[#888] mt-1">
                    {storedSolved
                      ? 'CTF{stored_xss_persistent_session_hijack}'
                      : 'Injecting persistent script into feed...'}
                  </div>
                </div>
              </div>
            </div>
            <MockMessageBoard
              comments={comments}
              searchQuery={searchQuery}
              onSearch={fetchBoardData}
              onSubmitComment={handlePostComment}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              storedSolved={storedSolved}
              searchQueryId={searchQueryId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

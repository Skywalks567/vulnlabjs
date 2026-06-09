'use client';
import Breadcrumb from '@/components/labs/Breadcrumb';
import ConsolePanel from '@/components/labs/xss/ConsolePanel';
import DefenseExplanation from '@/components/labs/xss/fixed/DefenseExplanation';
import FixedMessageBoard from '@/components/labs/xss/fixed/FixedMessageBoard';
import { useEffect, useState } from 'react';

export default function XssFixedPage() {
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'reflected' | 'stored'>(
    'reflected',
  );
  const [searchQueryId, setSearchQueryId] = useState(0);

  const fetchBoardData = async (query = '') => {
    if (query) setSearchQueryId((prev) => prev + 1);
    setLogs((prev) => [
      ...prev,
      `[TX] GET /api/xss/fixed?search=${encodeURIComponent(query)} HTTP/1.1`,
    ]);
    try {
      const res = await fetch(
        `/api/xss/fixed?search=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setComments(data.comments || []);
      setSearchQuery(data.search || '');
      setLogs((prev) => [
        ...prev,
        `[RX] HTTP/1.1 200 OK`,
        `[RX] Echoed Query: "${data.search}"`,
      ]);
    } catch {
      setLogs((prev) => [...prev, `[!] RX Error: Connection reset`]);
    }
  };

  const handlePostComment = async (author: string, content: string) => {
    setLogs((prev) => [...prev, `[TX] POST /api/xss/fixed HTTP/1.1`]);
    try {
      const res = await fetch('/api/xss/fixed', {
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
    const timer = setTimeout(() => fetchBoardData(), 0);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="editorial-lines min-h-screen pb-12">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <Breadcrumb
          items={[
            { label: 'Cross-Site Scripting', href: '/labs/xss' },
            { label: 'Fixed' },
          ]}
          backHref="/labs/xss"
        />
        <div className="mb-10 border-b border-[var(--border)] pb-6 flex justify-between items-end">
          <div>
            <h1 className="font-syne text-2xl font-bold text-white tracking-tight uppercase">
              XSS <span className="text-[#4ade80]">Secured Target</span>
            </h1>
            <p className="mt-2 text-[10px] text-[#a0a0a0] font-mono tracking-wider">
              MISSION PATH: /labs/xss/fixed
            </p>
          </div>
          <div className="font-mono text-[10px] text-right text-[#a0a0a0]">
            DEFENSE MODE ENABLED
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
          <div className="flex flex-col gap-6 w-full shrink-0">
            <ConsolePanel mode="fixed" logs={logs} activeTab={activeTab} />
            <DefenseExplanation />
          </div>
          <div className="flex flex-col gap-6">
            <FixedValidationTracker />
            <FixedMessageBoard
              comments={comments}
              searchQuery={searchQuery}
              onSearch={fetchBoardData}
              onSubmitComment={handlePostComment}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQueryId={searchQueryId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FixedValidationTracker() {
  return (
    <div className="border border-white/10 bg-[#0c0c0c] p-5 font-mono text-[11px] space-y-3">
      <span className="text-[#666] uppercase text-[9px] block">
        VALIDATION STATUS
      </span>
      <div className="flex flex-col sm:flex-row justify-between gap-3 border-t border-white/5 pt-3">
        <div>
          <span className="text-[#4ade80] font-bold">[ ✓ ] REFLECTED XSS</span>
          <div className="text-[10px] text-[#888] mt-1">
            Input safely encoded on reflection
          </div>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-6">
          <span className="text-[#4ade80] font-bold">[ ✓ ] STORED XSS</span>
          <div className="text-[10px] text-[#888] mt-1">
            Data safely stored and rendered
          </div>
        </div>
      </div>
    </div>
  );
}

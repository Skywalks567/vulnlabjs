'use client';

import Breadcrumb from '@/components/labs/Breadcrumb';
import ConsolePanel from '@/components/labs/broken-access/ConsolePanel';
import DefenseExplanation from '@/components/labs/broken-access/DefenseExplanation';
import MockDashboardApp from '@/components/labs/broken-access/MockDashboardApp';
import { useEffect, useState } from 'react';

interface SystemData {
  status: string;
  flag: string;
  usersCount: number;
}

export default function BrokenAccessFixedPage() {
  const [role, setRole] = useState('user');
  const [data, setData] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRoleFromCookie = () => {
    if (typeof document === 'undefined') return 'user';
    const match = document.cookie.match(/(?:^|; )role=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : 'user';
  };

  const fetchSystemData = async () => {
    const activeRole = getRoleFromCookie();
    setRole(activeRole);
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/broken-access/fixed`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Access Denied');
      }
      const systemData = await res.json();
      setData(systemData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Access Denied');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSystemData();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <Breadcrumb
          items={[
            { label: 'Broken Access Control', href: '/labs/broken-access' },
            { label: 'Secured' },
          ]}
          backHref="/labs/broken-access"
        />

        {/* Editorial Header */}
        <div className="mb-10 border-b border-[var(--border)] pb-6">
          <h1 className="font-syne text-2xl font-bold text-white tracking-tight">
            Broken Access <span className="text-[#4ade80]">Secured Target</span>
          </h1>
          <p className="mt-2 text-[10px] text-[#a0a0a0] font-mono tracking-wider">
            MISSION PATH: /labs/broken-access/fixed
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start mb-8">
          <div className="flex flex-col gap-6 w-full shrink-0">
            <ConsolePanel
              mode="fixed"
              role={role}
              loading={loading}
              error={error}
              data={data}
            />
          </div>
          <MockDashboardApp
            role={role}
            data={data}
            loading={loading}
            error={error}
            onRefresh={fetchSystemData}
          />
        </div>

        {/* Defense Blueprint */}
        <DefenseExplanation />
      </div>
    </div>
  );
}

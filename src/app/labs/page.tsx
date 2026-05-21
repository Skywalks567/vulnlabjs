'use client';

import LabFilter from '@/components/labs/LabFilter';
import LabRow from '@/components/labs/LabRow';
import LabStats from '@/components/labs/LabStats';
import { labs } from '@/lib/lab';
import { useMemo, useState } from 'react';

export default function LabsPage() {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  const filtered = useMemo(() => {
    return labs.filter((lab) => {
      const q = search.toLowerCase();
      const matchesSearch =
        lab.title.toLowerCase().includes(q) ||
        lab.description.toLowerCase().includes(q) ||
        lab.tags.some((t) => t.toLowerCase().includes(q));
      const matchesDifficulty =
        selectedDifficulty === 'ALL' ||
        lab.difficulty.toUpperCase() === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [search, selectedDifficulty]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
      {/* Page header */}
      <div className="mb-10 border-b border-[var(--border)] pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[var(--red)]" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[var(--red)]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            OWASP Top 10 — Security Labs
          </span>
        </div>
        <h1
          className="text-3xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          All Labs
        </h1>
      </div>

      {/* Body: sidebar + list */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-start">
        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <LabStats />
          <LabFilter
            search={search}
            setSearch={setSearch}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />
        </aside>

        {/* Lab list */}
        <section>
          {/* Column headers */}
          <div
            className="hidden md:grid grid-cols-[2rem_1fr_auto_auto] gap-6 pb-3 border-b border-[var(--border)] text-[9px] tracking-[0.2em] uppercase text-[#333]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            <span>#</span>
            <span>Lab</span>
            <span>Tags</span>
            <span>Level</span>
          </div>

          {filtered.length > 0 ? (
            filtered.map((lab, i) => (
              <LabRow key={lab.slug} lab={lab} index={i} />
            ))
          ) : (
            <div className="py-16 text-center border-b border-[var(--border)]">
              <p
                className="text-[13px] text-[#444]"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                No labs match your filter.
              </p>
            </div>
          )}

          {filtered.length > 0 && (
            <p
              className="mt-4 text-[10px] text-[#333]"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {filtered.length} of {labs.length} labs
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

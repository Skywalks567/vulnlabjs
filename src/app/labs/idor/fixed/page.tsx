'use client';

import Breadcrumb from '@/components/labs/Breadcrumb';
import ConsolePanel from '@/components/labs/idor/ConsolePanel';
import DefenseExplanation from '@/components/labs/idor/DefenseExplanation';
import MockNotesApp from '@/components/labs/idor/MockNotesApp';
import { useEffect, useState } from 'react';

interface NoteData {
  id: number;
  title: string;
  content: string;
  owner: {
    id: number;
    username: string;
    email: string;
  };
}

export default function IdorFixedPage() {
  const [noteId, setNoteId] = useState('2');
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNote = async (id: string) => {
    setLoading(true);
    setError('');
    setNote(null);
    try {
      const res = await fetch(`/api/idor/fixed?id=${id}`, {
        headers: {
          'X-User-Id': '2',
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to fetch note');
      }
      const data = await res.json();
      setNote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch note');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNote('2');
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="editorial-lines min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
        <Breadcrumb
          items={[{ label: 'IDOR', href: '/labs/idor' }, { label: 'Secured' }]}
          backHref="/labs/idor"
        />

        {/* Massive Editorial Header */}
        <div className="mb-10 border-b border-[var(--border)] pb-6">
          <h1 className="font-syne text-2xl font-bold text-white tracking-tight">
            IDOR <span className="text-[#4ade80]">Secured Target</span>
          </h1>
          <p className="mt-2 text-[10px] text-[#a0a0a0] font-mono tracking-wider">
            MISSION PATH: /labs/idor/fixed
          </p>
        </div>

        {/* Side-by-Side Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          <div className="flex flex-col gap-6 w-full shrink-0">
            <ConsolePanel
              mode="fixed"
              noteId={noteId}
              loading={loading}
              error={error}
              note={note}
            />
            <DefenseExplanation />
          </div>
          <MockNotesApp
            mode="fixed"
            noteId={noteId}
            setNoteId={setNoteId}
            note={note}
            loading={loading}
            error={error}
            onFetch={fetchNote}
          />
        </div>
      </div>
    </div>
  );
}

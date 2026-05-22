import { useState } from 'react';

interface MockNotesAppProps {
  mode: 'vulnerable' | 'fixed';
  noteId: string;
  setNoteId: (id: string) => void;
  note: {
    id: number;
    title: string;
    content: string;
    owner?: { id: number; username: string; email: string };
  } | null;
  loading: boolean;
  error: string;
  onFetch: (id: string) => void;
}

export default function MockNotesApp({
  mode,
  noteId,
  setNoteId,
  note,
  loading,
  error,
  onFetch,
}: MockNotesAppProps) {
  const [inputVal, setInputVal] = useState(noteId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNoteId(inputVal);
    onFetch(inputVal);
  };

  const domainSegment = mode === 'fixed' ? 'fixed' : 'vulnerable';

  return (
    <div className="border border-[var(--border-strong)] bg-[#0e0e0e] rounded-sm overflow-hidden flex flex-col h-[360px] relative">
      {/* Cyberpunk corner notches */}
      {[
        'top-0 left-0 border-t border-l',
        'top-0 right-0 border-t border-r',
        'bottom-0 left-0 border-b border-l',
        'bottom-0 right-0 border-b border-r',
      ].map((pos) => (
        <div
          key={pos}
          className={`absolute w-2.5 h-2.5 border-white/20 pointer-events-none ${pos}`}
        />
      ))}

      {/* Simulated Browser URL bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--border)] bg-[#111] shrink-0 font-mono">
        <div className="flex gap-1.5 shrink-0">
          {[1, 2, 3].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-[#555]" />
          ))}
        </div>
        <div className="flex-1 bg-[#1c1c1c] border border-white/10 px-3 py-1 rounded text-[10px] text-[#888] select-none truncate">
          http://securenote.local/api/idor/{domainSegment}?id=
          <span className="text-white font-bold">{inputVal}</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 bg-[#080808]">
        {/* Left Side Navigation */}
        <div className="w-[140px] border-r border-white/5 bg-[#0a0a0a] p-3 flex flex-col justify-between shrink-0 font-mono">
          <div>
            <div className="text-[8px] uppercase tracking-[0.25em] text-[#555] font-bold mb-3">
              My Notes
            </div>
            <button
              onClick={() => {
                setInputVal('2');
                setNoteId('2');
                onFetch('2');
              }}
              className={`w-full text-left text-[10px] px-2 py-1.5 rounded transition-all truncate ${
                noteId === '2'
                  ? 'bg-[var(--red)]/10 text-[var(--red)] font-bold'
                  : 'text-[#888] hover:bg-white/5 hover:text-white'
              }`}
            >
              📄 Alice Note
            </button>
          </div>
          <div className="text-[9px] text-[#444]">SecureNote v1.0</div>
        </div>

        {/* Note Content Area */}
        <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Query Parameter 'id'"
              className="flex-1 bg-[#151515] border border-[var(--border)] px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[var(--red)]"
            />
            <button
              type="submit"
              className="bg-[var(--red)] px-4 py-1.5 text-[10px] font-bold text-white tracking-wider font-mono hover:bg-[#a93226] active:scale-[0.98] transition-all"
            >
              QUERY
            </button>
          </form>

          <div className="border border-white/5 bg-[#0c0c0c] p-4 flex-1 flex flex-col justify-center min-h-0 font-mono text-xs">
            {loading && (
              <div className="text-center text-[#666] animate-pulse">
                Syncing notes...
              </div>
            )}
            {error && (
              <div className="text-[var(--red)] text-center">
                Error: {error}
              </div>
            )}
            {note && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-[9px] text-[#555] border-b border-white/5 pb-1 mb-2">
                    <span>
                      OWNER: {note.owner?.username} (UID: {note.owner?.id})
                    </span>
                    <span>NOTE ID: {note.id}</span>
                  </div>
                  <h3 className="text-white font-bold text-[13px]">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-[#aaa] leading-relaxed break-all bg-white/[0.01] border border-white/5 p-2.5 text-[11px] max-h-[100px] overflow-y-auto">
                    {note.content}
                  </p>
                </div>
              </div>
            )}
            {!loading && !error && !note && (
              <div className="text-center text-[#444] text-[10px]">
                No active note selected. Use query panel.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

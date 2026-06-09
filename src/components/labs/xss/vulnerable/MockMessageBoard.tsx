'use client';

import { useState } from 'react';

import { SearchResultBanner } from './SearchResultBanner';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface MockMessageBoardProps {
  comments: Comment[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onSubmitComment: (author: string, content: string) => void;
  activeTab: 'reflected' | 'stored';
  setActiveTab: (tab: 'reflected' | 'stored') => void;
  storedSolved: boolean;
  searchQueryId: number;
}

export default function MockMessageBoard({
  comments,
  searchQuery,
  onSearch,
  onSubmitComment,
  activeTab,
  setActiveTab,
  storedSolved,
  searchQueryId,
}: MockMessageBoardProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const isReflected = activeTab === 'reflected';

  return (
    <div className="border border-white/10 bg-[#070707] p-6 relative flex flex-col gap-6 font-mono">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
      <div className="flex border-b border-white/10 mb-2 font-mono text-[10px]">
        <button
          onClick={() => setActiveTab('reflected')}
          className={`flex-1 pb-3 text-center uppercase tracking-wider transition-colors cursor-pointer border-b-2 font-bold ${isReflected ? 'border-[var(--red)] text-white' : 'border-transparent text-white/40 hover:text-white/80'}`}
        >
          Reflected Vector
        </button>
        <button
          onClick={() => setActiveTab('stored')}
          className={`flex-1 pb-3 text-center uppercase tracking-wider transition-colors cursor-pointer border-b-2 font-bold ${!isReflected ? 'border-[var(--red)] text-white' : 'border-transparent text-white/40 hover:text-white/80'}`}
        >
          Stored Vector
        </button>
      </div>

      {isReflected ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(searchInput);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              placeholder="SEARCH MATRIX DATABASE..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow border border-white/10 bg-[#0e0e0e] px-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--red)]"
            />
            <button
              type="submit"
              className="border border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)]/10 px-4 py-2 text-xs font-bold transition-all cursor-pointer"
            >
              QUERY
            </button>
          </form>
          {searchQuery && (
            <SearchResultBanner
              key={`${searchQueryId}-${searchQuery}`}
              query={searchQuery}
            />
          )}
        </>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (author && content) {
                onSubmitComment(author, content);
                setAuthor('');
                setContent('');
              }
            }}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="AUTHOR CODE-NAME"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-white/10 bg-[#0e0e0e] px-4 py-2 text-xs text-white focus:outline-none focus:border-[var(--red)]"
              required
            />
            <textarea
              placeholder="STORED MESSAGE PACKET CONTENT..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-white/10 bg-[#0e0e0e] px-4 py-2 text-xs text-white h-20 focus:outline-none focus:border-[var(--red)] resize-none"
              required
            />
            <button
              type="submit"
              className="border border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)]/10 py-2.5 text-xs font-bold transition-all cursor-pointer uppercase"
            >
              Inject Message Packet
            </button>
          </form>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <div className="text-[9px] tracking-wider text-[#666] uppercase">
              Communications Relay Feed
            </div>
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="border border-white/5 bg-[#0b0b0b] p-4 text-[10.5px] space-y-1.5"
                >
                  <div className="flex justify-between text-[8.5px] text-[#666]">
                    <span>RELAY AUTHOR: {c.author}</span>
                    <span>{new Date(c.timestamp).toLocaleString()}</span>
                  </div>
                  {storedSolved ? (
                    <p className="text-[#888] leading-relaxed break-all bg-white/5 p-2 rounded text-[10px]">
                      {c.content}
                    </p>
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: c.content }}
                      className="text-[#aaa] leading-relaxed break-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

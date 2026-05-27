'use client';

import { memo } from 'react';

interface SearchResultBannerProps {
  query: string;
}

export const SearchResultBanner = memo(({ query }: SearchResultBannerProps) => {
  return (
    <div className="border border-[var(--red)]/20 bg-red-950/5 p-4 text-[10.5px] font-mono">
      <span className="text-[#666] uppercase">SEARCH MATRIX ECHO:</span>{' '}
      <span
        dangerouslySetInnerHTML={{ __html: query }}
        className="text-white font-bold"
      />
    </div>
  );
});

SearchResultBanner.displayName = 'SearchResultBanner';

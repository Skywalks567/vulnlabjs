'use client';

import { memo } from 'react';

interface FixedSearchResultBannerProps {
  query: string;
}

export const FixedSearchResultBanner = memo(
  ({ query }: FixedSearchResultBannerProps) => {
    return (
      <div className="border border-[#4ade80]/20 bg-green-950/5 p-4 text-[10.5px] font-mono">
        <span className="text-[#666] uppercase">SEARCH MATRIX ECHO:</span>{' '}
        <span className="text-white font-bold">{query}</span>
      </div>
    );
  },
);

FixedSearchResultBanner.displayName = 'FixedSearchResultBanner';

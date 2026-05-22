/* Labs sidebar — search + difficulty filter, editorial theme */

interface FilterProps {
  search: string;
  setSearch: (val: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (val: string) => void;
}

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate'];

export default function LabFilter({
  search,
  setSearch,
  selectedDifficulty,
  setSelectedDifficulty,
}: FilterProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[9px] tracking-[0.2em] uppercase text-[#b8b8b8]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Search
        </label>
        <input
          type="text"
          placeholder="e.g. sql, xss, jwt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[var(--border-strong)] bg-transparent px-3 py-2.5 text-[12px] text-white placeholder-[#888] outline-none focus:border-[var(--red)] transition-colors"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        />
      </div>

      {/* Difficulty filter */}
      <div className="flex flex-col gap-1.5">
        <div
          className="text-[9px] tracking-[0.2em] uppercase text-[#b8b8b8]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Difficulty
        </div>
        <div className="flex flex-col gap-px border border-[var(--border)] bg-[var(--border)]">
          {DIFFICULTIES.map((d) => {
            const active =
              selectedDifficulty === d.toUpperCase() ||
              (d === 'All' && selectedDifficulty === 'ALL');
            return (
              <button
                key={d}
                onClick={() =>
                  setSelectedDifficulty(d === 'All' ? 'ALL' : d.toUpperCase())
                }
                className={`w-full text-left px-4 py-2.5 text-[11px] transition-colors ${active ? 'bg-[var(--red)] text-white' : 'bg-[#080808] text-[#c8c8c8] hover:text-white hover:bg-white/[0.03]'}`}
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

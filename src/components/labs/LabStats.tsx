/* Labs sidebar — stat counters matching editorial theme */
import { labs } from '@/lib/lab';

const beginnerCount = labs.filter(
  (l) => l.difficulty.toLowerCase() === 'beginner',
).length;
const intermediateCount = labs.filter(
  (l) => l.difficulty.toLowerCase() === 'intermediate',
).length;

const STATS = [
  { label: 'Total Labs', value: String(labs.length) },
  { label: 'Beginner', value: String(beginnerCount) },
  { label: 'Intermediate', value: String(intermediateCount) },
  { label: 'Host', value: '127.0.0.1' },
];

export default function LabStats() {
  return (
    <div className="grid grid-cols-2 gap-px border border-[var(--border)] bg-[var(--border)]">
      {STATS.map((s) => (
        <div key={s.label} className="bg-[#080808] px-4 py-3">
          <div
            className="text-[9px] tracking-[0.2em] uppercase text-[#b8b8b8] mb-1"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {s.label}
          </div>
          <div
            className="text-[15px] font-bold text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

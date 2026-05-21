import HeroTerminal from '@/components/TerminalDemo';
import FeatureStrip from '@/components/landing/FeatureStrip';
import HeroCTA from '@/components/landing/HeroCTA';
import HeroHeadline from '@/components/landing/HeroHeadline';
import LabMarquee from '@/components/landing/LabMarquee';
import SecurityCallout from '@/components/landing/SecurityCallout';

export default function Home() {
  return (
    <div className="editorial-lines">
      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-0 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          {/* Left: Typographic hero */}
          <div className="flex flex-col gap-8">
            <HeroHeadline />
            <HeroCTA />
          </div>

          {/* Right: Terminal — floats alongside headline */}
          <div className="reveal reveal-2 lg:pt-6 w-full">
            <div
              className="text-[9px] tracking-[0.3em] uppercase text-[#444] mb-3"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              Quick setup
            </div>
            <HeroTerminal />

            {/* Stack chips below terminal */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['Next.js 16', 'Prisma 7', 'Supabase', 'TypeScript'].map((s) => (
                <span
                  key={s}
                  className="text-[10px] border border-[var(--border)] text-[#555] px-2.5 py-1 tracking-wide"
                  style={{ fontFamily: 'var(--font-dm-mono)' }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lab name ticker ── */}
      <div className="mx-auto w-full max-w-7xl px-0">
        <LabMarquee />
      </div>

      {/* ── Features ── */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <FeatureStrip />
        <SecurityCallout />
      </div>
    </div>
  );
}

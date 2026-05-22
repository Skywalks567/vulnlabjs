/* CTA buttons — part of hero section */
import Link from 'next/link';

export default function HeroCTA() {
  return (
    <div className="reveal reveal-3 flex flex-wrap items-center gap-4 pt-2">
      <Link
        href="/labs"
        className="group relative inline-flex items-center gap-3 bg-[var(--red)] px-7 py-3.5 text-[13px] font-semibold text-white tracking-wide transition-all duration-200 hover:bg-[#a93226] active:scale-[0.98]"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        Start Learning
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>

      <a
        href="https://github.com/Skywalks567/vulnlabjs"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[var(--border-strong)] px-7 py-3.5 text-[13px] text-[#b8b8b8] tracking-wide transition-colors duration-200 hover:text-white hover:border-white/30"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        View Source
      </a>
    </div>
  );
}

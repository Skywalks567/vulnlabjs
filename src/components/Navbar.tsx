import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[#080808]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2">
          <span
            className="text-[var(--red)] text-[11px] font-medium tracking-[0.15em] mr-1 select-none"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            [v]
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white group-hover:text-[#ddd] transition-colors">
            VulnLab<span className="text-[var(--red)]">JS</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className="text-[13px] text-[#555] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Home
          </Link>
          <Link
            href="/labs"
            className="text-[13px] text-[#555] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Labs
          </Link>
          <Link
            href="/labs"
            className="text-[12px] bg-[var(--red)] text-white px-4 py-1.5 font-medium hover:bg-[#a93226] transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Start →
          </Link>
        </div>
      </nav>
    </header>
  );
}

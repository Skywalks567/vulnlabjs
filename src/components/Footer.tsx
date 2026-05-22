import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[#080808] px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[14px] font-bold text-white">
            VulnLab<span className="text-[var(--red)]">JS</span>
          </span>
          <p
            className="text-[11px] text-[#444] max-w-xs leading-relaxed"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            Local security lab. Not for public deployment.
          </p>
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-6 text-[12px] text-[#444]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/labs" className="hover:text-white transition-colors">
            Labs
          </Link>
          <a
            href="https://owasp.org/www-project-top-ten/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            OWASP Top 10
          </a>
        </div>

        {/* Copyright */}
        <p
          className="text-[11px] text-[#333]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          © {new Date().getFullYear()} VulnLabJS
        </p>
      </div>
    </footer>
  );
}

import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  backHref?: string;
  hideDefault?: boolean;
}

export default function Breadcrumb({
  items,
  backHref,
  hideDefault = false,
}: BreadcrumbProps) {
  const defaultItems = hideDefault
    ? []
    : [
        { label: 'Home', href: '/' },
        { label: 'Labs', href: '/labs' },
      ];

  const allItems = [...defaultItems, ...items];

  return (
    <nav
      className="flex items-center flex-wrap gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-[#dcdcdc]"
      style={{ fontFamily: 'var(--font-dm-mono)' }}
    >
      {backHref && (
        <>
          <Link
            href={backHref}
            className="hover:text-[var(--red)] transition-colors mr-1 shrink-0"
          >
            ← Back
          </Link>
          <span className="text-white/20 mr-1 shrink-0">|</span>
        </>
      )}

      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <div key={index} className="flex items-center gap-2 shrink-0">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[var(--red)] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--red)]">{item.label}</span>
            )}
            {!isLast && <span className="text-white/20">/</span>}
          </div>
        );
      })}
    </nav>
  );
}

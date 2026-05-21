import { labs } from '@/lib/lab';
import Link from 'next/link';

export default function LabsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">VulnLabJS Labs</h1>
      <p className="mt-2 text-gray-600">
        A hands-on web security learning lab for common OWASP vulnerabilities.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <Link
            key={lab.slug}
            href={`/labs/${lab.slug}`}
            className="rounded-xl border p-5 transition hover:bg-gray-50"
          >
            <div className="text-sm text-gray-500">{lab.difficulty}</div>
            <h2 className="mt-2 text-xl font-semibold">{lab.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{lab.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {lab.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

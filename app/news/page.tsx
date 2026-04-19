import Link from 'next/link'
import { getAllNews } from '../lib/news'

export default function NewsPage() {
  const items = getAllNews()

  return (
    <main className="min-h-screen bg-[#09090b] text-[#fafafa]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#52525b] mb-4">Newsroom</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3">QFBench News</h1>
          <p className="text-base text-[#a1a1aa] max-w-2xl">
            Product updates, benchmark announcements, and community events.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#1e1e24] bg-[#111113] p-6 hover:border-[#3f3f46] transition-colors duration-200"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[#00ff88]">{item.id}</span>
                {item.status ? (
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded border text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20">
                    {item.status}
                  </span>
                ) : null}
                <span className="font-mono text-xs text-[#52525b]">{item.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">{item.summary}</p>
              <Link
                href={`/news/${item.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#00ff88] hover:text-white transition-colors duration-200"
              >
                Read update
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllNews, getNewsById } from '../../lib/news'

export function generateStaticParams() {
  return getAllNews().map((item) => ({ id: item.id }))
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = getNewsById(id)

  if (!item) notFound()

  return (
    <main className="min-h-screen bg-[#09090b] text-[#fafafa]">
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-[#00ff88] hover:text-white transition-colors duration-200 mb-8">
          <span aria-hidden="true">←</span>
          Back to all news
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#00ff88]">{item.id}</span>
          {item.status ? (
            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded border text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20">
              {item.status}
            </span>
          ) : null}
          <span className="font-mono text-xs text-[#52525b]">{item.date}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">{item.title}</h1>
        <p className="text-lg text-[#a1a1aa] leading-relaxed mb-8">{item.summary}</p>

        <div className="rounded-2xl border border-[#1e1e24] bg-[#111113] p-6 sm:p-8 space-y-5">
          {item.body.map((paragraph) => (
            <p key={paragraph} className="text-base text-[#d4d4d8] leading-8">
              {paragraph}
            </p>
          ))}

          {(item.meetingLink || item.meetingTime) && (
            <div className="pt-4 border-t border-[#1e1e24] space-y-2">
              {item.meetingLink ? (
                <p className="font-mono text-sm text-[#a1a1aa]">
                  Meeting link:{' '}
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ff88] hover:underline break-all"
                  >
                    {item.meetingLink}
                  </a>
                </p>
              ) : null}
              {item.meetingTime ? <p className="font-mono text-sm text-[#a1a1aa]">Meeting time: {item.meetingTime}</p> : null}
            </div>
          )}
        </div>
      </article>
    </main>
  )
}

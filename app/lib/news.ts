export type NewsItem = {
  id: string
  title: string
  date: string
  summary: string
  body: string[]
  meetingLink?: string
  meetingTime?: string
  status?: string
}

export const newsItems: NewsItem[] = [
  {
    id: 'N-001',
    title: 'Weekly QFBench Discussion Is Open to Everyone',
    date: '2026-04-18',
    summary:
      'Join our weekly discussion to talk about benchmark progress, quantitative finance tasks, and upcoming evaluation updates.',
    body: [
      'We welcome everyone to join our weekly QFBench discussion.',
      'This is a casual working session for benchmark updates, ideas, and community feedback.',
    ],
    meetingLink: 'https://meet.google.com/oyz-oyky-urc',
    meetingTime: 'Saturday 4:00 PM PST',
    status: 'New',
  },
]

export function getAllNews() {
  return [...newsItems].sort((a, b) => b.date.localeCompare(a.date))
}

export function getLatestNews(limit = 3) {
  return getAllNews().slice(0, limit)
}

export function getNewsById(id: string) {
  return newsItems.find((item) => item.id === id)
}

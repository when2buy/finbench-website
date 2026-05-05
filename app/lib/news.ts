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
    id: 'N-002',
    title: 'QFBench Expands to 87 Merged Tasks',
    date: '2026-05-04',
    summary:
      'The benchmark repository has grown to 87 merged quantitative finance tasks, with the full 90-task milestone now in sight.',
    body: [
      'QFBench main now includes 87 merged tasks across derivatives pricing, risk, market microstructure, factor research, credit, crypto, and event-driven workflows.',
      'Recent additions include stable-residual, residual-momentum, double-sort, prediction-markets-cross-venue-dislocation, multimodal-alpha-fusion-edgar-cot-gdelt, barone-adesi-whaley, cir-bond-pricing, and event-study-earnings.',
      'The website task catalog is connected directly to the GitHub repository, so merged tasks appear with their task.toml difficulty metadata. The leaderboard remains a calibration view until the expanded model evaluation sweep is complete.',
    ],
    status: 'Dataset',
  },
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

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
    id: 'N-003',
    title: 'V11 Leaderboard Published Across 80 Complete CLI Tasks',
    date: '2026-05-04',
    summary:
      'The homepage leaderboard now reflects V11 pass@1/pass@3 results: GPT-5.5 leads at 61.7% pass@1, followed by GPT-5.3-codex and Opus 4.6.',
    body: [
      'V11 ranks CLI agents by pass@1 across the 80 tasks where all seven evaluated models have complete three-run coverage.',
      'The top results are GPT-5.5 at 61.7% pass@1 / 66.2% pass@3, GPT-5.3-codex at 60.8% / 67.5%, and Opus 4.6 at 59.2% / 65.0%.',
      'Finance-Zero is now tracked separately as a non-agentic baseline across 83 valid tasks, led by Opus 4.6 at 24.7% pass@1.',
    ],
    status: 'Leaderboard',
  },
  {
    id: 'N-002',
    title: 'QFBench Expands to 87 Merged Tasks',
    date: '2026-05-04',
    summary:
      'The benchmark repository has grown to 87 merged quantitative finance tasks, with the full 90-task milestone now in sight.',
    body: [
      'QFBench main now includes 87 merged tasks across derivatives pricing, risk, market microstructure, factor research, credit, crypto, and event-driven workflows.',
      'Recent additions include stable-residual, residual-momentum, double-sort, prediction-markets-cross-venue-dislocation, multimodal-alpha-fusion-edgar-cot-gdelt, barone-adesi-whaley, cir-bond-pricing, and event-study-earnings.',
      'The website task catalog is connected directly to the GitHub repository, so merged tasks appear with their task.toml difficulty metadata. The homepage leaderboard has also been refreshed to the V11 pass@1/pass@3 results.',
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

'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getLatestNews } from './lib/news'
import { v11HeatmapRows, v11HeatmapTasks } from './lib/v11Heatmap'

// Task format diagram: ASCII tree, padded so "#" aligns at column 46
const _pad = (s: string, comment: string) => s + ' '.repeat(46 - s.length) + comment
const TASK_FORMAT_DIAGRAM = [
  'tasks/<task-id>/',
  _pad('+-- task.toml', '# Metadata & resource limits'),
  _pad('+-- instruction.md', '# Agent-facing problem statement'),
  '+-- environment/',
  _pad('|   +-- Dockerfile', '# Inherits from quantitativefinance-bench-sandbox'),
  _pad('|   +-- data/', '# Input datasets'),
  _pad('|   \\-- skills/', '# OPTIONAL — skills available to agent'),
  '|       \\-- <skill-name>/',
  '|           +-- SKILL.md',
  _pad('|           +-- scripts/', '# optional'),
  '|           \\-- ...',
  '+-- tests/',
  _pad('|   +-- test.sh', '# Harbor verifier entry-point'),
  _pad('|   \\-- test_outputs.py', '# Pytest assertions'),
  '\\-- solution/',
  _pad('    \\-- solve.sh', '# Reference (oracle) solution'),
].join('\n')

const CURRENT_TASK_COUNT = 87
const TARGET_TASK_COUNT = 90
const CLI_LEADERBOARD_TASK_COUNT = 87
const FINANCE_ZERO_TASK_COUNT = 87
const EVALUATED_MODEL_COUNT = 42

const contributorAffiliations = [
  {
    name: 'Stanford',
    domain: 'stanford.edu',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Stanford_plain_block_%22S%22_logo.svg',
  },
  {
    name: 'UC Berkeley',
    domain: 'berkeley.edu',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/82/University_of_California%2C_Berkeley_logo.svg',
  },
  {
    name: 'CMU',
    domain: 'cmu.edu',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Carnegie_Mellon_University_wordmark.svg',
  },
  {
    name: 'Princeton',
    domain: 'princeton.edu',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Princeton_text_logo.svg',
  },
  {
    name: 'University of Chicago',
    domain: 'uchicago.edu',
    logoSrc: '/contributor-logos/uchicago-logo.svg',
  },
  {
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    logoSrc: 'https://www.stonybrook.edu/_resources/images/sb-logo-desktop-12.7.25.svg',
  },
  {
    name: 'OpenAI',
    domain: 'openai.com',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  },
  {
    name: 'Anthropic',
    domain: 'anthropic.com',
    logoSrc: 'https://cdn.simpleicons.org/anthropic/191919',
  },
  {
    name: 'Google DeepMind',
    domain: 'deepmind.google',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Google_DeepMind_logo.svg',
  },
  {
    name: 'xAI',
    domain: 'x.ai',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/57/XAI-Logo.svg',
  },
  {
    name: 'Meta',
    domain: 'meta.com',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
  },
  {
    name: 'Google',
    domain: 'google.com',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Millennium Management',
    domain: 'mlp.com',
    logoSrc: '/contributor-logos/millennium.jpg',
  },
  {
    name: 'Point72',
    domain: 'point72.com',
    logoSrc: '/contributor-logos/point72.png',
  },
  {
    name: 'Paraclete Capital',
    domain: 'paraclete.capital',
    logoSrc: '/contributor-logos/paraclete.jpg',
  },
]

const heatColor = (value: number | null, kind: 'CLI' | 'Finance-Zero') => {
  if (value === null) return { background: '#111113', borderColor: '#27272a', opacity: 0.36 }
  const clamped = Math.max(0, Math.min(1, value))
  const hue = kind === 'CLI' ? 150 : 205
  const saturation = kind === 'CLI' ? 92 : 88
  const lightness = 12 + clamped * 46
  return {
    background: `linear-gradient(180deg, hsl(${hue} ${saturation}% ${lightness + 6}%), hsl(${hue} ${saturation}% ${lightness}%))`,
    borderColor: clamped > 0.82 ? 'rgba(250,250,250,0.32)' : clamped > 0.45 ? 'rgba(255,255,255,0.13)' : 'rgba(39,39,42,0.75)',
    opacity: 0.42 + clamped * 0.58,
  }
}

export default function Home() {
  const latestNews = getLatestNews(3)
  const leaderboard = [
    {
      rank: 1,
      model: 'GPT-5.5',
      agent: 'codex-cli',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 61.7,
      passAt3: 66.2,
      date: '2026-05-07',
    },
    {
      rank: 2,
      model: 'claude-opus-4-7',
      agent: 'claude-code',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 61.2,
      passAt3: 67.1,
      date: '2026-05-07',
    },
    {
      rank: 3,
      model: 'GPT-5.3-codex',
      agent: 'codex-cli',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 60.8,
      passAt3: 67.5,
      date: '2026-05-07',
    },
    {
      rank: 4,
      model: 'claude-opus-4-6',
      agent: 'claude-code',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 59.2,
      passAt3: 65.0,
      date: '2026-05-07',
    },
    {
      rank: 5,
      model: 'GPT-5.4',
      agent: 'codex-cli',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 57.5,
      passAt3: 63.8,
      date: '2026-05-07',
    },
    {
      rank: 6,
      model: 'GPT-5.4-mini',
      agent: 'codex-cli',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 57.1,
      passAt3: 68.8,
      date: '2026-05-07',
    },
    {
      rank: 7,
      model: 'claude-sonnet-4-6',
      agent: 'claude-code',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 56.3,
      passAt3: 67.1,
      date: '2026-05-07',
    },
    {
      rank: 8,
      model: 'claude-sonnet-4-5',
      agent: 'claude-code',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 46.2,
      passAt3: 60.0,
      date: '2026-05-07',
    },
    {
      rank: 9,
      model: 'claude-haiku-4-5',
      agent: 'claude-code',
      tasks: CLI_LEADERBOARD_TASK_COUNT,
      passRate: 20.8,
      passAt3: 31.2,
      date: '2026-05-07',
    },
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  const repoUrl = 'https://github.com/QF-Bench/QuantitativeFinance-Bench'
  const tasksDirUrl = `${repoUrl}/tree/main/tasks`

  type RepoTask = { id: string; difficulty?: string }
  const [repoTasks, setRepoTasks] = useState<RepoTask[]>([])
  const [repoTasksLoading, setRepoTasksLoading] = useState(true)
  const [repoTasksError, setRepoTasksError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('https://api.github.com/repos/QF-Bench/QuantitativeFinance-Bench/contents/tasks')
      .then((r) => {
        if (!r.ok) throw new Error(`Tasks API: ${r.status}`)
        return r.json()
      })
      .then((contents: { name: string; type: string }[]) => {
        if (cancelled) return
        const dirs = (contents || []).filter((item) => item.type === 'dir').map((item) => item.name)
        if (dirs.length === 0) {
          setRepoTasks([])
          setRepoTasksLoading(false)
          return
        }
        const rawBase = 'https://raw.githubusercontent.com/QF-Bench/QuantitativeFinance-Bench/main/tasks'
        Promise.all(
          dirs.map((name) =>
            fetch(`${rawBase}/${encodeURIComponent(name)}/task.toml`)
              .then((r) => (r.ok ? r.text() : ''))
              .then((text) => {
                const m = text.match(/difficulty\s*=\s*["']([^"']+)["']/i)
                return { id: name, difficulty: m ? m[1].toLowerCase() : undefined }
              })
              .catch(() => ({ id: name, difficulty: undefined as string | undefined }))
          )
        )
          .then((list) => {
            if (!cancelled) {
              setRepoTasks(list.sort((a, b) => a.id.localeCompare(b.id)))
            }
          })
          .catch(() => {
            if (!cancelled) setRepoTasks(dirs.map((id) => ({ id, difficulty: undefined })).sort((a, b) => a.id.localeCompare(b.id)))
          })
          .finally(() => {
            if (!cancelled) setRepoTasksLoading(false)
          })
      })
      .catch((err) => {
        if (!cancelled) {
          setRepoTasksError(err instanceof Error ? err.message : 'Failed to load tasks')
          setRepoTasks([])
        }
        setRepoTasksLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const websiteRepoUrl = 'https://github.com/when2buy/finbench-website'
  const totalContributors = 145
  const activeContributorCount = 26
  type Contributor = { login: string; avatarUrl: string; bench: boolean; website: boolean }
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [contributorsLoading, setContributorsLoading] = useState(true)
  const [contributorsError, setContributorsError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const map = new Map<string, Contributor>()
    const add = (list: { login: string; avatar_url: string; type: string }[], repo: 'bench' | 'website') => {
      list
        .filter((c) => c.type !== 'Bot' && !c.login.endsWith('[bot]'))
        .forEach((c) => {
          const existing = map.get(c.login)
          if (existing) {
            if (repo === 'bench') existing.bench = true
            else existing.website = true
          } else {
            map.set(c.login, {
              login: c.login,
              avatarUrl: c.avatar_url,
              bench: repo === 'bench',
              website: repo === 'website',
            })
          }
        })
    }
    Promise.all([
      fetch('https://api.github.com/repos/QF-Bench/QuantitativeFinance-Bench/contributors?per_page=100').then((r) => (r.ok ? r.json() : [])),
      fetch('https://api.github.com/repos/when2buy/finbench-website/contributors?per_page=100').then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([benchData, websiteData]: { login: string; avatar_url: string; type: string }[][]) => {
        if (cancelled) return
        add(benchData, 'bench')
        add(websiteData, 'website')
        setContributors(Array.from(map.values()).sort((a, b) => a.login.localeCompare(b.login)))
      })
      .catch((err) => {
        if (!cancelled) setContributorsError(err instanceof Error ? err.message : 'Failed to load contributors')
      })
      .finally(() => {
        if (!cancelled) setContributorsLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const diffConfig: Record<string, { color: string; label: string }> = {
    easy: { color: '#22c55e', label: 'easy' },
    medium: { color: '#eab308', label: 'medium' },
    'medium-hard': { color: '#f97316', label: 'medium-hard' },
    hard: { color: '#ef4444', label: 'hard' },
    very_hard: { color: "#a855f7", label: "very hard" },
  }

  return (
    <>
      {/* Smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* Background dot grid */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none" aria-hidden="true" />

      <main className="relative overflow-x-hidden">
        {/* ─── Navbar ─── */}
        <nav className="sticky top-0 z-50 w-full bg-[#09090b]/90 backdrop-blur border-b border-[#1e1e24]">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="font-bold text-sm tracking-tight">
              <span className="text-white">QF</span><span className="text-[#00ff88]">Bench</span>
            </a>

            {/* Desktop nav links + GitHub */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-5 font-mono text-sm text-[#a1a1aa]">
                <a href="#leaderboard" className="hover:text-white transition-colors duration-200">Leaderboard</a>
                <a href="#tasks" className="hover:text-white transition-colors duration-200">Tasks</a>
                <a href="#run" className="hover:text-white transition-colors duration-200">Run</a>
                <a href="#next" className="hover:text-white transition-colors duration-200">What&apos;s Next</a>
                <a href="#news" className="hover:text-white transition-colors duration-200">News</a>
                <a href="#contributors" className="hover:text-white transition-colors duration-200">Contributors</a>
                <a href="#docs" className="hover:text-white transition-colors duration-200">Contribute</a>
              </div>
              <a
                href="https://github.com/QF-Bench/QuantitativeFinance-Bench"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fafafa] text-[#09090b] text-xs font-medium rounded-lg hover:bg-[#d4d4d8] transition-colors duration-200"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub ↗
              </a>
              {/* Hamburger — mobile only */}
              <button
                className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-px bg-[#71717a] transition-transform duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`block w-5 h-px bg-[#71717a] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-px bg-[#71717a] transition-transform duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="sm:hidden border-t border-[#1e1e24] bg-[#09090b]/95 px-6 py-4 flex flex-col gap-4 font-mono text-sm text-[#a1a1aa]">
              <a href="#leaderboard" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">Leaderboard</a>
              <a href="#tasks" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">Tasks</a>
              <a href="#run" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">Run</a>
              <a href="#next" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">What&apos;s Next</a>
              <a href="#news" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">News</a>
              <a href="#contributors" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">Contributors</a>
              <a href="#docs" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-200">Contribute</a>
            </div>
          )}
        </nav>

        {/* ─── Hero ─── */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-mono border border-[#27272a] text-[#52525b] rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse-slow" />
            Open Benchmark
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4 break-words">
            <span className="block sm:inline">Quantitative</span>
            <span className="block sm:inline">Finance-</span>
            <span className="text-[#00ff88] glow-green">Bench</span>
          </h1>
          <p className="text-xs font-mono text-[#3f3f46] tracking-widest uppercase mb-6">QFBench · Quantitative Finance Benchmark</p>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-xl mb-10 leading-relaxed">
            The definitive benchmark for AI agents in quantitative finance.
            Hard problems. Real code. Verifiable outputs.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-sm mb-10">
            <span className="text-[#00ff88]">{repoTasksLoading ? CURRENT_TASK_COUNT : repoTasks.length}</span>
            <span className="text-[#71717a]">Tasks</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">{EVALUATED_MODEL_COUNT}</span>
            <span className="text-[#71717a]">Models</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">10,962</span>
            <span className="text-[#71717a]">Runs</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">61.7%</span>
            <span className="text-[#71717a]">Best Pass@1</span>
          </div>

          {/* Paper link */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="/qfbench_paper_v0.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#27272a] text-sm text-[#a1a1aa] rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Paper (NeurIPS 2026)
            </a>
            <a
              href="https://github.com/QF-Bench/QuantitativeFinance-Bench"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#27272a] text-sm text-[#a1a1aa] rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              Dataset &amp; Code
            </a>
          </div>

          {/* CTA */}
          <a
            href="#leaderboard"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#fafafa] text-[#09090b] text-sm font-medium rounded-lg hover:bg-[#d4d4d8] transition-colors duration-200 cursor-pointer"
          >
            View Leaderboard ↓
          </a>
        </section>

        {/* Divider */}
        <div className="h-px divider-accent" aria-hidden="true" />

        {/* ─── What Makes QFBench Different ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">What Makes QFBench Different</h2>
          <p className="text-base text-[#a1a1aa] mb-10">Not another QA benchmark — agents must think like quants</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                tag: 'General Coding',
                tagColor: '#71717a',
                title: 'vs HumanEval / MBPP',
                body: 'HumanEval tests algorithm logic with unit tests. QFBench requires domain knowledge: Black-Scholes, hazard rates, OU processes. The math must be right, not just the code structure.',
              },
              {
                tag: 'RAG / QA',
                tagColor: '#71717a',
                title: 'vs FinanceBench (RAG)',
                body: 'The other FinanceBench asks questions about financial documents. Ours requires agents to write and execute quantitative code — no retrieval, no lookup, pure numerical implementation.',
              },
              {
                tag: 'Terminal Ops',
                tagColor: '#71717a',
                title: 'vs Terminal-Bench',
                body: 'Terminal-Bench evaluates CLI proficiency. QFBench evaluates whether agents can implement numerical methods correctly inside a Docker sandbox with Python financial libraries.',
              },
              {
                tag: 'Quality Control',
                tagColor: '#00ff88',
                title: 'The Finance-Zero Rule',
                body: 'A non-agentic baseline: one LLM call, one script, one run. V11 tracks it separately so agentic CLI results are compared against a transparent single-shot baseline.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl px-5 py-5 border border-[#1e1e24] bg-[#111113]/40 hover:border-[#3f3f46] transition-colors duration-200"
              >
                <span
                  className="inline-block font-mono text-[10px] px-1.5 py-0.5 rounded border mb-3"
                  style={{
                    color: item.tagColor,
                    backgroundColor: `${item.tagColor}12`,
                    borderColor: `${item.tagColor}30`,
                  }}
                >
                  {item.tag}
                </span>
                <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Leaderboard ─── */}
        <section id="leaderboard" className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-semibold tracking-tight">Leaderboard</h2>
          </div>

          <p className="text-base text-[#a1a1aa] mb-10">
            Agent performance ranked by pass@1 across {CLI_LEADERBOARD_TASK_COUNT} tasks with complete 3-run CLI coverage
          </p>

          {/* Model ranking cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {leaderboard.map((entry) => {
              const isLeader = entry.rank === 1
              return (
                <div
                  key={entry.rank}
                  className={`rounded-xl p-5 border transition-colors duration-200 ${
                    isLeader
                      ? 'bg-[#00ff88]/[0.03] border-[#00ff88]/20 hover:border-[#00ff88]/35'
                      : 'bg-[#111113] border-[#1e1e24] hover:border-[#3f3f46]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-xs text-[#52525b]">#{entry.rank}</span>
                    <span className="font-mono text-[11px] text-[#3f3f46]">{entry.date}</span>
                  </div>

                  <p className="font-mono font-semibold text-[15px] mb-0.5">{entry.model}</p>
                  <p className="font-mono text-xs text-[#52525b] mb-5">via {entry.agent}</p>

                  <div className="flex items-end justify-between mb-3">
                    <span
                      className="font-mono text-3xl font-bold tracking-tight"
                      style={{ color: isLeader ? '#00ff88' : '#a1a1aa' }}
                    >
                      {entry.passRate}%
                    </span>
                    <span className="font-mono text-sm text-[#52525b]">
                      pass@3 {entry.passAt3}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-[#1a1a1f] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${entry.passRate}%`,
                        backgroundColor: isLeader ? '#00ff88' : '#52525b',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* ─── Bar Chart ─── */}
          <div className="mb-14">
            <p className="font-mono text-[11px] text-[#3f3f46] uppercase tracking-widest mb-6">
              pass@1 comparison
            </p>
            <div className="space-y-3">
              {leaderboard.map((entry, i) => {
                const colors = ['#00ff88', '#52c4ff', '#f97316', '#a855f7', '#eab308', '#ef4444', '#71717a']
                const color = colors[i] ?? '#52525b'
                const isLeader = entry.rank === 1
                return (
                  <div key={entry.rank} className="flex items-center gap-4">
                    {/* Model name */}
                    <div className="w-40 shrink-0 text-right">
                      <span className={`font-mono text-xs truncate block ${isLeader ? 'text-white' : 'text-[#a1a1aa]'}`}>
                        {entry.model}
                      </span>
                    </div>
                    {/* Bar track */}
                    <div className="flex-1 h-8 bg-[#111113] rounded-md border border-[#1e1e24] overflow-hidden relative">
                      <div
                        className="h-full rounded-md transition-all duration-700"
                        style={{
                          width: `${entry.passRate}%`,
                          backgroundColor: color,
                          opacity: 0.85,
                        }}
                      />
                      {/* Tick marks at 25%, 50%, 75% */}
                      {[25, 50, 75].map((tick) => (
                        <div
                          key={tick}
                          className="absolute top-0 bottom-0 w-px bg-[#27272a]"
                          style={{ left: `${tick}%` }}
                        />
                      ))}
                    </div>
                    {/* Score label */}
                    <div className="w-28 shrink-0 flex items-center gap-1.5">
                      <span className="font-mono text-sm font-bold" style={{ color }}>
                        {entry.passRate}%
                      </span>
                      <span className="font-mono text-xs text-[#52525b]">
                        p@3 {entry.passAt3}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex ml-44 mr-32 mt-1.5 justify-between">
              {[0, 25, 50, 75, 100].map((v) => (
                <span key={v} className="font-mono text-[10px] text-[#3f3f46]">{v}%</span>
              ))}
            </div>
          </div>

          {/* V11 dense heatmap */}
          <div className="mb-2 rounded-2xl border border-[#1e1e24] bg-[#0b0b0d] overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle at 16% 0%, rgba(0,255,136,0.14), transparent 32%), radial-gradient(circle at 88% 8%, rgba(82,196,255,0.12), transparent 30%)' }} />
            <div className="relative p-5 sm:p-6 border-b border-[#1e1e24]">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] text-[#00ff88] uppercase tracking-[0.24em] mb-2">
                    V11 score heatmap
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Model × task score field</h3>
                  <p className="text-sm text-[#a1a1aa] mt-2 max-w-2xl leading-relaxed">
                    Each pixel is the average score across three runs for one model on one task. Task IDs are shown as clickable vertical labels; CLI rows glow green and Finance-Zero rows glow blue.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-[#52525b]">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#111113] border border-[#27272a]" />0.00</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: 'hsl(150 92% 34%)' }} />0.50</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: 'hsl(150 92% 64%)' }} />1.00 CLI</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: 'hsl(205 88% 60%)' }} />Finance-Zero</div>
                </div>
              </div>
            </div>

            <div className="relative overflow-x-auto px-5 sm:px-6 py-5">
              <div className="min-w-[1420px]">
                <div className="grid gap-1.5 items-center mb-2" style={{ gridTemplateColumns: `158px repeat(${v11HeatmapTasks.length}, 14px) 54px` }}>
                  <div className="font-mono text-[10px] text-[#3f3f46] uppercase tracking-widest">model</div>
                  {v11HeatmapTasks.map((task, i) => (
                    <a
                      key={task}
                      href={`${repoUrl}/tree/main/tasks/${encodeURIComponent(task)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-40 flex items-end justify-center group rounded-sm hover:bg-[#18181b]/80 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/60"
                      title={`${i + 1}. ${task}`}
                      aria-label={`Open task ${task}`}
                    >
                      <span
                        className={`font-mono text-[8px] leading-none transition-colors ${i % 5 === 0 ? 'text-[#71717a]' : 'text-[#3f3f46]'} group-hover:text-[#00ff88]`}
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {i + 1}.{task}
                      </span>
                    </a>
                  ))}
                  <div className="font-mono text-[10px] text-[#3f3f46] text-right">avg</div>
                </div>

                <div className="space-y-1.5">
                  {v11HeatmapRows.map((row, rowIndex) => (
                    <div key={row.id}>
                      {rowIndex === 7 && <div className="h-px bg-[#1e1e24] my-2" />}
                      <div className="grid gap-1.5 items-center" style={{ gridTemplateColumns: `158px repeat(${v11HeatmapTasks.length}, 14px) 54px` }}>
                        <div className="flex items-center gap-2 pr-2">
                          <span className="font-mono text-[10px] text-[#3f3f46] w-5">{row.kind === 'CLI' ? 'CLI' : 'FZ'}</span>
                          <span className={`font-mono text-xs truncate ${rowIndex === 0 ? 'text-white' : row.kind === 'CLI' ? 'text-[#a1a1aa]' : 'text-[#52c4ff]'}`}>
                            {row.label}
                          </span>
                        </div>
                        {row.values.map((value, taskIndex) => {
                          const style = heatColor(value, row.kind)
                          const pct = value === null ? '—' : `${Math.round(value * 100)}%`
                          return (
                            <a
                              key={`${row.id}-${taskIndex}`}
                              href={`${repoUrl}/tree/main/tasks/${encodeURIComponent(v11HeatmapTasks[taskIndex])}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-4 rounded-[2px] border transition-transform duration-150 hover:scale-[1.65] hover:z-10 hover:shadow-[0_0_16px_rgba(0,255,136,0.35)] focus:outline-none focus:ring-1 focus:ring-[#00ff88]/70"
                              style={style}
                              title={`${row.label} · ${v11HeatmapTasks[taskIndex]} · ${pct}`}
                              aria-label={`Open task ${v11HeatmapTasks[taskIndex]} score for ${row.label}: ${pct}`}
                            />
                          )
                        })}
                        <div className="font-mono text-xs text-right" style={{ color: row.kind === 'CLI' ? '#00ff88' : '#52c4ff' }}>
                          {row.avg === null ? '—' : `${Math.round(row.avg * 100)}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-[#1e1e24] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono text-[#52525b]">
                  <div><span className="text-[#00ff88]">7 CLI agents</span> × {v11HeatmapTasks.length} tasks × 3 runs</div>
                  <div><span className="text-[#52c4ff]">3 Finance-Zero baselines</span> tracked separately</div>
                  <div className="sm:text-right">Source: V11-RESULTS.md · d2ad3a2 · 2026-05-04 UTC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Single-run note */}
          <p className="font-mono text-[11px] text-[#3f3f46] mt-6 pt-5 border-t border-[#1e1e24]">
            V11 uses three independent runs per task. ERR runs caused by Docker/verifier failures are excluded from both numerator and denominator. CLI comparison covers 80 tasks where all seven models have complete 3-round data.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Key Findings ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Key Findings</h2>
          <p className="text-base text-[#a1a1aa] mb-10">Insights from the V11 three-run benchmark sweep</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: "Winner",
                tagColor: "#00ff88",
                title: "GPT-5.5 Leads V11",
                body: "GPT-5.5 ranks first on pass@1 at 61.7% across the 80-task complete CLI comparison set. GPT-5.3-codex is close behind at 60.8%, with Opus 4.6 third at 59.2%.",
              },
              {
                tag: "Stability",
                tagColor: "#52c4ff",
                title: "pass@3 Shows Recovery Potential",
                body: "GPT-5.4-mini posts the strongest pass@3 at 68.8%, showing that repeated attempts can recover many failures even when pass@1 trails the top models.",
              },
              {
                tag: "Baseline",
                tagColor: "#f97316",
                title: "Finance-Zero Remains Far Behind",
                body: "The best non-agentic Finance-Zero baseline reaches 24.7% pass@1 across 83 valid tasks, well below the CLI-agent leaderboard and useful as a quality-control floor.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl px-5 py-5 border border-[#1e1e24] bg-[#111113]/40 hover:border-[#3f3f46] transition-colors duration-200"
              >
                <span
                  className="inline-block font-mono text-[10px] px-1.5 py-0.5 rounded border mb-3"
                  style={{
                    color: item.tagColor,
                    backgroundColor: `${item.tagColor}12`,
                    borderColor: `${item.tagColor}30`,
                  }}
                >
                  {item.tag}
                </span>
                <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Task Catalog ─── */}
        <section id="tasks" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Task Catalog</h2>
          <p className="text-base text-[#a1a1aa] mb-10">
            {repoTasksLoading && 'Loading tasks from main…'}
            {repoTasksError && !repoTasks.length && <span className="text-[#ef4444]">{repoTasksError}</span>}
            {!repoTasksLoading && !repoTasksError && (
              <>{repoTasks.length} tasks merged to main on <a href={tasksDirUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">QFBench</a>. Difficulty from <code className="text-[#71717a]">task.toml</code>.</>
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {repoTasks.map((task) => {
              const diff = task.difficulty && diffConfig[task.difficulty] ? diffConfig[task.difficulty] : { color: '#71717a', label: task.difficulty || '—' }
              return (
                <a
                  key={task.id}
                  href={`${repoUrl}/tree/main/tasks/${encodeURIComponent(task.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-5 py-4 border border-[#1e1e24] bg-[#111113]/60 hover:border-[#3f3f46] transition-colors duration-200 cursor-pointer block"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-medium text-[#a1a1aa] hover:text-white">{task.id}</span>
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                      style={{
                        color: diff.color,
                        backgroundColor: `${diff.color}10`,
                        borderColor: `${diff.color}25`,
                      }}
                    >
                      {diff.label}
                    </span>
                  </div>
                  <p className="text-sm text-[#71717a] mt-1.5">View task on GitHub →</p>
                </a>
              )
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Run It Yourself ─── */}
        <section id="run" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Run It Yourself</h2>
          <p className="text-base text-[#a1a1aa] mb-10">
            Evaluate any agent on QFBench using the Harbor framework
          </p>

          <div className="space-y-6">
            {[
              {
                label: '# 1. Install & build sandbox',
                code: `pip install harbor

# Build sandbox base image (one-time, ~5 minutes)
docker build -t quantitativefinance-bench-sandbox:latest \
  -f docker/sandbox.Dockerfile .`,
              },
              {
                label: '# 2. Run an agent',
                code: `export ANTHROPIC_API_KEY=<your-key>

# Run Claude Code on all calibration tasks
harbor run --path ./tasks \
    --agent claude-code \
    --model anthropic/claude-sonnet-4-20250514

# Or target a single task
harbor run --path ./tasks \
    --task-name cds-pricing \
    --agent claude-code \
    --model anthropic/claude-haiku-3-5-20241022`,
              },
              {
                label: '# 3. Finance-Zero baseline (free with Gemini)',
                code: `export GEMINI_API_KEY=<your-key>

harbor run --path ./tasks \
    --agent-import-path agents.finance_zero:FinanceZeroAgent \
    --model gemini/gemini-2.0-flash`,
              },
            ].map((block) => (
              <div
                key={block.label}
                className="rounded-xl border border-[#1e1e24] overflow-hidden"
              >
                <div className="px-4 py-2 bg-[#0d0d0f] border-b border-[#1e1e24]">
                  <span className="font-mono text-[11px] text-[#71717a]">{block.label}</span>
                </div>
                <pre className="px-5 py-4 bg-[#0a0a0c] overflow-x-auto">
                  <code className="font-mono text-xs text-[#a1a1aa] leading-relaxed whitespace-pre">
                    {block.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] text-[#3f3f46] mt-6">
            Results are saved to{' '}
            <span className="text-[#71717a]">jobs/&lt;timestamp&gt;/result.json</span>
            . Each run creates agent trajectories, test output, and token usage logs.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── How It Works ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">How It Works</h2>
          <p className="text-base text-[#a1a1aa] mb-10">
            Rigorous evaluation powered by Harbor. Binary pass/fail scoring with strict numerical tolerances.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Task Specification',
                body: 'Each agent receives instruction.md with input data and evaluation criteria. No hints, no examples — just the problem.',
              },
              {
                step: '02',
                title: 'Sandbox Execution',
                body: 'The agent writes and runs code inside a Docker sandbox with Python, NumPy, Pandas, TA-Lib pre-installed. Full iteration allowed.',
              },
              {
                step: '03',
                title: 'Verification',
                body: 'Harbor runs pytest against the agent\'s output. Strict numerical tolerances. Pass or fail — no partial credit.',
              },
              {
                step: '04',
                title: 'Finance-Zero Baseline',
                body: 'A single-call non-agentic baseline: one LLM call, one script, one run. V11 reports it separately from CLI-agent results.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl px-5 py-5 border border-[#1e1e24] bg-[#111113]/40 hover:border-[#3f3f46] transition-colors duration-200"
              >
                <span className="font-mono text-[11px] text-[#00ff88]/60 tracking-wider">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── What's Next ─── */}
        <section id="next" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">What&apos;s Next</h2>
          <p className="text-base text-[#a1a1aa] mb-10">Maintaining the V11 leaderboard while the benchmark closes the 90-task target</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { model: 'Per-task public matrix', agent: 'website', status: 'Planned', statusColor: '#52525b' },
              { model: 'Finance-Zero Baseline', agent: 'single-call scripts', status: `${FINANCE_ZERO_TASK_COUNT} Tasks Done`, statusColor: '#00ff88' },
              { model: `Full ${TARGET_TASK_COUNT} Tasks`, agent: 'all models', status: `${CURRENT_TASK_COUNT}/${TARGET_TASK_COUNT} Merged`, statusColor: '#00ff88' },
            ].map((item) => (
              <div
                key={item.model}
                className="relative rounded-xl p-5 border border-[#1e1e24] bg-[#111113] hover:border-[#3f3f46] transition-colors duration-200"
              >
                <span
                  className="absolute top-4 right-4 font-mono text-[10px] px-1.5 py-0.5 rounded border"
                  style={{
                    color: item.statusColor,
                    backgroundColor: `${item.statusColor}12`,
                    borderColor: `${item.statusColor}30`,
                  }}
                >
                  {item.status}
                </span>
                <p className="font-mono font-semibold text-[15px] mb-1 pr-20">{item.model}</p>
                <p className="font-mono text-sm text-[#a1a1aa]">{item.agent}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── News ─── */}
        <section id="news" className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-semibold mb-1 tracking-tight">Latest News</h2>
              <p className="text-base text-[#a1a1aa]">Latest updates from the QFBench project</p>
            </div>
            <Link href="/news" className="text-sm font-medium text-[#00ff88] hover:text-white transition-colors duration-200">
              View all news →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {latestNews.map((item) => (
              <article
                key={item.id}
                className="rounded-xl p-5 border border-[#1e1e24] bg-[#111113] hover:border-[#3f3f46] transition-colors duration-200"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-[#00ff88]">{item.id}</span>
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded border text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20">
                    {item.status}
                  </span>
                  <span className="font-mono text-xs text-[#52525b]">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">{item.summary}</p>
                <div className="rounded-lg border border-[#1e1e24] bg-[#0d0d10] p-4 space-y-2 text-sm">
                  <p className="text-[#d4d4d8]">{item.body[0]}</p>
                  {item.meetingLink ? (
                    <p className="font-mono text-[#a1a1aa]">
                      Meeting link:{' '}
                      <a href={item.meetingLink} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline break-all">
                        {item.meetingLink}
                      </a>
                    </p>
                  ) : null}
                  {item.meetingTime ? <p className="font-mono text-[#a1a1aa]">Meeting time: {item.meetingTime}</p> : null}
                </div>
                <div className="mt-4">
                  <Link href={`/news/${item.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#00ff88] hover:text-white transition-colors duration-200">
                    Read full update
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Contributors ─── */}
        <section id="contributors" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Contributors</h2>
          <p className="text-base text-[#a1a1aa] mb-10">
            Thank you to everyone who has contributed to the benchmark or this website. Sourced from{' '}
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">QFBench</a>
            {' and '}
            <a href={websiteRepoUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">finbench-website</a>.
          </p>
          {contributorsLoading && (
            <p className="font-mono text-sm text-[#a1a1aa] mb-8">Loading contributors…</p>
          )}
          {contributorsError && (
            <p className="font-mono text-xs text-[#ef4444] mb-8">{contributorsError}</p>
          )}
          {!contributorsLoading && !contributorsError && (
            <p className="font-mono text-sm text-[#a1a1aa] mb-8">
              {totalContributors} contributors total · {activeContributorCount} active GitHub contributors
            </p>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {contributors.map((c) => (
              <a
                key={c.login}
                href={`https://github.com/${c.login}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`${c.login}${c.bench ? ' · QFBench' : ''}${c.website ? ' · Website' : ''}`}
                className="group rounded-lg px-2 py-2.5 border border-[#1e1e24] bg-[#111113]/40 hover:border-[#3f3f46] transition-colors duration-200 flex flex-col items-center text-center"
              >
                <span className="block w-9 h-9 rounded-full overflow-hidden mb-1.5 border border-[#27272a] group-hover:border-[#52525b] transition-colors">
                  <img
                    src={c.avatarUrl}
                    alt={c.login}
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="w-full truncate font-mono text-[10px] leading-tight font-medium text-[#a1a1aa] group-hover:text-white transition-colors">
                  {c.login}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={`${repoUrl}/blob/main/docs/task_contribution.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#27272a] text-[#a1a1aa] font-mono text-xs rounded-lg hover:border-[#3f3f46] hover:text-white transition-colors duration-200"
            >
              Become a Contributor
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── How to Contribute ─── */}
        <section id="docs" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">How to Contribute</h2>
          <p className="text-base text-[#a1a1aa] mb-10">
            QFBench is community-built. Every task on this leaderboard was contributed by the community — yours could be next.
          </p>

          {/* CTA cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              {
                emoji: '🧪',
                title: 'Submit a Task',
                body: 'Design a hard quant problem, write the verifier, and open a PR. Three merged tasks = authorship on the paper.',
                href: `${repoUrl}/blob/main/docs/task_contribution.md`,
                label: 'Contribution guide →',
              },
              {
                emoji: '🤖',
                title: 'Evaluate a Model',
                body: 'Run any agent on the benchmark and submit your results. Help us expand the V11 leaderboard beyond the current CLI models.',
                href: `${repoUrl}/blob/main/docs/model_reference.md`,
                label: 'Model reference →',
              },
              {
                emoji: '💬',
                title: 'Join the Community',
                body: 'Found a bug? Have a task idea? Want to co-author? Open an issue or start a discussion on GitHub.',
                href: `${repoUrl}/issues`,
                label: 'Open an issue →',
              },
            ].map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-5 py-5 border border-[#1e1e24] bg-[#111113]/40 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/[0.02] transition-colors duration-200 block group"
              >
                <span className="text-2xl mb-3 block">{card.emoji}</span>
                <h3 className="text-sm font-semibold mb-2 group-hover:text-white transition-colors">{card.title}</h3>
                <p className="text-sm text-[#71717a] leading-relaxed mb-4">{card.body}</p>
                <span className="font-mono text-xs text-[#00ff88]">{card.label}</span>
              </a>
            ))}
          </div>

          <div className="space-y-10 text-base">
            <div>
              <h3 className="font-semibold text-[#a1a1aa] mb-2 font-mono text-xs uppercase tracking-wider">What makes a good task?</h3>
              <p className="text-[#a1a1aa] leading-relaxed mb-3">
                QFBench tasks must require real quant expertise: numerical methods, dirty data, and verifiable outputs. Not trivia — real professional workflows that a senior quant would recognize. See the full guide for design principles and examples.
              </p>
              <a
                href={`${repoUrl}/blob/main/docs/task_contribution.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff88] hover:underline font-mono text-xs"
              >
                Task contribution guide →
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-[#a1a1aa] mb-2 font-mono text-xs uppercase tracking-wider">Task requirements</h3>
              <ul className="list-disc list-inside text-[#a1a1aa] space-y-1.5">
                <li>Tasks must be <strong className="text-[#a1a1aa]">verifiable and easy to verify</strong>: explicit output contract (what to produce and where to save it), programmatically checkable by code (e.g. <code className="text-[#71717a]">np.isclose</code>).</li>
                <li><code className="text-[#71717a]">instruction.md</code> and <code className="text-[#71717a]">task.toml</code> must be <strong className="text-[#a1a1aa]">written entirely by humans</strong>. <code className="text-[#71717a]">instruction.md</code> must <strong className="text-[#a1a1aa]">not</strong> reference which skills to use — the agent must figure that out itself.</li>
                <li>The reference solution must <strong className="text-[#a1a1aa]">not be leaked</strong> via skills or the Dockerfile; no task-specific hints that give away the answer.</li>
                <li><strong className="text-[#a1a1aa]">Oracle must pass 100%</strong>: the reference solution must pass all tests. Run <code className="text-[#71717a]">harbor run --path ./tasks --task-name &lt;task-id&gt; --agent oracle</code> and confirm every test passes before submitting.</li>
                <li>Compare against Finance-Zero: run the single-shot baseline and report it separately from CLI-agent runs.</li>
                <li>Deterministic: same input → same output; no external APIs at runtime.</li>
                <li>Use real data, not synthetic — real data has missing values, outliers, mixed formats.</li>
                <li>Tasks must represent <strong className="text-[#a1a1aa]">realistic professional workflows</strong> without artificial difficulty. The problem itself should be fundamentally hard, not an ordinary problem made adversarial so that agents score low and one can claim hardness.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#a1a1aa] mb-2 font-mono text-xs uppercase tracking-wider">Task format</h3>
              <p className="text-[#a1a1aa] mb-2">Every task directory must include:</p>
              <pre className="rounded-xl border border-[#1e1e24] bg-[#0a0a0c] px-4 py-4 overflow-x-auto font-mono text-[11px] text-[#a1a1aa] whitespace-pre">{TASK_FORMAT_DIAGRAM}</pre>
            </div>

            <div>
              <h3 className="font-semibold text-[#a1a1aa] mb-2 font-mono text-xs uppercase tracking-wider">Workflow</h3>
              <ol className="list-decimal list-inside text-[#a1a1aa] space-y-1.5">
                <li>Design the task and implement all required files (instruction, metadata, environment, tests, reference solution).</li>
                <li>Run <code className="text-[#71717a]">harbor run --path ./tasks --task-name &lt;task-id&gt; --agent oracle</code> — oracle must pass 100%.</li>
                <li>Run Finance-Zero baseline and report the result separately from agentic CLI attempts.</li>
                <li>Run at least <strong className="text-[#a1a1aa]">two frontier agents from different companies</strong> (see the &quot;Frontier (Strongest)&quot; section in the <a href={`${repoUrl}/blob/main/docs/model_reference.md`} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">model reference</a>) and record results; include screenshots and a summary table in your PR.</li>
                <li>Open a PR with your task under <code className="text-[#71717a]">tasks/</code>.</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-[#a1a1aa] mb-2 font-mono text-xs uppercase tracking-wider">FAQ</h3>
              <div className="space-y-6 text-[#a1a1aa]">
                <div>
                  <p className="font-medium text-[#a1a1aa] mb-1">What kind of tasks are we looking for?</p>
                  <p className="text-base text-[#a1a1aa] leading-relaxed">
                    See the task design principles and difficulty guide in the <a href={`${repoUrl}/blob/main/docs/task_contribution.md`} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">task contribution guide</a>.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#a1a1aa] mb-1">How do I qualify for authorship?</p>
                  <p className="text-base text-[#a1a1aa] leading-relaxed">
                    Three high-quality tasks merged to main count as automatic authorship. Your set must include at most one easy task and at least one hard task. Edge cases (e.g. two hard tasks) need to be reviewed on a case-by-case basis.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#a1a1aa] mb-1">What if I contribute fewer tasks but help in other ways?</p>
                  <p className="text-base text-[#a1a1aa] leading-relaxed">
                    We count other contributions too: engineering (infrastructure, tooling, CI/CD), running experiments, and paper writing. We’re flexible — if you want to help, reach out.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#a1a1aa] mb-2 font-mono text-xs uppercase tracking-wider">Resources</h3>
              <ul className="text-[#a1a1aa] space-y-1">
                <li>
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">QFBench repo</a>
                </li>
                <li>
                  <a href={`${repoUrl}/blob/main/docs/task_contribution.md`} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Task contribution guide (full)</a>
                </li>
                <li>
                  <a href={`${repoUrl}/blob/main/docs/model_reference.md`} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Model &amp; agent quick reference</a>
                </li>
                <li>
                  <a href="https://github.com/laude-institute/harbor" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Harbor framework</a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Footer ─── */}
        <footer className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-12 rounded-2xl border border-[#1e1e24] bg-[#111113]/35 px-5 py-6 sm:px-7 sm:py-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#71717a] mb-2">
              Contributor affiliations
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6">
              Contributors come from these institutions, labs, and firms.
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {contributorAffiliations.map((org) => (
                <a
                  key={org.name}
                  href={`https://${org.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-24 rounded-xl border border-[#27272a] bg-[#0a0a0c]/70 px-3 py-4 flex flex-col items-center justify-center gap-3 hover:border-[#00ff88]/35 hover:bg-[#00ff88]/[0.025] transition-colors duration-200"
                >
                  <span className="h-12 w-full rounded-lg bg-white flex items-center justify-center overflow-hidden border border-white/10 px-2">
                    <img
                      src={org.logoSrc}
                      alt={`${org.name} logo`}
                      className="max-h-9 max-w-full object-contain"
                      loading="lazy"
                    />
                  </span>
                  <span className="text-center text-xs font-medium text-[#a1a1aa] group-hover:text-white transition-colors leading-snug">
                    {org.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[#3f3f46]">
              Live task catalog from GitHub: {repoTasksLoading ? CURRENT_TASK_COUNT : repoTasks.length} of {TARGET_TASK_COUNT} target tasks merged. Built on{' '}
              <a
                href="https://github.com/laude-institute/harbor"
                className="text-[#71717a] hover:text-[#a1a1aa] transition-colors duration-200 cursor-pointer"
              >
                Harbor
              </a>{' '}
              evaluation framework.
            </p>
            <div className="flex gap-6 font-mono text-xs">
              <a
                href="https://github.com/QF-Bench/QuantitativeFinance-Bench"
                className="text-[#3f3f46] hover:text-[#a1a1aa] transition-colors duration-200 cursor-pointer"
              >
                GitHub
              </a>
              <a
                href="https://github.com/laude-institute/harbor"
                className="text-[#3f3f46] hover:text-[#a1a1aa] transition-colors duration-200 cursor-pointer"
              >
                Harbor
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

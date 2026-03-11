'use client'
import { useState, useEffect } from 'react'

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

export default function Home() {
  const leaderboard = [
    {
      rank: 1,
      model: "claude-opus-4-6",
      agent: "claude-code",
      tasks: 14,
      pass: 7,
      passRate: 50,
      date: "2026-03-07",
      taskResults: {
        "american-option-fd-new": true,
        "barrier-garch-var": false,
        "bollinger-backtest-aapl": true,
        "cta-basel-capital": false,
        "fama-french-factor-model-new": true,
        "hull-white-swaption": false,
        "kelly-var-sizing": true,
        "mc-greeks-surface": true,
        "momentum-backtest": true,
        "regime-cta-vol-target": false,
        "regime-riskparity-cvar": false,
        "sentiment-factor-alpha": false,
        "stochvol-implied-surface-new": true,
        "structured-note-risk": false,
      },
    },
    {
      rank: 2,
      model: "claude-sonnet-4-6",
      agent: "claude-code",
      tasks: 14,
      pass: 5,
      passRate: 36,
      date: "2026-03-07",
      taskResults: {
        "american-option-fd-new": true,
        "barrier-garch-var": false,
        "bollinger-backtest-aapl": true,
        "cta-basel-capital": false,
        "fama-french-factor-model-new": true,
        "hull-white-swaption": false,
        "kelly-var-sizing": false,
        "mc-greeks-surface": false,
        "momentum-backtest": true,
        "regime-cta-vol-target": false,
        "regime-riskparity-cvar": false,
        "sentiment-factor-alpha": false,
        "stochvol-implied-surface-new": true,
        "structured-note-risk": false,
      },
    },
    {
      rank: 3,
      model: "claude-haiku-4-5",
      agent: "claude-code",
      tasks: 7,
      pass: 2,
      passRate: 29,
      date: "2026-03-08",
      taskResults: {
        "american-option-fd-new": false,
        "barrier-garch-var": null,
        "bollinger-backtest-aapl": false,
        "cta-basel-capital": null,
        "fama-french-factor-model-new": true,
        "hull-white-swaption": false,
        "kelly-var-sizing": null,
        "mc-greeks-surface": false,
        "momentum-backtest": true,
        "regime-cta-vol-target": null,
        "regime-riskparity-cvar": null,
        "sentiment-factor-alpha": null,
        "stochvol-implied-surface-new": false,
        "structured-note-risk": null,
      },
    },
    {
      rank: 4,
      model: "gemini-2.5-pro",
      agent: "gemini-cli",
      tasks: 7,
      pass: 0,
      passRate: 0,
      date: "2026-03-06",
      taskResults: {
        "american-option-fd-new": null,
        "barrier-garch-var": false,
        "bollinger-backtest-aapl": null,
        "cta-basel-capital": false,
        "fama-french-factor-model-new": null,
        "hull-white-swaption": null,
        "kelly-var-sizing": false,
        "mc-greeks-surface": null,
        "momentum-backtest": null,
        "regime-cta-vol-target": false,
        "regime-riskparity-cvar": false,
        "sentiment-factor-alpha": false,
        "stochvol-implied-surface-new": null,
        "structured-note-risk": false,
      },
    },
  ]

  const tasks = [
    { id: "american-option-fd-new", abbr: "AOF", difficulty: "hard" as const, expertTime: "45 min", description: "Price American options via finite-difference PDE methods with early exercise boundary detection." },
    { id: "barrier-garch-var", abbr: "BGV", difficulty: "hard" as const, expertTime: "50 min", description: "Model barrier option pricing combined with GARCH volatility estimation and VaR computation." },
    { id: "bollinger-backtest-aapl", abbr: "BBA", difficulty: "medium" as const, expertTime: "30 min", description: "Implement and backtest a Bollinger Band strategy on AAPL historical data with transaction costs." },
    { id: "cta-basel-capital", abbr: "CBC", difficulty: "hard" as const, expertTime: "60 min", description: "Compute CTA strategy risk metrics and Basel III regulatory capital requirements." },
    { id: "fama-french-factor-model-new", abbr: "FFM", difficulty: "easy" as const, expertTime: "20 min", description: "Estimate Fama-French three-factor model exposures via OLS regression on equity returns." },
    { id: "hull-white-swaption", abbr: "HWS", difficulty: "very_hard" as const, expertTime: "75 min", description: "Price swaptions using the Hull-White one-factor interest rate model with analytical formulas." },
    { id: "kelly-var-sizing", abbr: "KVS", difficulty: "medium" as const, expertTime: "35 min", description: "Derive Kelly-optimal position sizes incorporating VaR constraints and portfolio correlation." },
    { id: "mc-greeks-surface", abbr: "MGS", difficulty: "hard" as const, expertTime: "75 min", description: "Compute option Greeks surface via Monte Carlo using finite-difference, pathwise, and likelihood-ratio methods." },
    { id: "momentum-backtest", abbr: "MOM", difficulty: "easy" as const, expertTime: "20 min", description: "Cross-sectional momentum factor backtest with monthly rebalancing and transaction cost modeling." },
    { id: "regime-cta-vol-target", abbr: "RCV", difficulty: "medium" as const, expertTime: "40 min", description: "Detect market regimes and apply volatility targeting to a CTA strategy with dynamic position sizing." },
    { id: "regime-riskparity-cvar", abbr: "RRC", difficulty: "hard" as const, expertTime: "60 min", description: "Regime-conditional risk-parity portfolio construction with CVaR optimization and eigenvalue analysis." },
    { id: "sentiment-factor-alpha", abbr: "SFA", difficulty: "hard" as const, expertTime: "55 min", description: "Build a sentiment-based alpha factor from text data and evaluate its predictive power for returns." },
    { id: "stochvol-implied-surface-new", abbr: "SIS", difficulty: "hard" as const, expertTime: "50 min", description: "Calibrate a stochastic volatility model and generate the full implied volatility surface." },
    { id: "structured-note-risk", abbr: "SNR", difficulty: "hard" as const, expertTime: "55 min", description: "Price and risk-manage a structured note combining equity-linked payoffs with credit risk." },
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
    setRepoTasksLoading(true)
    setRepoTasksError(null)
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
  type Contributor = { login: string; avatarUrl: string; bench: boolean; website: boolean }
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [contributorsLoading, setContributorsLoading] = useState(true)
  const [contributorsError, setContributorsError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setContributorsLoading(true)
    setContributorsError(null)
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
            <span className="text-[#00ff88]">{repoTasksLoading ? '—' : repoTasks.length}</span>
            <span className="text-[#71717a]">Tasks</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">x</span>
            <span className="text-[#71717a]">Models</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">Pass/Fail</span>
            <span className="text-[#71717a]">Scoring</span>
          </div>

          {/* CTA */}
          <a
            href="https://github.com/QF-Bench/QuantitativeFinance-Bench"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#fafafa] text-[#09090b] text-sm font-medium rounded-lg hover:bg-[#d4d4d8] transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
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
                body: 'A non-agentic baseline: one LLM call, one script, one run. If Finance-Zero passes a task, that task is too easy and gets removed. Every task shown here has defeated Finance-Zero.',
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
            Agent performance ranked by pass rate across {tasks.length} calibration tasks
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
                      {entry.pass}&thinsp;/&thinsp;{entry.tasks}
                      {entry.tasks < 14 && (
                        <span className="font-mono text-[10px] text-[#3f3f46] ml-1">tested</span>
                      )}
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
              Pass Rate Comparison
            </p>
            <div className="space-y-3">
              {leaderboard.map((entry, i) => {
                const colors = ['#00ff88', '#52c4ff', '#f97316', '#a855f7']
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
                        {entry.pass}/{entry.tasks}
                        {entry.tasks < 14 && <span className="text-[#3f3f46]"> tested</span>}
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

          {/* Heatmap matrix */}
          <div className="mb-2">
            <p className="font-mono text-[11px] text-[#3f3f46] uppercase tracking-widest mb-5">
              Task Performance Matrix
            </p>
          </div>

          <div className="overflow-x-auto -mx-6 px-6 pb-2">
            <div className="min-w-[640px]">
              {/* Column headers */}
              <div
                className="grid gap-1.5 mb-2"
                style={{ gridTemplateColumns: '148px repeat(14, 1fr) 64px' }}
              >
                <div />
                {tasks.map((task) => (
                  <div key={task.id} className="flex flex-col items-center gap-1.5">
                    <span
                      className="font-mono text-[10px] text-[#52525b] tracking-wider"
                      title={task.id}
                    >
                      {task.abbr}
                    </span>
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: diffConfig[task.difficulty].color, opacity: 0.6 }}
                    />
                  </div>
                ))}
                <div className="flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#52525b] tracking-wider">SCORE</span>
                </div>
              </div>

              {/* Data rows */}
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="grid gap-1.5 mb-1.5"
                  style={{ gridTemplateColumns: '148px repeat(14, 1fr) 64px' }}
                >
                  {/* Model name */}
                  <div className="flex items-center pr-2">
                    <span className="font-mono text-xs text-[#a1a1aa] truncate">
                      {entry.model}
                    </span>
                  </div>

                  {/* Task cells */}
                  {tasks.map((task) => {
                    const result =
                      entry.taskResults[task.id as keyof typeof entry.taskResults]
                    const cellClass =
                      result === true
                        ? 'bg-[#00ff88]/20 border border-[#00ff88]/10 hover:bg-[#00ff88]/30 hover:border-[#00ff88]/25'
                        : result === false
                        ? 'bg-[#18181b] border border-[#27272a]/40 hover:bg-[#1f1f23] hover:border-[#27272a]'
                        : 'bg-[#111113] border border-[#27272a]/20 opacity-40'
                    const cellTitle =
                      result === true ? 'Pass' : result === false ? 'Fail' : 'Not tested'
                    return (
                      <div
                        key={task.id}
                        className={`h-9 rounded-[3px] transition-all duration-200 cursor-default ${cellClass}`}
                        title={`${task.id}: ${cellTitle}`}
                      />
                    )
                  })}

                  {/* Score */}
                  <div className="flex items-center justify-center">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: entry.passRate >= 50 ? '#00ff88' : '#52525b' }}
                    >
                      {entry.passRate}%
                    </span>
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-[#1e1e24]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#00ff88]/20 border border-[#00ff88]/10" />
                  <span className="font-mono text-[10px] text-[#52525b]">Pass</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#18181b] border border-[#27272a]/40" />
                  <span className="font-mono text-[10px] text-[#52525b]">Fail</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#111113] border border-[#27272a]/20 opacity-40" />
                  <span className="font-mono text-[10px] text-[#52525b]">Not tested</span>
                </div>
                <div className="flex-1" />
                {(['very_hard', 'hard', 'medium-hard', 'medium', 'easy'] as const).map((d) => (
                  <div key={d} className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: diffConfig[d].color, opacity: 0.6 }}
                    />
                    <span className="font-mono text-[10px] text-[#3f3f46] capitalize">
                      {diffConfig[d].label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Single-run note */}
          <p className="font-mono text-[11px] text-[#3f3f46] mt-6 pt-5 border-t border-[#1e1e24]">
            Each model was evaluated once. Results are single-run — statistical significance requires ≥5 runs per task. Finance-Zero baseline pending.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Key Findings ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Key Findings</h2>
          <p className="text-base text-[#a1a1aa] mb-10">Insights from the calibration run</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: "Winner",
                tagColor: "#00ff88",
                title: "Opus Leads at 50%",
                body: "claude-opus-4-6 passes 7 of 14 tasks (50%), outperforming claude-sonnet-4-6 at 36% (5/14). Opus shows consistent strength on complex multi-method tasks like kelly-var-sizing and mc-greeks-surface where Sonnet fails.",
              },
              {
                tag: "Common Failure",
                tagColor: "#ef4444",
                title: "Regime Detection is the Bottleneck",
                body: "Both models fail regime-riskparity-cvar, regime-cta-vol-target, and sentiment-factor-alpha. Tasks requiring multi-step numerical pipelines with cascading state (eigenvalue → regime → portfolio) remain unsolved.",
              },
              {
                tag: "Task Insight",
                tagColor: "#f97316",
                title: "Easy Tasks Confirm Calibration",
                body: "Both Opus and Sonnet pass all easy/medium tasks (fama-french, momentum, bollinger). Hard tasks separate the models: Opus uniquely passes kelly-var-sizing and mc-greeks-surface; Sonnet times out on hull-white-swaption.",
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
              <>Tasks merged to main on <a href={tasksDirUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">QFBench</a>. Difficulty from <code className="text-[#71717a]">task.toml</code>.</>
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
                body: 'A single-call non-agentic baseline: one LLM call, one script, one run. If Finance-Zero passes a task, that task is too easy.',
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
          <p className="text-base text-[#a1a1aa] mb-10">Expanding the leaderboard with more models and a baseline</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { model: 'GPT-4o', agent: 'codex-cli', status: 'Planned', statusColor: '#52525b' },
              { model: 'o3', agent: 'codex-cli', status: 'Planned', statusColor: '#52525b' },
              { model: 'Gemini 2.5 Pro', agent: 'gemini-cli', status: 'Planned', statusColor: '#52525b' },
              { model: 'Finance-Zero Baseline', agent: 'gemini-2.0-flash', status: 'In Progress', statusColor: '#f97316' },
              { model: 'Full 90 Tasks', agent: 'all models', status: 'Coming Soon', statusColor: '#3f3f46' },
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

        {/* ─── Contributors ─── */}
        <section id="contributors" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Contributors</h2>
          <p className="text-base text-[#a1a1aa] mb-10">
            Thank you to everyone who has contributed to the benchmark or this website. Sourced from{' '}
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">QFBench</a>
            {' and '}
            <a href={websiteRepoUrl} target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">quantitativefinance-bench-website</a>.
          </p>
          {contributorsLoading && (
            <p className="font-mono text-sm text-[#a1a1aa] mb-8">Loading contributors…</p>
          )}
          {contributorsError && (
            <p className="font-mono text-xs text-[#ef4444] mb-8">{contributorsError}</p>
          )}
          {!contributorsLoading && !contributorsError && (
            <p className="font-mono text-sm text-[#a1a1aa] mb-8">
              {contributors.length} Active Contributors
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {contributors.map((c) => (
              <div
                key={c.login}
                className="rounded-xl px-5 py-5 border border-[#1e1e24] bg-[#111113]/40 hover:border-[#3f3f46] transition-colors duration-200 flex flex-col items-center text-center"
              >
                <a
                  href={`https://github.com/${c.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16 rounded-full overflow-hidden mb-3 border border-[#27272a] hover:border-[#52525b] transition-colors"
                >
                  <img
                    src={c.avatarUrl}
                    alt={c.login}
                    className="w-full h-full object-cover"
                  />
                </a>
                <p className="font-mono text-sm font-medium text-[#a1a1aa] mb-3">{c.login}</p>
                <div className="flex flex-wrap justify-center gap-3 font-mono text-[11px]">
                  <a
                    href={`https://github.com/${c.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00ff88] hover:underline"
                  >
                    Profile
                  </a>
                  {c.bench && (
                    <a
                      href={`${repoUrl}/pulls?q=is%3Apr+author%3A${encodeURIComponent(c.login)}+is%3Amerged`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00ff88] hover:underline"
                    >
                      Bench PRs
                    </a>
                  )}
                  {c.website && (
                    <a
                      href={`${websiteRepoUrl}/pulls?q=is%3Apr+author%3A${encodeURIComponent(c.login)}+is%3Amerged`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00ff88] hover:underline"
                    >
                      Website PRs
                    </a>
                  )}
                </div>
              </div>
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
                body: 'Run any agent on all tasks and submit your results. Help us expand the leaderboard beyond the current models.',
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
                <li>Finance-Zero must not pass: run the single-shot baseline; if it passes, the task is too easy.</li>
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
                <li>Run Finance-Zero baseline; it must fail (otherwise the task is too easy).</li>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[#3f3f46]">
              Showing 10 of 90 tasks. Built on{' '}
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

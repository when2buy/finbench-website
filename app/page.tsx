'use client'
import { useState } from 'react'

export default function Home() {
  const leaderboard = [
    {
      rank: 1,
      model: 'claude-haiku-3-5',
      agent: 'claude-code',
      tasks: 10,
      pass: 6,
      passRate: 60,
      date: '2026-02-20',
      taskResults: {
        'cds-pricing': true,
        'implied-volatility': false,
        'bond-convexity': false,
        'mean-reversion': true,
        'momentum-factor': true,
        'risk-parity': false,
        'credit-risk': true,
        'tail-risk': true,
        'financial-statements': false,
        'data-reconciliation': true,
      },
    },
    {
      rank: 2,
      model: 'claude-sonnet-3-5',
      agent: 'claude-code',
      tasks: 10,
      pass: 3,
      passRate: 30,
      date: '2026-02-21',
      taskResults: {
        'cds-pricing': false,
        'implied-volatility': false,
        'bond-convexity': true,
        'mean-reversion': false,
        'momentum-factor': true,
        'risk-parity': false,
        'credit-risk': true,
        'tail-risk': false,
        'financial-statements': false,
        'data-reconciliation': false,
      },
    },
  ]

  const tasks = [
    {
      id: 'cds-pricing',
      abbr: 'CDS',
      difficulty: 'medium-hard' as const,
      expertTime: '25 min',
      description: 'Calculate par CDS spreads for given tenors using hazard rates, survival probabilities, and recovery rates. Quarterly premium payments.',
    },
    {
      id: 'implied-volatility',
      abbr: 'IV',
      difficulty: 'hard' as const,
      expertTime: '35 min',
      description: 'Extract implied volatility surface from option prices using Newton-Raphson iteration on the Black-Scholes formula.',
    },
    {
      id: 'bond-convexity',
      abbr: 'CONV',
      difficulty: 'medium' as const,
      expertTime: '20 min',
      description: 'Compute bond DV01, duration, and convexity for fixed income hedging.',
    },
    {
      id: 'mean-reversion',
      abbr: 'MR',
      difficulty: 'medium' as const,
      expertTime: '22 min',
      description: 'Estimate Ornstein-Uhlenbeck parameters (θ, μ, σ) via OLS regression. Compute half-life and trading entry thresholds.',
    },
    {
      id: 'momentum-factor',
      abbr: 'MOM',
      difficulty: 'medium-hard' as const,
      expertTime: '30 min',
      description: 'Construct cross-sectional momentum factors from historical return data.',
    },
    {
      id: 'risk-parity',
      abbr: 'RP',
      difficulty: 'medium' as const,
      expertTime: '25 min',
      description: 'Optimize portfolio weights using risk parity methodology from the covariance matrix.',
    },
    {
      id: 'credit-risk',
      abbr: 'CR',
      difficulty: 'hard' as const,
      expertTime: '35 min',
      description: 'Model credit risk transitions and multi-period default probabilities.',
    },
    {
      id: 'tail-risk',
      abbr: 'TAIL',
      difficulty: 'hard' as const,
      expertTime: '40 min',
      description: 'Estimate tail risk measures (VaR/ES) using extreme value theory (EVT).',
    },
    {
      id: 'financial-statements',
      abbr: 'FS',
      difficulty: 'medium' as const,
      expertTime: '25 min',
      description: 'Parse and analyze structured financial statement data across multiple formats.',
    },
    {
      id: 'data-reconciliation',
      abbr: 'DR',
      difficulty: 'medium' as const,
      expertTime: '25 min',
      description: 'Identify and resolve discrepancies across multi-source financial datasets.',
    },
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  const diffConfig: Record<string, { color: string; label: string }> = {
    easy: { color: '#22c55e', label: 'easy' },
    medium: { color: '#eab308', label: 'medium' },
    'medium-hard': { color: '#f97316', label: 'medium-hard' },
    hard: { color: '#ef4444', label: 'hard' },
  }

  return (
    <>
      {/* Smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* Background dot grid */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none" aria-hidden="true" />

      <main className="relative">
        {/* ─── Navbar ─── */}
        <nav className="sticky top-0 z-50 w-full bg-[#09090b]/90 backdrop-blur border-b border-[#1e1e24]">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="font-bold text-sm tracking-tight">
              <span className="text-white">Finance</span>
              <span className="text-[#00ff88]">Bench</span>
            </a>

            {/* Desktop nav links + GitHub */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-5 font-mono text-xs text-[#52525b]">
                <a href="#leaderboard" className="hover:text-[#a1a1aa] transition-colors duration-200">Leaderboard</a>
                <a href="#tasks" className="hover:text-[#a1a1aa] transition-colors duration-200">Tasks</a>
                <a href="#run" className="hover:text-[#a1a1aa] transition-colors duration-200">Run</a>
                <a href="#next" className="hover:text-[#a1a1aa] transition-colors duration-200">What&apos;s Next</a>
              </div>
              <a
                href="https://github.com/Dongzhikang/finance-bench"
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
            <div className="sm:hidden border-t border-[#1e1e24] bg-[#09090b]/95 px-6 py-4 flex flex-col gap-4 font-mono text-xs text-[#52525b]">
              <a href="#leaderboard" onClick={() => setMenuOpen(false)} className="hover:text-[#a1a1aa] transition-colors duration-200">Leaderboard</a>
              <a href="#tasks" onClick={() => setMenuOpen(false)} className="hover:text-[#a1a1aa] transition-colors duration-200">Tasks</a>
              <a href="#run" onClick={() => setMenuOpen(false)} className="hover:text-[#a1a1aa] transition-colors duration-200">Run</a>
              <a href="#next" onClick={() => setMenuOpen(false)} className="hover:text-[#a1a1aa] transition-colors duration-200">What&apos;s Next</a>
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
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Finance
            <span className="text-[#00ff88] glow-green">Bench</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-xl mb-10 leading-relaxed">
            The definitive benchmark for AI agents in quantitative finance.
            Hard problems. Real code. Verifiable outputs.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-sm mb-10">
            <span className="text-[#00ff88]">90</span>
            <span className="text-[#52525b]">Tasks</span>
            <span className="text-[#3f3f46] font-mono text-xs">(10 shown)</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">2</span>
            <span className="text-[#52525b]">Models</span>
            <span className="text-[#27272a] mx-2">/</span>
            <span className="text-[#00ff88]">Pass/Fail</span>
            <span className="text-[#52525b]">Scoring</span>
          </div>

          {/* CTA */}
          <a
            href="https://github.com/Dongzhikang/finance-bench"
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

        {/* ─── What Makes Finance-Bench Different ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">What Makes Finance-Bench Different</h2>
          <p className="text-sm text-[#52525b] mb-10">Not another QA benchmark — agents must think like quants</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                tag: 'General Coding',
                tagColor: '#71717a',
                title: 'vs HumanEval / MBPP',
                body: 'HumanEval tests algorithm logic with unit tests. Finance-Bench requires domain knowledge: Black-Scholes, hazard rates, OU processes. The math must be right, not just the code structure.',
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
                body: 'Terminal-Bench evaluates CLI proficiency. Finance-Bench evaluates whether agents can implement numerical methods correctly inside a Docker sandbox with Python financial libraries.',
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
                <p className="text-xs text-[#52525b] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Leaderboard ─── */}
        <section id="leaderboard" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Leaderboard</h2>
          <p className="text-sm text-[#52525b] mb-10">
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
                style={{ gridTemplateColumns: '148px repeat(10, 1fr) 64px' }}
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
                  style={{ gridTemplateColumns: '148px repeat(10, 1fr) 64px' }}
                >
                  {/* Model name */}
                  <div className="flex items-center pr-2">
                    <span className="font-mono text-xs text-[#a1a1aa] truncate">
                      {entry.model}
                    </span>
                  </div>

                  {/* Task cells */}
                  {tasks.map((task) => {
                    const passed =
                      entry.taskResults[task.id as keyof typeof entry.taskResults]
                    return (
                      <div
                        key={task.id}
                        className={`h-9 rounded-[3px] transition-all duration-200 cursor-default ${
                          passed
                            ? 'bg-[#00ff88]/20 border border-[#00ff88]/10 hover:bg-[#00ff88]/30 hover:border-[#00ff88]/25'
                            : 'bg-[#18181b] border border-[#27272a]/40 hover:bg-[#1f1f23] hover:border-[#27272a]'
                        }`}
                        title={`${task.id}: ${passed ? 'Pass' : 'Fail'}`}
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
                <div className="flex-1" />
                {(['hard', 'medium-hard', 'medium', 'easy'] as const).map((d) => (
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
          <p className="text-sm text-[#52525b] mb-10">Insights from the calibration run</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tag: 'Unexpected',
                tagColor: '#f97316',
                title: 'Haiku Outperforms Sonnet',
                body: 'claude-haiku-3-5 scored 60% vs claude-sonnet-3-5 at 30% — a counterintuitive result. Hypothesis: larger models over-engineer solutions, while quantitative tasks reward direct, precise numerical implementation.',
              },
              {
                tag: 'Common Failure',
                tagColor: '#ef4444',
                title: 'Numerical Methods Are the Bottleneck',
                body: 'implied-volatility (Newton-Raphson convergence) and risk-parity (covariance optimization) failed for both models. financial-statements also failed both — structured data parsing remains a shared weakness.',
              },
              {
                tag: 'Coming Soon',
                tagColor: '#52525b',
                title: 'Finance-Zero Baseline Pending',
                body: 'No single-call baseline data yet. Finance-Zero makes one LLM call, runs one script, no iteration. If it passes a task, that task is disqualified as too easy. Planned: Gemini 2.0 Flash as baseline model.',
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
                <p className="text-xs text-[#52525b] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Task Catalog ─── */}
        <section id="tasks" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Task Catalog</h2>
          <p className="text-sm text-[#52525b] mb-10">
            Showing {tasks.length} calibration tasks from 90 total. Four difficulty tiers based on expert time estimates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tasks.map((task) => {
              const diff = diffConfig[task.difficulty]
              return (
                <div
                  key={task.id}
                  className="rounded-xl px-5 py-4 border border-[#1e1e24] bg-[#111113]/60 hover:border-[#3f3f46] transition-colors duration-200 cursor-default"
                >
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-mono text-sm font-medium">{task.id}</span>
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                      style={{
                        color: diff.color,
                        backgroundColor: `${diff.color}10`,
                        borderColor: `${diff.color}25`,
                      }}
                    >
                      {task.difficulty}
                    </span>
                    <span className="font-mono text-[10px] text-[#3f3f46]">
                      ~{task.expertTime}
                    </span>
                  </div>
                  <p className="text-xs text-[#52525b] leading-relaxed">{task.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── Run It Yourself ─── */}
        <section id="run" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">Run It Yourself</h2>
          <p className="text-sm text-[#52525b] mb-10">
            Evaluate any agent on Finance-Bench using the Harbor framework
          </p>

          <div className="space-y-6">
            {[
              {
                label: '# 1. Install & build sandbox',
                code: `pip install harbor

# Build sandbox base image (one-time, ~5 minutes)
docker build -t finance-bench-sandbox:latest \
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
                  <span className="font-mono text-[11px] text-[#52525b]">{block.label}</span>
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
            <span className="text-[#52525b]">jobs/&lt;timestamp&gt;/result.json</span>
            . Each run creates agent trajectories, test output, and token usage logs.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── How It Works ─── */}
        <section className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">How It Works</h2>
          <p className="text-sm text-[#52525b] mb-10">
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
                <p className="text-xs text-[#52525b] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px divider-subtle" aria-hidden="true" />

        {/* ─── What's Next ─── */}
        <section id="next" className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-semibold mb-1 tracking-tight">What&apos;s Next</h2>
          <p className="text-sm text-[#52525b] mb-10">Expanding the leaderboard with more models and a baseline</p>

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
                <p className="font-mono text-xs text-[#52525b]">{item.agent}</p>
              </div>
            ))}
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
                className="text-[#52525b] hover:text-[#a1a1aa] transition-colors duration-200 cursor-pointer"
              >
                Harbor
              </a>{' '}
              evaluation framework.
            </p>
            <div className="flex gap-6 font-mono text-xs">
              <a
                href="https://github.com/Dongzhikang/finance-bench"
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

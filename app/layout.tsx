import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Finance-Bench | AI Agent Benchmark for Quantitative Finance',
  description:
    'The definitive benchmark for evaluating AI agents on real-world quantitative finance tasks. Hard problems. Verifiable outputs.',
  openGraph: {
    title: 'Finance-Bench',
    description:
      'AI agent benchmark for quantitative finance. 10 tasks, verifiable outputs.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased">
        {children}
      </body>
    </html>
  )
}

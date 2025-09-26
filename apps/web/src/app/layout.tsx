import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barowa Hub - Deine digitale Grundausstattung',
  description: 'Digitale Identität, Domains und Server - alles aus einer Hand. Privacy-first und dezentral.',
  keywords: ['digital identity', 'privacy', 'domains', 'hosting', 'decentralized'],
  authors: [{ name: 'Barowa Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gradient-to-br from-barowa-50 to-white">
        {children}
      </body>
    </html>
  )
}

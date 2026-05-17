import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/src/components/layout/Navbar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '3GEN — Luxury Niche Perfumery',
  description: 'Ultra-premium artisanal fragrances for those who require no introduction.',
  openGraph: {
    title: '3GEN Perfumery',
    description: 'Crafted for the few. Remembered by all.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        cormorant.variable,
        dmSans.variable,
        'antialiased'
      )}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-[#F0EAE0]">
        <Navbar />
        {children}
      </body>
    </html>
  )
}

import type { ReactNode } from 'react'

import { Providers } from './providers'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Nucleify',
  description: 'Modular full-stack framework for Nuxt and Next.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="nuc-next">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

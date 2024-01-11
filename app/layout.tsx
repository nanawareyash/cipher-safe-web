import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CipherSafe',
  description: 'Your Shield in the Digital Realm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

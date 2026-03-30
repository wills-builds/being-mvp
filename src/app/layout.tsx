import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Being | The Living Library of Human Experience',
  description: 'AI-powered audio platform where people share real life stories and get matched with others who have felt the same thing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen bg-bg">
        <main className="max-w-md mx-auto px-4 pb-24">
          {children}
        </main>
      </body>
    </html>
  )
}

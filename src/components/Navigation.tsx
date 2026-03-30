'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/explore', label: 'Explore', icon: '🔍' },
  { href: '/record', label: 'Record', icon: '🎤' },
  { href: '/journal', label: 'Journal', icon: '📓' },
  { href: '/profile', label: 'Profile', icon: '👤' },
]

export default function Navigation() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg border-t border-border">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {NAV.map(n => (
          <Link
            key={n.href}
            href={n.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              pathname === n.href ? 'text-orange' : 'text-muted'
            }`}
          >
            <span className="text-xl">{n.icon}</span>
            <span className="text-[10px]">{n.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

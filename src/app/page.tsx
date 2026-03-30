import Logo from '@/components/Logo'
import DailyPrompt from '@/components/DailyPrompt'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <h1 className="font-serif text-xl text-cream">Being</h1>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5">
          <span className="text-orange">🔥</span>
          <span className="text-cream text-sm font-medium">0</span>
        </div>
      </div>

      <DailyPrompt />

      <div className="mt-8">
        <h2 className="text-sm text-muted font-medium uppercase tracking-wider mb-3">
          Your Matched Story
        </h2>
        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-muted text-sm italic">
            Record your first story to start receiving matches from people who have felt the same thing.
          </p>
          <Link href="/record" className="inline-block mt-3 text-orange text-sm font-medium">
            Record your first story →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm text-muted font-medium uppercase tracking-wider mb-3">
          Story Circles
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: '🌱', name: 'Starting Over', theme: 'starting_over' },
            { emoji: '😂', name: 'The Funny Ones', theme: 'humor' },
            { emoji: '👶', name: 'New Parents', theme: 'new_parent' },
            { emoji: '🏠', name: 'Heritage', theme: 'heritage' },
            { emoji: '💪', name: 'Resilience', theme: 'resilience' },
            { emoji: '🌟', name: 'Milestones', theme: 'celebrating' },
          ].map(c => (
            <Link key={c.theme} href={`/explore?theme=${c.theme}`}>
              <div className="bg-card border border-border rounded-lg p-4 hover:border-orange/50 transition-all">
                <span className="text-2xl">{c.emoji}</span>
                <p className="text-cream text-sm mt-2">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Navigation />
    </div>
  )
}

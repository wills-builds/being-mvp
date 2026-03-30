import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'
import Link from 'next/link'

const CIRCLES = [
  { emoji: '🌱', name: 'Starting Over', theme: 'starting_over', desc: 'Stories of rebuilding and beginning again' },
  { emoji: '😂', name: 'The Funny Ones', theme: 'humor', desc: 'Laughter, absurdity, and the lighter side' },
  { emoji: '👶', name: 'New Parents', theme: 'new_parent', desc: 'The chaos, joy, and sleepless nights' },
  { emoji: '🏠', name: 'Heritage', theme: 'heritage', desc: 'Family stories passed down through generations' },
  { emoji: '💪', name: 'Resilience', theme: 'resilience', desc: 'What got me through the hardest times' },
  { emoji: '🌟', name: 'Milestones', theme: 'celebrating', desc: 'Proud moments and turning points' },
  { emoji: '💔', name: 'Loss and Grief', theme: 'grieving', desc: 'Processing loss, finding a path forward' },
  { emoji: '🌈', name: 'Identity', theme: 'coming_out', desc: 'Being yourself, finding belonging' },
  { emoji: '🚀', name: 'Career Change', theme: 'career_change', desc: 'Pivots, leaps of faith, and new chapters' },
  { emoji: '🌍', name: 'Starting Fresh', theme: 'immigrant', desc: 'New countries, new cultures, new beginnings' },
]

export default function ExplorePage() {
  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <Logo size={32} />
        <h1 className="font-serif text-xl text-cream">Explore</h1>
      </div>

      <p className="text-muted text-sm mb-6">
        Browse stories by life moment. Joy, grief, humor, heritage, and everything in between.
      </p>

      <div className="space-y-3">
        {CIRCLES.map(c => (
          <Link key={c.theme} href={`/explore?theme=${c.theme}`}>
            <div className="bg-card border border-border rounded-lg p-4 hover:border-orange/50 transition-all flex items-start gap-4">
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <h3 className="text-cream font-medium">{c.name}</h3>
                <p className="text-muted text-sm">{c.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Navigation />
    </div>
  )
}

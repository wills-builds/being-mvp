export default function StreakCounter({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
      <span className="text-orange text-lg">🔥</span>
      <span className="text-cream font-medium text-sm">{streak}</span>
      <span className="text-muted text-xs">day{streak !== 1 ? 's' : ''}</span>
    </div>
  )
}

const COLORS: Record<string, string> = {
  grief: 'bg-plum/30 text-plum border-plum/50',
  joy: 'bg-orange/30 text-orange border-orange/50',
  fear: 'bg-muted/30 text-muted border-muted/50',
  hope: 'bg-blue/30 text-blue border-blue/50',
  guilt: 'bg-plum/30 text-plum border-plum/50',
  love: 'bg-orange/30 text-orange border-orange/50',
  resilience: 'bg-blue/30 text-blue border-blue/50',
  gratitude: 'bg-orange/30 text-orange border-orange/50',
  anger: 'bg-orange/30 text-orange border-orange/50',
  relief: 'bg-blue/30 text-blue border-blue/50',
  isolation: 'bg-muted/30 text-muted border-muted/50',
  shame: 'bg-plum/30 text-plum border-plum/50',
}

export default function EmotionBadge({ emotion, intensity }: { emotion: string; intensity: number }) {
  const color = COLORS[emotion] || 'bg-border text-muted border-border'
  if (intensity < 0.3) return null
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${color}`}>
      {emotion} {Math.round(intensity * 100)}%
    </span>
  )
}

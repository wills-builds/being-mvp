import Link from 'next/link'
import EmotionBadge from './EmotionBadge'

interface Story {
  id: string
  title?: string
  transcript?: string
  emotions?: Record<string, number>
  life_stage?: string
  duration_seconds?: number
  privacy_level: string
  listen_count?: number
}

export default function StoryCard({ story }: { story: Story }) {
  const topEmotions = story.emotions
    ? Object.entries(story.emotions)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
    : []

  const preview = story.title || (story.transcript ? story.transcript.slice(0, 100) + '...' : 'Untitled story')

  return (
    <Link href={`/story/${story.id}`}>
      <div className="bg-card rounded-lg p-4 border border-border hover:border-muted transition-all">
        <div className="flex items-start justify-between">
          <p className="text-cream text-sm font-medium line-clamp-2 flex-1">{preview}</p>
          {story.privacy_level === 'anonymous' && (
            <span className="text-xs text-muted ml-2">👤</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {topEmotions.map(([emotion, intensity]) => (
            <EmotionBadge key={emotion} emotion={emotion} intensity={intensity} />
          ))}
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted">
          {story.life_stage && (
            <span className="bg-border/50 px-2 py-0.5 rounded">{story.life_stage.replace(/_/g, ' ')}</span>
          )}
          {story.duration_seconds && (
            <span>{Math.floor(story.duration_seconds / 60)}:{(story.duration_seconds % 60).toString().padStart(2, '0')}</span>
          )}
          {story.listen_count !== undefined && (
            <span>{story.listen_count} listens</span>
          )}
        </div>
      </div>
    </Link>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import EmotionBadge from '@/components/EmotionBadge'
import Logo from '@/components/Logo'
import StoryCard from '@/components/StoryCard'
import { supabase } from '@/lib/supabase'

export default function StoryPage() {
  const { id } = useParams()
  const [story, setStory] = useState<any>(null)
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('stories').select('*').eq('id', id).single()
      setStory(data)

      const matchRes = await fetch(`/api/match?story_id=${id}`)
      const matchData = await matchRes.json()
      setMatches(matchData.matches || [])

      setLoading(false)
    }
    if (id) load()
  }, [id])

  if (loading) return (
    <div className="py-16 flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-orange border-t-transparent rounded-full animate-spin" />
      <p className="text-muted">Loading story...</p>
    </div>
  )

  if (!story) return <p className="text-muted py-16 text-center">Story not found</p>

  const topEmotions = story.emotions
    ? Object.entries(story.emotions).filter(([,v]: [string, any]) => v > 0.3).sort(([,a]: [string, any], [,b]: [string, any]) => b - a)
    : []

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <Logo size={32} />
        <h1 className="font-serif text-xl text-cream">Story</h1>
      </div>

      {story.audio_url && (
        <audio src={story.audio_url} controls className="w-full mb-6" />
      )}

      {story.transcript && (
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <p className="text-cream text-sm leading-relaxed">{story.transcript}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {topEmotions.map(([emotion, intensity]: [string, any]) => (
          <EmotionBadge key={emotion} emotion={emotion} intensity={intensity} />
        ))}
      </div>

      <div className="flex gap-2 mb-8">
        {story.life_stage && (
          <span className="text-xs bg-border/50 text-muted px-2 py-1 rounded">{story.life_stage.replace(/_/g, ' ')}</span>
        )}
        {story.story_type && (
          <span className="text-xs bg-border/50 text-muted px-2 py-1 rounded">
            {story.story_type === 'wisdom' ? 'Learned from it' : 'Going through it'}
          </span>
        )}
      </div>

      {matches.length > 0 && (
        <div>
          <h2 className="text-sm text-muted font-medium uppercase tracking-wider mb-3">
            People who felt this too
          </h2>
          <div className="space-y-3">
            {matches.map((m: any) => (
              <StoryCard key={m.id} story={m} />
            ))}
          </div>
        </div>
      )}

      <Navigation />
    </div>
  )
}

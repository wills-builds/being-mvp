'use client'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'
import StoryCard from '@/components/StoryCard'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const [stories, setStories] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false })

      setStories(data || [])
    }
    load()
  }, [])

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <Logo size={32} />
        <h1 className="font-serif text-xl text-cream">My Story</h1>
      </div>

      <div className="bg-card border border-border rounded-lg p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-border flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h2 className="text-cream font-medium">Anonymous</h2>
            <p className="text-muted text-sm">{stories.length} stories recorded</p>
          </div>
        </div>
      </div>

      <h2 className="text-sm text-muted font-medium uppercase tracking-wider mb-3">
        Your Timeline
      </h2>

      {stories.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-5 text-center">
          <p className="text-muted text-sm">No stories yet. Your journey starts with one recording.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {stories.map(s => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      )}

      <Navigation />
    </div>
  )
}

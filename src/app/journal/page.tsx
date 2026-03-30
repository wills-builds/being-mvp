'use client'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'
import StoryCard from '@/components/StoryCard'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function JournalPage() {
  const [stories, setStories] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .eq('privacy_level', 'private')
        .order('created_at', { ascending: false })

      setStories(data || [])
    }
    load()
  }, [])

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-2">
        <Logo size={32} />
        <h1 className="font-serif text-xl text-cream">Private Journal</h1>
      </div>
      <p className="text-muted text-sm mb-6">
        Your encrypted personal stories. Only you can see these.
      </p>

      {stories.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-3xl mb-3">🔒</p>
          <p className="text-cream font-medium">Your journal is empty</p>
          <p className="text-muted text-sm mt-2">
            Record a private story to start building your personal audio autobiography.
          </p>
          <Link href="/record" className="inline-block mt-4 px-6 py-2 bg-orange text-bg rounded-lg font-medium">
            Record a Story
          </Link>
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

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const storyId = req.nextUrl.searchParams.get('story_id')
    if (!storyId) return NextResponse.json({ error: 'story_id required' }, { status: 400 })

    const supabase = getServiceClient()

    // Get the source story's embedding
    const { data: story } = await supabase
      .from('stories')
      .select('embedding, user_id')
      .eq('id', storyId)
      .single()

    if (!story?.embedding) {
      return NextResponse.json({ matches: [] })
    }

    // Find similar stories using pgvector
    const { data: matches, error } = await supabase.rpc('match_stories', {
      query_embedding: story.embedding,
      match_threshold: 0.5,
      match_count: 5,
      exclude_user: story.user_id,
    })

    if (error) {
      console.error('Match error:', error)
      // Fallback: return recent public stories
      const { data: fallback } = await supabase
        .from('stories')
        .select('*')
        .neq('user_id', story.user_id)
        .neq('privacy_level', 'private')
        .eq('is_flagged', false)
        .order('created_at', { ascending: false })
        .limit(5)

      return NextResponse.json({ matches: fallback || [] })
    }

    return NextResponse.json({ matches: matches || [] })
  } catch (err: any) {
    console.error('Match error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

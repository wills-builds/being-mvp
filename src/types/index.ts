export interface Story {
  id: string
  user_id: string
  title?: string
  audio_url: string
  transcript?: string
  duration_seconds?: number
  privacy_level: 'private' | 'anonymous' | 'pseudonymous' | 'public'
  emotions?: Record<string, number>
  intensity?: number
  life_stage?: string
  themes?: string[]
  story_type?: 'going_through_it' | 'wisdom'
  is_moderated?: boolean
  is_flagged?: boolean
  listen_count?: number
  created_at: string
}

export interface AnalysisResult {
  emotions: Record<string, number>
  intensity: number
  life_stage: string
  themes: string[]
  story_type: string
  summary: string
  is_safe: boolean
  safety_note?: string
}

export interface Match {
  story: Story
  similarity: number
}

export interface StoryCircle {
  id: string
  name: string
  description?: string
  theme: string
  emoji?: string
}

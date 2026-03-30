import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getServiceClient } from '@/lib/supabase'
import { ANALYSIS_PROMPT } from '@/lib/emotions'

const openai = new OpenAI({ apiKey: "placeholder" })

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    const privacyLevel = formData.get('privacy_level') as string || 'private'
    const duration = parseInt(formData.get('duration') as string || '0')

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // 1. Upload audio to Supabase Storage
    const fileName = `stories/${Date.now()}_${Math.random().toString(36).slice(2)}.webm`
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(fileName, audioBuffer, { contentType: 'audio/webm' })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload audio' }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage.from('audio').getPublicUrl(fileName)

    // 2. Transcribe with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioBuffer], 'story.webm', { type: 'audio/webm' }),
      model: 'whisper-1',
    })

    const transcript = transcription.text

    // 3. Analyze emotions with Claude (via OpenAI-compatible endpoint or direct fetch)
    const analysisRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': "placeholder"!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: ANALYSIS_PROMPT + transcript
        }]
      })
    })

    const analysisData = await analysisRes.json()
    const analysisText = analysisData.content?.[0]?.text || '{}'

    let analysis
    try {
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : analysisText)
    } catch {
      console.error('Failed to parse analysis:', analysisText)
      analysis = { emotions: {}, intensity: 0.5, life_stage: 'other', themes: [], story_type: 'going_through_it', summary: 'Story recorded', is_safe: true }
    }

    // 4. Check safety
    if (!analysis.is_safe) {
      return NextResponse.json({
        error: 'This story has been flagged for review. If you are in crisis, please contact 988 Suicide and Crisis Lifeline.',
        safety_note: analysis.safety_note
      }, { status: 400 })
    }

    // 5. Generate embedding for matching
    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: `${analysis.summary}. Emotions: ${Object.entries(analysis.emotions || {}).filter(([,v]: [string, any]) => v > 0.3).map(([k]) => k).join(', ')}. Life stage: ${analysis.life_stage}. Themes: ${(analysis.themes || []).join(', ')}`,
    })

    const embedding = embeddingRes.data[0].embedding

    // 6. Store story in database
    const { data: story, error: insertError } = await supabase
      .from('stories')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000000', // TODO: replace with auth user
        audio_url: publicUrl,
        transcript,
        duration_seconds: duration,
        privacy_level: privacyLevel,
        emotions: analysis.emotions,
        intensity: analysis.intensity,
        life_stage: analysis.life_stage,
        themes: analysis.themes,
        story_type: analysis.story_type,
        embedding: JSON.stringify(embedding),
        is_moderated: true,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save story' }, { status: 500 })
    }

    return NextResponse.json({
      story_id: story.id,
      transcript,
      ...analysis,
    })
  } catch (err: any) {
    console.error('Analysis error:', err)
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}

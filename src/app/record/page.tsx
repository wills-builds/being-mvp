'use client'
import { useState } from 'react'
import AudioRecorder from '@/components/AudioRecorder'
import PrivacySelector from '@/components/PrivacySelector'
import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'

export default function RecordPage() {
  const [privacy, setPrivacy] = useState('private')
  const [step, setStep] = useState<'privacy' | 'record' | 'analyzing' | 'done'>('privacy')
  const [analysis, setAnalysis] = useState<any>(null)

  const handleRecorded = async (blob: Blob, duration: number) => {
    setStep('analyzing')
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'story.webm')
      formData.append('privacy_level', privacy)
      formData.append('duration', duration.toString())

      const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      const data = await res.json()

      if (data.error) {
        alert(data.error)
        setStep('record')
        return
      }

      setAnalysis(data)
      setStep('done')
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Try again.')
      setStep('record')
    }
  }

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <Logo size={32} />
        <h1 className="font-serif text-xl text-cream">Record a Story</h1>
      </div>

      {step === 'privacy' && (
        <div>
          <h2 className="text-cream font-medium mb-4">Who can hear this story?</h2>
          <PrivacySelector value={privacy} onChange={setPrivacy} />
          <button
            onClick={() => setStep('record')}
            className="w-full mt-6 py-3 rounded-lg bg-orange text-bg font-medium hover:bg-orange/80"
          >
            Start Recording
          </button>
        </div>
      )}

      {step === 'record' && (
        <div>
          <div className="text-xs text-muted mb-6 text-center">
            Privacy: {privacy} • <button onClick={() => setStep('privacy')} className="text-orange">change</button>
          </div>
          <AudioRecorder onRecorded={handleRecorded} />
        </div>
      )}

      {step === 'analyzing' && (
        <div className="flex flex-col items-center gap-4 py-16">
          <div className="w-12 h-12 border-2 border-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-cream">Analyzing your story...</p>
          <p className="text-muted text-sm">Transcribing, understanding emotions, finding matches</p>
        </div>
      )}

      {step === 'done' && analysis && (
        <div className="space-y-6">
          <div className="bg-card border border-orange/30 rounded-lg p-5">
            <h3 className="text-orange font-medium mb-2">Story Analyzed</h3>
            <p className="text-cream text-sm">{analysis.summary}</p>
          </div>

          <div>
            <h3 className="text-muted text-xs uppercase tracking-wider mb-2">Emotions Detected</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.emotions && Object.entries(analysis.emotions)
                .filter(([, v]: [string, any]) => v > 0.3)
                .sort(([,a]: [string, any], [,b]: [string, any]) => b - a)
                .map(([k, v]: [string, any]) => (
                  <span key={k} className="text-xs px-2 py-1 rounded-full bg-card border border-border text-cream">
                    {k} {Math.round(v * 100)}%
                  </span>
                ))
              }
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setStep('privacy'); setAnalysis(null) }}
              className="flex-1 py-3 rounded-lg border border-border text-muted"
            >
              Record Another
            </button>
            <a
              href={`/story/${analysis.story_id}`}
              className="flex-1 py-3 rounded-lg bg-orange text-bg font-medium text-center"
            >
              View Story
            </a>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  )
}

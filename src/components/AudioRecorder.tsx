'use client'
import { useState, useRef, useEffect } from 'react'

export default function AudioRecorder({ onRecorded }: { onRecorded: (blob: Blob, duration: number) => void }) {
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const MAX_SECONDS = 300

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mr = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
    chunksRef.current = []
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
      stream.getTracks().forEach(t => t.stop())
    }
    mr.start(1000)
    mediaRef.current = mr
    setRecording(true)
    setSeconds(0)
    setAudioUrl(null)
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s >= MAX_SECONDS - 1) { stopRecording(); return s }
        return s + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRef.current && mediaRef.current.state !== 'inactive') {
      mediaRef.current.stop()
    }
    setRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleSubmit = () => {
    if (chunksRef.current.length > 0) {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      onRecorded(blob, seconds)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-5xl font-serif text-cream">
        {formatTime(seconds)}
      </div>
      <div className="text-xs text-muted">
        {recording ? 'Recording...' : seconds > 0 ? 'Recording complete' : 'Tap to start recording'}
      </div>

      {!audioUrl ? (
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            recording
              ? 'bg-red-500 animate-pulse-record'
              : 'bg-orange hover:bg-orange/80'
          }`}
        >
          {recording ? (
            <div className="w-6 h-6 bg-white rounded-sm" />
          ) : (
            <div className="w-0 h-0 border-l-[14px] border-l-bg border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
          )}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <audio src={audioUrl} controls className="w-full" />
          <div className="flex gap-3 w-full">
            <button
              onClick={() => { setAudioUrl(null); setSeconds(0) }}
              className="flex-1 py-3 rounded-lg border border-border text-muted hover:text-cream"
            >
              Re-record
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-lg bg-orange text-bg font-medium hover:bg-orange/80"
            >
              Submit Story
            </button>
          </div>
        </div>
      )}

      <div className="w-full bg-border rounded-full h-1">
        <div
          className="bg-orange h-1 rounded-full transition-all"
          style={{ width: `${(seconds / MAX_SECONDS) * 100}%` }}
        />
      </div>
      <div className="text-xs text-muted">Max 5 minutes</div>
    </div>
  )
}

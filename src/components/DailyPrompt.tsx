'use client'
import Link from 'next/link'

const PROMPTS = [
  "What's on your mind right now?",
  "What moment from today do you want to remember?",
  "What would you tell someone going through what you went through?",
  "What are you grateful for today?",
  "What is something you have never told anyone?",
  "What moment changed the way you see the world?",
  "What do you wish someone had told you sooner?",
  "What made you laugh recently?",
  "What does belonging mean to you?",
  "Tell a story your family always tells.",
]

export default function DailyPrompt() {
  const today = new Date().getDay()
  const prompt = PROMPTS[today % PROMPTS.length]

  return (
    <Link href="/record">
      <div className="bg-card border border-border rounded-lg p-5 hover:border-orange/50 transition-all">
        <div className="text-xs text-orange font-medium uppercase tracking-wider mb-2">
          Today's Prompt
        </div>
        <p className="text-cream font-serif text-lg">"{prompt}"</p>
        <div className="text-xs text-muted mt-3">Tap to record your story</div>
      </div>
    </Link>
  )
}

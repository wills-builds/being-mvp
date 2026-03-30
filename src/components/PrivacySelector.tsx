'use client'
import { useState } from 'react'

const TIERS = [
  { value: 'private', label: 'Private Journal', desc: 'Encrypted, only you', icon: '🔒' },
  { value: 'anonymous', label: 'Anonymous', desc: 'No identity attached', icon: '👤' },
  { value: 'pseudonymous', label: 'Pseudonymous', desc: 'Use a persona', icon: '🎭' },
  { value: 'public', label: 'Real Name', desc: 'Full identity', icon: '🌟' },
]

export default function PrivacySelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TIERS.map(t => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`p-3 rounded-lg border text-left transition-all ${
            value === t.value
              ? 'border-orange bg-orange/10'
              : 'border-border bg-card hover:border-muted'
          }`}
        >
          <div className="text-lg">{t.icon}</div>
          <div className="text-sm font-medium text-cream mt-1">{t.label}</div>
          <div className="text-xs text-muted">{t.desc}</div>
        </button>
      ))}
    </div>
  )
}

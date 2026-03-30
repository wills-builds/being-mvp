export const ANALYSIS_PROMPT = `You are an emotional analysis engine for Being, an audio storytelling platform.

Analyze this transcript of a personal story. Return ONLY a JSON object with:

{
  "emotions": {
    "grief": 0.0, "joy": 0.0, "fear": 0.0, "hope": 0.0,
    "guilt": 0.0, "anger": 0.0, "love": 0.0, "resilience": 0.0,
    "gratitude": 0.0, "shame": 0.0, "relief": 0.0, "isolation": 0.0
  },
  "intensity": 0.0,
  "life_stage": "",
  "themes": [],
  "story_type": "",
  "summary": "",
  "is_safe": true,
  "safety_note": ""
}

Emotions: 0.0 to 1.0 intensity each. Include ALL that apply.
Intensity: overall emotional intensity 0.0 to 1.0.
Life stage: one of "new_parent", "grieving", "coming_out", "career_change", "immigrant", "student", "divorce", "eldercare", "veteran", "recovery", "celebrating", "reflecting", "preserving_heritage", "other".
Themes: array from "loss", "resilience", "starting_over", "identity", "family", "belonging", "achievement", "humor", "heritage", "finding_community".
Story type: "going_through_it" (present tense) or "wisdom" (past tense, learned from it).
Summary: one sentence capturing the emotional core.
is_safe: false if self-harm, abuse, or exploitation content.

Be nuanced. A story can be about guilt AND relief AND love simultaneously.

TRANSCRIPT:
`

export const LIFE_STAGES = [
  'new_parent', 'grieving', 'coming_out', 'career_change',
  'immigrant', 'student', 'divorce', 'eldercare', 'veteran',
  'recovery', 'celebrating', 'reflecting', 'preserving_heritage', 'other'
]

export const THEMES = [
  'loss', 'resilience', 'starting_over', 'identity', 'family',
  'belonging', 'achievement', 'humor', 'heritage', 'finding_community'
]

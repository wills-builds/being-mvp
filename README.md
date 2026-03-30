# Being MVP

The Living Library of Human Experience. AI-powered audio storytelling platform.

## Setup

1. Clone this repo
2. Run \`npm install\`
3. Create a Supabase project at supabase.com
4. Enable the pgvector extension in Supabase SQL editor
5. Run \`supabase/schema.sql\` in the SQL editor
6. Run \`supabase/match_stories.sql\` in the SQL editor
7. Create a storage bucket called \`audio\` in Supabase (set to public)
8. Copy \`.env.local.example\` to \`.env.local\` and fill in your keys
9. Run \`npm run dev\`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- Supabase (auth, database with pgvector, storage)
- OpenAI Whisper (transcription) + Embeddings
- Anthropic Claude (emotional analysis)

## Architecture

1. User records audio in browser (MediaRecorder API)
2. Audio uploaded to Supabase Storage
3. Whisper transcribes the audio
4. Claude analyzes emotional content (multi-label classification)
5. OpenAI generates embeddings for vector matching
6. pgvector finds emotionally similar stories
7. Matched stories displayed to user

## Contact

Will Drummond | will@beingapp.ai | beingapp.ai

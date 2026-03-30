-- Run this in your Supabase SQL editor to create the matching function
-- This function finds stories similar to a given embedding using pgvector

create or replace function match_stories(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  exclude_user uuid
)
returns table (
  id uuid,
  user_id uuid,
  title text,
  audio_url text,
  transcript text,
  duration_seconds int,
  privacy_level text,
  emotions jsonb,
  intensity float,
  life_stage text,
  themes text[],
  story_type text,
  listen_count int,
  created_at timestamptz,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    s.id,
    s.user_id,
    s.title,
    s.audio_url,
    s.transcript,
    s.duration_seconds,
    s.privacy_level,
    s.emotions,
    s.intensity,
    s.life_stage,
    s.themes,
    s.story_type,
    s.listen_count,
    s.created_at,
    1 - (s.embedding <=> query_embedding) as similarity
  from stories s
  where s.privacy_level != 'private'
    and s.user_id != exclude_user
    and s.is_flagged = false
    and s.embedding is not null
    and 1 - (s.embedding <=> query_embedding) > match_threshold
  order by s.embedding <=> query_embedding
  limit match_count;
end;
$$;

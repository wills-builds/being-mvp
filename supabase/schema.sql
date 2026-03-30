-- Being MVP Database Schema
-- Run this in your Supabase SQL editor

-- Enable pgvector
create extension if not exists vector;

-- Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  bio text,
  is_anonymous boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Stories
create table public.stories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text,
  audio_url text not null,
  transcript text,
  duration_seconds integer,
  privacy_level text default 'private' not null,
  emotions jsonb,
  intensity float,
  life_stage text,
  themes text[],
  story_type text,
  embedding vector(1536),
  is_moderated boolean default false,
  is_flagged boolean default false,
  listen_count integer default 0,
  created_at timestamptz default now()
);

-- Streaks
create table public.streaks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date,
  created_at timestamptz default now()
);

-- Saved stories
create table public.saved_stories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  story_id uuid references public.stories(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, story_id)
);

-- Story Circles
create table public.story_circles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  theme text not null,
  emoji text,
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.stories enable row level security;
alter table public.streaks enable row level security;
alter table public.saved_stories enable row level security;

create policy "Public profiles readable" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (id = auth.uid());
create policy "Read non-private stories" on public.stories for select using (privacy_level != 'private' or user_id = auth.uid());
create policy "Insert own stories" on public.stories for insert with check (user_id = auth.uid());
create policy "Update own stories" on public.stories for update using (user_id = auth.uid());
create policy "Read own streaks" on public.streaks for select using (user_id = auth.uid());
create policy "Read own saved" on public.saved_stories for select using (user_id = auth.uid());

-- Vector index
create index on public.stories using ivfflat (embedding vector_cosine_ops) with (lists = 100);

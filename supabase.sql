-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS (handled by Supabase Auth)
-- We reference auth.users, no need to create users table

-- HABITS TABLE
create table habits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- HABIT CHECKINS
create table habit_checkins (
  id uuid primary key default uuid_generate_v4(),
  habit_id uuid references habits(id) on delete cascade,
  completed_on date not null,
  created_at timestamp with time zone default now()
);

-- USER PROFILES TABLE
create table user_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique not null,
  selected_goal text,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table habits enable row level security;
alter table habit_checkins enable row level security;
alter table user_profiles enable row level security;

-- Policies: users can only see their own habits
create policy "Users can manage their habits"
on habits
for all
using (auth.uid() = user_id);

create policy "Users can manage their habit checkins"
on habit_checkins
for all
using (
  habit_id in (
    select id from habits where user_id = auth.uid()
  )
);

-- Policies: users can only manage their own profile
create policy "Users can manage their own profile"
on user_profiles
for all
using (auth.uid() = user_id);

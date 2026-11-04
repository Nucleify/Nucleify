-- Admin user profiles aligned with auth.users id.

create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text not null default '',
  locale text not null default 'en',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_profiles_status_check check (status in ('active', 'disabled'))
);

alter table public.user_profiles add column if not exists email text;
alter table public.user_profiles add column if not exists display_name text not null default '';
alter table public.user_profiles add column if not exists locale text not null default 'en';
alter table public.user_profiles add column if not exists status text not null default 'active';
alter table public.user_profiles add column if not exists created_at timestamptz not null default now();
alter table public.user_profiles add column if not exists updated_at timestamptz not null default now();

create unique index if not exists user_profiles_email_unique_idx
  on public.user_profiles (lower(email))
  where email is not null;

alter table public.user_profiles enable row level security;

drop policy if exists "user_profiles_select_own" on public.user_profiles;
create policy "user_profiles_select_own"
on public.user_profiles for select to authenticated
using (auth.uid() = id);

drop policy if exists "user_profiles_update_own" on public.user_profiles;
create policy "user_profiles_update_own"
on public.user_profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Thin CMS entries for admin editors (markdown body).

create table if not exists public.cms_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null default 'en',
  title text not null default '',
  body text not null default '',
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_entries_status_check check (status in ('draft', 'published'))
);

alter table public.cms_entries add column if not exists slug text;
alter table public.cms_entries add column if not exists locale text not null default 'en';
alter table public.cms_entries add column if not exists title text not null default '';
alter table public.cms_entries add column if not exists body text not null default '';
alter table public.cms_entries add column if not exists status text not null default 'draft';
alter table public.cms_entries add column if not exists created_at timestamptz not null default now();
alter table public.cms_entries add column if not exists updated_at timestamptz not null default now();

create unique index if not exists cms_entries_slug_locale_uidx
  on public.cms_entries (slug, locale);

create index if not exists cms_entries_status_idx on public.cms_entries (status);

alter table public.cms_entries enable row level security;

drop policy if exists "cms_entries_authenticated_select" on public.cms_entries;
create policy "cms_entries_authenticated_select"
on public.cms_entries for select to authenticated using (true);

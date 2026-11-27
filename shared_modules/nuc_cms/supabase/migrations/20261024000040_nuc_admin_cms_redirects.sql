-- CMS redirects + public media bucket stub.

create table if not exists public.cms_redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null,
  to_path text not null,
  status_code integer not null default 301,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_redirects_status_code_check check (status_code in (301, 302, 307, 308))
);

create unique index if not exists cms_redirects_from_path_uidx
  on public.cms_redirects (from_path);

alter table public.cms_redirects enable row level security;

drop policy if exists "cms_redirects_authenticated_select" on public.cms_redirects;
create policy "cms_redirects_authenticated_select"
on public.cms_redirects for select to authenticated using (true);

-- Public bucket for admin media library (idempotent).
insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do update set public = excluded.public;

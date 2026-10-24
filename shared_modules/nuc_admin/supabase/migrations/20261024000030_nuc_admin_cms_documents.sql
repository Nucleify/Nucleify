-- JSON-first CMS documents, globals, and media stub.

create table if not exists public.cms_documents (
  id uuid primary key default gen_random_uuid(),
  collection_slug text not null,
  locale text not null default 'en',
  title text not null default '',
  slug text not null,
  status text not null default 'draft',
  published_at timestamptz,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_documents_status_check check (status in ('draft', 'published'))
);

create unique index if not exists cms_documents_collection_slug_locale_uidx
  on public.cms_documents (collection_slug, slug, locale);

create index if not exists cms_documents_collection_idx
  on public.cms_documents (collection_slug);

create index if not exists cms_documents_status_idx
  on public.cms_documents (status);

alter table public.cms_documents enable row level security;

drop policy if exists "cms_documents_authenticated_select" on public.cms_documents;
create policy "cms_documents_authenticated_select"
on public.cms_documents for select to authenticated using (true);

create table if not exists public.cms_global_documents (
  id uuid primary key default gen_random_uuid(),
  global_slug text not null,
  locale text not null default 'en',
  status text not null default 'draft',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_global_documents_status_check check (status in ('draft', 'published'))
);

create unique index if not exists cms_global_documents_slug_locale_uidx
  on public.cms_global_documents (global_slug, locale);

alter table public.cms_global_documents enable row level security;

drop policy if exists "cms_global_documents_authenticated_select" on public.cms_global_documents;
create policy "cms_global_documents_authenticated_select"
on public.cms_global_documents for select to authenticated using (true);

create table if not exists public.cms_media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  mime text not null default 'application/octet-stream',
  size bigint not null default 0,
  storage_path text not null default '',
  alt text not null default '',
  created_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists cms_media_created_at_idx
  on public.cms_media (created_at desc);

alter table public.cms_media enable row level security;

drop policy if exists "cms_media_authenticated_select" on public.cms_media;
create policy "cms_media_authenticated_select"
on public.cms_media for select to authenticated using (true);

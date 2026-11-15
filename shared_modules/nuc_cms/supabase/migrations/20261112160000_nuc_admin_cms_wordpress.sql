-- CMS WordPress-class foundation: revisions, activity, scheduling, taxonomies,
-- comments, menus, contact inbox, trash, media folders, translation links.

-- Allow scheduled + trash statuses on documents
alter table public.cms_documents drop constraint if exists cms_documents_status_check;
alter table public.cms_documents
  add constraint cms_documents_status_check
  check (status in ('draft', 'published', 'scheduled', 'trash'));

alter table public.cms_documents
  add column if not exists deleted_at timestamptz,
  add column if not exists template text not null default 'default',
  add column if not exists translation_group uuid,
  add column if not exists property text not null default 'marketing',
  add column if not exists search_text text not null default '';

create index if not exists cms_documents_scheduled_idx
  on public.cms_documents (published_at)
  where status = 'scheduled';

create index if not exists cms_documents_trash_idx
  on public.cms_documents (deleted_at)
  where status = 'trash';

create index if not exists cms_documents_translation_group_idx
  on public.cms_documents (translation_group)
  where translation_group is not null;

create index if not exists cms_documents_search_text_idx
  on public.cms_documents using gin (to_tsvector('simple', search_text));

-- Revisions
create table if not exists public.cms_document_revisions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.cms_documents (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  title text not null default '',
  slug text not null default '',
  status text not null default 'draft',
  note text not null default '',
  created_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists cms_document_revisions_document_idx
  on public.cms_document_revisions (document_id, created_at desc);

alter table public.cms_document_revisions enable row level security;
drop policy if exists "cms_document_revisions_authenticated_select" on public.cms_document_revisions;
create policy "cms_document_revisions_authenticated_select"
on public.cms_document_revisions for select to authenticated using (true);

-- Activity audit
create table if not exists public.cms_activity (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  entity_type text not null default 'document',
  entity_id uuid,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists cms_activity_created_at_idx
  on public.cms_activity (created_at desc);

alter table public.cms_activity enable row level security;
drop policy if exists "cms_activity_authenticated_select" on public.cms_activity;
create policy "cms_activity_authenticated_select"
on public.cms_activity for select to authenticated using (true);

-- Taxonomies
create table if not exists public.cms_terms (
  id uuid primary key default gen_random_uuid(),
  taxonomy text not null,
  slug text not null,
  name text not null,
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  unique (taxonomy, slug, locale)
);

create table if not exists public.cms_term_relationships (
  document_id uuid not null references public.cms_documents (id) on delete cascade,
  term_id uuid not null references public.cms_terms (id) on delete cascade,
  primary key (document_id, term_id)
);

alter table public.cms_terms enable row level security;
alter table public.cms_term_relationships enable row level security;
drop policy if exists "cms_terms_authenticated_select" on public.cms_terms;
create policy "cms_terms_authenticated_select"
on public.cms_terms for select to authenticated using (true);
drop policy if exists "cms_term_relationships_authenticated_select" on public.cms_term_relationships;
create policy "cms_term_relationships_authenticated_select"
on public.cms_term_relationships for select to authenticated using (true);

-- Menus
create table if not exists public.cms_menus (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null default 'en',
  label text not null default '',
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, locale)
);

alter table public.cms_menus enable row level security;
drop policy if exists "cms_menus_authenticated_select" on public.cms_menus;
create policy "cms_menus_authenticated_select"
on public.cms_menus for select to authenticated using (true);

-- Comments (posts)
create table if not exists public.cms_comments (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.cms_documents (id) on delete cascade,
  author_name text not null default '',
  author_email text not null default '',
  body text not null default '',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'spam', 'trash')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_comments_document_idx
  on public.cms_comments (document_id, created_at desc);

alter table public.cms_comments enable row level security;
drop policy if exists "cms_comments_authenticated_select" on public.cms_comments;
create policy "cms_comments_authenticated_select"
on public.cms_comments for select to authenticated using (true);

-- Contact form inbox
create table if not exists public.cms_contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  type text not null default '',
  message text not null default '',
  meta jsonb not null default '{}'::jsonb,
  status text not null default 'new'
    check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists cms_contact_submissions_created_at_idx
  on public.cms_contact_submissions (created_at desc);

alter table public.cms_contact_submissions enable row level security;
drop policy if exists "cms_contact_submissions_authenticated_select" on public.cms_contact_submissions;
create policy "cms_contact_submissions_authenticated_select"
on public.cms_contact_submissions for select to authenticated using (true);

-- Media folders / soft delete
alter table public.cms_media
  add column if not exists folder text not null default '',
  add column if not exists caption text not null default '',
  add column if not exists deleted_at timestamptz,
  add column if not exists public_url text not null default '';

create index if not exists cms_media_folder_idx
  on public.cms_media (folder)
  where folder <> '';

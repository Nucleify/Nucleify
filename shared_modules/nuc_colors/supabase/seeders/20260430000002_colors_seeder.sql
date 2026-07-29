-- Same as migrations/20260501000001 — seed-only runs stay compatible with legacy tables.
alter table public.user_colors add column if not exists user_id uuid references auth.users (id) on delete cascade;
alter table public.user_colors add column if not exists name text;
alter table public.user_colors add column if not exists value text;
alter table public.user_colors add column if not exists new boolean not null default false;
alter table public.user_colors add column if not exists is_new boolean not null default false;
alter table public.user_colors add column if not exists created_at timestamptz not null default now();
alter table public.user_colors add column if not exists updated_at timestamptz not null default now();

create unique index if not exists user_colors_user_id_name_uidx on public.user_colors (user_id, name);

with prepared_colors(name, value) as (
  values
    ('activity-c', '#ffb600'),
    ('activity-d', '#cc9200'),
    ('activity-hv', '#e7a60b'),
    ('activity-f', '#ffb60080'),
    ('activity-sc', '#ffb60035'),
    ('activity-sl', '#ffb60026'),
    ('activity-h', '#ffb60015'),
    ('article-c', '#1187c7'),
    ('article-d', '#0d5a8a'),
    ('article-h', '#1187c715'),
    ('article-f', '#1187c780'),
    ('article-sc', '#1187c735'),
    ('article-sl', '#1187c726'),
    ('article-hv', '#0f79b2'),
    ('contact-c', '#10b981'),
    ('contact-d', '#054a32'),
    ('contact-h', '#10b98115'),
    ('contact-f', '#10b98180'),
    ('contact-sc', '#10b98135'),
    ('contact-sl', '#10b98126'),
    ('contact-hv', '#10a674'),
    ('main-c', '#10b981'),
    ('main-d', '#054a32'),
    ('main-h', '#10b98115'),
    ('main-f', '#10b98180'),
    ('main-sc', '#10b98135'),
    ('main-sl', '#10b98126'),
    ('main-hv', '#10a674'),
    ('money-c', '#11c73b'),
    ('money-d', '#0d9a2e'),
    ('money-h', '#11c73b15'),
    ('money-f', '#11c73b80'),
    ('money-sc', '#11c73b35'),
    ('money-sl', '#11c73b26'),
    ('money-hv', '#11c73b'),
    ('question-c', '#8cb910'),
    ('question-d', '#6f940d'),
    ('question-h', '#8cb91015'),
    ('question-f', '#8cb91080'),
    ('question-sc', '#8cb91035'),
    ('question-sl', '#8cb91026'),
    ('question-hv', '#7ca40f'),
    ('technology-c', '#b95910'),
    ('technology-d', '#94470d'),
    ('technology-h', '#b9591015'),
    ('technology-f', '#b9591080'),
    ('technology-sc', '#b9591035'),
    ('technology-sl', '#b9591026'),
    ('technology-hv', '#9b4b0e'),
    ('user-c', '#64748b'),
    ('user-d', '#4f5d6f'),
    ('user-h', '#64748b15'),
    ('user-f', '#64748b80'),
    ('user-sc', '#64748b35'),
    ('user-sl', '#64748b26'),
    ('user-hv', '#566479')
)
insert into public.system_colors (name, value)
select name, value from prepared_colors
on conflict (name) do update set
  value = excluded.value,
  updated_at = now();

-- Per-user entity colors are seeded in 20260502000000_user_colors_entities_seed.sql (runs after auth.users).

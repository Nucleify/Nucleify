-- Admin RBAC: roles, permissions, join tables.

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.permissions add column if not exists slug text;
alter table public.permissions add column if not exists name text;
alter table public.permissions add column if not exists created_at timestamptz not null default now();

create unique index if not exists permissions_slug_uidx on public.permissions (slug);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.roles add column if not exists slug text;
alter table public.roles add column if not exists name text;
alter table public.roles add column if not exists description text not null default '';
alter table public.roles add column if not exists created_at timestamptz not null default now();
alter table public.roles add column if not exists updated_at timestamptz not null default now();

create unique index if not exists roles_slug_uidx on public.roles (slug);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles (id) on delete cascade,
  permission_id uuid not null references public.permissions (id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role_id uuid not null references public.roles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create index if not exists user_roles_user_id_idx on public.user_roles (user_id);
create index if not exists user_roles_role_id_idx on public.user_roles (role_id);

alter table public.permissions enable row level security;
alter table public.roles enable row level security;
alter table public.role_permissions enable row level security;
alter table public.user_roles enable row level security;

drop policy if exists "permissions_authenticated_select" on public.permissions;
create policy "permissions_authenticated_select"
on public.permissions for select to authenticated using (true);

drop policy if exists "roles_authenticated_select" on public.roles;
create policy "roles_authenticated_select"
on public.roles for select to authenticated using (true);

drop policy if exists "role_permissions_authenticated_select" on public.role_permissions;
create policy "role_permissions_authenticated_select"
on public.role_permissions for select to authenticated using (true);

drop policy if exists "user_roles_authenticated_select_own" on public.user_roles;
create policy "user_roles_authenticated_select_own"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

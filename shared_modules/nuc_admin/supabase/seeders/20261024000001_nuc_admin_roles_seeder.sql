-- Seed default roles + permission matrix for admin.

insert into public.permissions (slug, name)
values
  ('users.read', 'Read users'),
  ('users.write', 'Write users'),
  ('cms.read', 'Read CMS'),
  ('cms.write', 'Write CMS'),
  ('settings.write', 'Write settings'),
  ('roles.write', 'Write roles')
on conflict (slug) do update set name = excluded.name;

insert into public.roles (slug, name, description)
values
  ('owner', 'Owner', 'Full access to admin'),
  ('admin', 'Admin', 'Manage users and CMS'),
  ('editor', 'Editor', 'Edit CMS content')
on conflict (slug) do update
set name = excluded.name, description = excluded.description, updated_at = now();

-- owner: all permissions
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'owner'
on conflict do nothing;

-- admin: users + cms + settings (no roles.write)
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'admin'
  and p.slug in ('users.read', 'users.write', 'cms.read', 'cms.write', 'settings.write')
on conflict do nothing;

-- editor: cms only
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'editor'
  and p.slug in ('cms.read', 'cms.write')
on conflict do nothing;

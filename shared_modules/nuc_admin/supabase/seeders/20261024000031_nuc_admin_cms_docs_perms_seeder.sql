-- Extra CMS permissions for documents / media.

insert into public.permissions (slug, name)
values
  ('cms.publish', 'Publish CMS documents'),
  ('media.read', 'Read media library'),
  ('media.write', 'Write media library')
on conflict (slug) do update set name = excluded.name;

-- owner already has all via cross join on new inserts? re-sync owner
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'owner'
  and p.slug in ('cms.publish', 'media.read', 'media.write')
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'admin'
  and p.slug in ('cms.publish', 'media.read', 'media.write')
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'editor'
  and p.slug in ('cms.publish', 'media.read')
on conflict do nothing;

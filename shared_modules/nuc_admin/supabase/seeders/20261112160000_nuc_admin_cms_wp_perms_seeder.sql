-- Extra permissions for WordPress-class CMS features.

insert into public.permissions (slug, label)
values
  ('cms.pages.publish', 'Publish pages'),
  ('cms.posts.edit', 'Edit posts'),
  ('cms.posts.publish', 'Publish posts'),
  ('cms.comments.moderate', 'Moderate comments'),
  ('cms.contact.read', 'Read contact inbox')
on conflict (slug) do nothing;

-- Owners / admins get all new perms
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug in ('owner', 'admin')
  and p.slug in (
    'cms.pages.publish',
    'cms.posts.edit',
    'cms.posts.publish',
    'cms.comments.moderate',
    'cms.contact.read'
  )
on conflict do nothing;

-- Editors: posts + pages publish + contact read
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
cross join public.permissions p
where r.slug = 'editor'
  and p.slug in (
    'cms.pages.publish',
    'cms.posts.edit',
    'cms.posts.publish',
    'cms.contact.read'
  )
on conflict do nothing;

-- After nuc_users (and any auth.users inserts): give every user entity palette overrides.
-- Keys: `{entity}-{shade}-u` — must match nuc_colors plugins / sync_colors_with_database.ts.

insert into public.user_colors (user_id, name, value, is_new, new)
select
  u.id,
  sc.name || '-u',
  sc.value,
  false,
  false
from auth.users u
cross join public.system_colors sc
where split_part(sc.name, '-', 1) in (
  'article',
  'contact',
  'money',
  'question',
  'technology',
  'user'
)
on conflict (user_id, name) do update set
  value = excluded.value,
  is_new = excluded.is_new,
  new = excluded.new,
  updated_at = now();

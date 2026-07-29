drop function if exists public.factory_user_color(integer);

create or replace function public.factory_user_color(i integer)
returns table(name text, value text, is_new boolean, created_at timestamptz)
language sql
as $$
  select
    format('color_%s', i),
    format('#%s', lpad(to_hex((i * 982451653)::bigint % 16777215), 6, '0')),
    (i % 5 = 0),
    now() - ((i % 365) || ' days')::interval;
$$;

drop function if exists public.factory_system_color(integer);

create or replace function public.factory_system_color(i integer)
returns table(name text, value text)
language sql
as $$
  select
    format('color-seed-%s-%s', i, substr(md5(random()::text), 1, 4)),
    format('#%s', upper(substr(md5(random()::text), 1, 6)));
$$;

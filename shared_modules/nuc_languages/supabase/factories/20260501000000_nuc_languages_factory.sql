drop function if exists public.factory_translation(integer);

create or replace function public.factory_translation(i integer)
returns table(locale text, key text, value text)
language sql
as $$
  select
    (array['en', 'pl', 'vn'])[1 + (i % 3)],
    format('factory-key-%s', i),
    format('Factory value %s', i);
$$;

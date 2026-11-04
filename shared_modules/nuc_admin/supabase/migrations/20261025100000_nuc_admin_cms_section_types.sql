-- Rename CMS section widget types from page-scoped prefixes to section.*.

create or replace function public.nuc_admin_rename_cms_section_types(payload jsonb)
returns jsonb
language plpgsql
immutable
as $$
declare
  sections jsonb;
  mapped jsonb := '[]'::jsonb;
  elem jsonb;
  typ text;
  new_typ text;
begin
  if payload is null or jsonb_typeof(payload->'sections') <> 'array' then
    return payload;
  end if;

  sections := payload->'sections';
  for elem in select value from jsonb_array_elements(sections)
  loop
    typ := elem->>'type';
    new_typ := case typ
      when 'home.hero' then 'section.hero'
      when 'home.pillars' then 'section.pillars'
      when 'home.clone' then 'section.clone'
      when 'home.stack' then 'section.stack'
      when 'home.compiler_demo' then 'section.compiler_demo'
      when 'home.pulse' then 'section.pulse'
      when 'home.close' then 'section.close'
      when 'investor.intro' then 'section.intro'
      when 'investor.thesis' then 'section.thesis'
      when 'investor.savings' then 'section.savings'
      when 'investor.wedge' then 'section.wedge'
      when 'investor.surface' then 'section.surface'
      when 'investor.ask' then 'section.ask'
      else typ
    end;
    if new_typ is distinct from typ then
      elem := jsonb_set(elem, '{type}', to_jsonb(new_typ), true);
    end if;
    mapped := mapped || jsonb_build_array(elem);
  end loop;

  return jsonb_set(payload, '{sections}', mapped, true);
end;
$$;

update public.cms_documents
set
  data = public.nuc_admin_rename_cms_section_types(data),
  updated_at = now()
where data ? 'sections';

drop function public.nuc_admin_rename_cms_section_types(jsonb);

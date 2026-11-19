-- Rail is the marketing shell (side rail + animations). Default stays bare.
alter table public.cms_documents
  alter column template set default 'rail';

update public.cms_documents
set template = 'rail',
    updated_at = now()
where collection_slug = 'pages'
  and template = 'default';

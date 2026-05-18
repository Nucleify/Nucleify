# Root Laravel -> Supabase compatibility map

This file documents the root-level behavior replacement after restoring deleted files.

## HTTP/API behavior

- `routes/api.php` `/test` -> `supabase/functions/test/index.ts`
- `routes/api.php` `/contact-form` + `app/Http/Controllers/ContactFormController.php` + `app/Http/Requests/ContactFormRequest.php` + `app/Mail/ContactFormMail.php` + `resources/views/emails/contact-form.blade.php` -> `supabase/functions/contact-form/index.ts`

## Runtime/backend command behavior

- `modules/nuc_terminal` Laravel artisan endpoint behavior -> `supabase/functions/terminal/index.ts`

## Storage/data behavior

- Contact form persistence (new) -> `supabase/migrations/20260430000005_contact_form_submissions.sql`

## Notes

- Deleted files were restored to keep the original reference baseline.
- Active runtime path is now Supabase-first via Edge Functions.

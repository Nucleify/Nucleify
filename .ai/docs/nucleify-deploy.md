# nucleify deploy

```bash
make deploy web    # Cloudflare Workers (`web/wrangler.toml`)
make deploy admin  # Cloudflare Workers (`admin/wrangler.toml`)
make deploy docs   # Vercel (`@nucleify/docs`)
```

Contact form on Workers needs Resend in Nuxt `runtimeConfig` at **build** time (`RESEND_API_KEY`, `CONTACT_FORM_TO_EMAIL`, …). Full checklist was in the old `make-deploy` note — bake env into the Worker build, not only root `.env`.

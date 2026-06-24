.PHONY: setup nuxt next

setup:
	$(MAKE) nuxt
	$(MAKE) next

nuxt:
	cp .config/.env.nuxt.example .env
	pnpm install
	pnpm prepare:husky

	pnpm nuxt

next:
	cp .config/.env.next.example .env
	pnpm install
	pnpm prepare:husky

	pnpm next

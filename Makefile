.PHONY: setup root admin docs

setup:
	pnpm install
	pnpm prepare:husky
	pnpm --filter @nucleify/root prepare
	pnpm sync-rules

root:
	cp root/.config/.env.example .env
	pnpm install
	pnpm prepare:husky
	pnpm --filter @nucleify/root nuxt

admin:
	pnpm --filter @nucleify/admin dev

docs:
	pnpm --filter @nucleify/docs dev

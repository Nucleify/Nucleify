.PHONY: setup nuxt next

setup:
	$(MAKE) nuxt
	$(MAKE) next
	composer install

	./vendor/bin/sail up --build -d
	./vendor/bin/sail art migrate:fresh --seed

nuxt:
	cp .config/.env.docker.nuxt.example .env
	pnpm install
	pnpm prepare:husky

next:
	cp .config/.env.docker.next.example .env
	cd next && pnpm install
	pnpm prepare:husky

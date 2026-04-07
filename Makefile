.PHONY: setup nuxt next

setup:
	$(MAKE) nuxt
	$(MAKE) next

nuxt:
	cp .config/.env.docker.nuxt.example .env
	pnpm install
	pnpm prepare:husky

	make docker

next:
	cp .config/.env.docker.next.example .env
	cd next && pnpm install
	pnpm prepare:husky

	make docker

php: 
	composer install

docker:
	make php
	./vendor/bin/sail up --build -d
	./vendor/bin/sail art migrate:fresh --seed
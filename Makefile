.PHONY: setup nuxt next

setup:
	$(MAKE) nuxt
	$(MAKE) next

nuxt:
	cp .config/.env.docker.nuxt.example .env
	make php
	pnpm install
	pnpm prepare:husky

	make docker

next:
	cp .config/.env.docker.next.example .env
	make php
	cd next && pnpm install
	pnpm prepare:husky

	make docker

php: 
	composer install

docker:
	./vendor/bin/sail up --build -d
	./vendor/bin/sail art migrate:fresh --seed
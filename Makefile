.PHONY: setup nuxt next docker-fix-perms

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

docker:
	docker compose up --build -d

# Jednorazowo po starym Dockerze (pliki .nuxt/.output jako root) — inaczej EACCES przy `pnpm dev` na hoście.
docker-fix-perms:
	sudo chown -R $$(id -u):$$(id -g) .nuxt .output
setup:
	cp .config/.env.docker.example .env
	composer install
	pnpm install
	cd next && pnpm install
	cd ..
	pnpm prepare:husky
	./vendor/bin/sail up --build -d
	@bash .config/bash/wait-for-db.sh
	./vendor/bin/sail art migrate:fresh --seed

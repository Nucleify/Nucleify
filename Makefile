setup:
	cp .env.docker.example .env
	composer install
	npm install
	npm run prepare:husky
	./vendor/bin/sail up --build -d
	./vendor/bin/sail art migrate:fresh --seed

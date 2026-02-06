setup:
	cp .env.docker.example .env
	composer install
	npm install
	cd next && npm install
	cd ..
	npm run prepare:husky
	./vendor/bin/sail up --build -d
	./vendor/bin/sail art migrate:fresh --seed

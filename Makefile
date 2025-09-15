setup:
	unzip -o vendor.zip -d vendor 
	cp .env.docker.example .env
	npm install
	npm run prepare:husky
	./vendor/bin/sail up --build -d
	./vendor/bin/sail art migrate:fresh --seed

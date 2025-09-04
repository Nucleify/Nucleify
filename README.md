# <div align="center"> <img src="/public/img/logo.png" width="70"> <br> DataManager <br> </div>
<br>

Streamline ERP and design management with a powerful system built using Laravel and Nuxt. Easily organize, manage, and access all your data types in one powerful, user-friendly platform - perfect for CRM, ERP and E-commerce solutions.
Our target is to create fully responsive, functional and scalable website based on [RWD](https://en.wikipedia.org/wiki/Responsive_web_design), [MFD](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development), [FSD](https://medium.com/@dtgasparyan/feature-sliced-design-the-ideal-frontend-architecture-84d701ad44ba) and [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) principles.


<b>Join our project and become part of building something incredible!</b>

<br><a href="https://datamanager.atomic-it.org">Live preview</a><br><br>

⭐ **Unique Laravel/Nuxt modules functionality** <br>
⭐ Atomic Design + [Storybook](https://storybook.js.org/) tests for most components <br>
⭐ Futuristic UI made with [PrimeVue](https://primevue.org/) + [Chart.js](https://www.chartjs.org/) + [GSAP](https://gsap.com/) + [SCSS](https://sass-lang.com/) <br>

<br>

<details><summary>✅ 94/96 Performance</summary>
<br>

I'm sure I could optimize it further, but it's good enough for now.
<br>

#### Introduced many optimizations:
- SSR & Prerendering
- Nuxt building with Atomic Design gives nicely separated chunks, able to defer as you wish
- Preloading icons, font-display: swap + defer non-critical CSS + JS
- Fetching website's content like questions, or technologies from database on prerender, making them editable and accessible instantly without load time
- [nuxt-vitalizer](https://nuxt.com/modules/vitalizer) - this module is just perfect
- [@nuxtjs/google-fonts](https://nuxt.com/modules/google-fonts) - downloading fonts on building & serving them on prerender, reducing third-party sources
- I also recommend ```<deferred-content>``` tag from PrimeVue - it impacts performance extremely well
- and some other magic tricks that I keep secret :D

<br>
    
[PageSpeed Test](https://pagespeed.web.dev/analysis/https-datamanager-atomic-it-org/36uql7apub?form_factor=mobile)

![Image](https://github.com/user-attachments/assets/690bf666-17de-4d7e-bd1e-7fd9cac2466c)
![Image](https://github.com/user-attachments/assets/c25bfe19-9a8f-4e9a-9d52-a0dc136c830d)

</details>


<br>
<hr>
<br>


<details><summary> <h2> &nbsp; <img src="/public/img/technologies/xampp.svg" height="20" /> &nbsp; XAMPP </h2> </summary> <br>
<details><summary> 🛠️ Installation </summary>

- First make sure u have installed latest versions of [PHP](https://www.php.net), [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com), [XAMPP](https://www.apachefriends.org/pl/index.html) and [Composer](https://getcomposer.org/)

- I recommend use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) for install latest supported versions of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com),

```
nvm use --lts
```

- Clone this repository

```
git clone https://github.com/Atomic-IT/DataManager.git
```

- Change *.env.example* file to *.env* in root directory

- Generate APP_KEY

```
php artisan key:generate
```

- Install modules in root directory

```bash
npm install
composer install
```

### **Make sure u have installed all modules!**

- run XAMPP mysql server and create database
```bash
mysql -u root -p
create database datamanager
create database datamanager_test    # it's not necessary, only for tests
```

<br></details>

<details><summary> 🚀 Run </summary><br>

Root directory:

```bash
npm run dev
php artisan serve
```

<br></details>

<details><summary> ❓ Usage </summary><br>
<details><summary> Migrations </summary><br>

```bash
php artisan migrate:fresh --seed

# Reset database by dropping all tables and then run all migrations
# --seed flag runs the database seeders after the migrations
```

<br/></details>

<details><summary> Factories </summary><br>

```bash
php artisan tinker

# if you wish, you can specify count in factory() or attributes in create()
Article::factory(100)->create();
Contact::factory(100)->create();
User::factory(100)->create();

# for Spatie Activity model
Database\Factories\ActivityFactory::new()->count(100)->create();
```

<br/></details>

<details><summary> Tests </summary><br>

<img src="/public/img/technologies/pest.svg" height="15" /> &nbsp;Pest tests:
```bash
# run all tests
./vendor/bin/pest

# or specify group
./vendor/bin/pest --group=api

# defined tests groups:
api, activity-api, article-api, artisan-api, contact-api, sitemap-api, user-api,
database, feature, global, unit, commands, controllers, services, factories, migrations, models

# run all tests and check code coverage
./vendor/bin/pest --coverage
```
![Tests](https://github.com/user-attachments/assets/560df303-07c7-42f0-a178-07ef5e05a8a8)![Coverage](https://github.com/user-attachments/assets/0b6cc696-8fdb-469f-a78c-e6faaadbe437)

<img src="/public/img/technologies/cypress.svg" height="15" /> &nbsp;Cypress tests:
```bash
npm run open
```

<img src="/public/img/technologies/vitest.svg" height="15" /> &nbsp;Vitest tests:
```bash
npm run tests
```

<img src="/public/img/technologies/storybook.svg" height="15" /> &nbsp;Storybook - visit ```localhost:6006``` after ```npm run dev```

<br></details>

<details><summary> npm </summary><br>

1. Install packages - ```npm install```
2. Nuxt build - ```npm run build```
3. Run Prettier - ```npm run write```
4. Run Eslint - ```npm run lint```
5. Run Stylelint - ```npm run slint```
6. Husky install - ```npm run prepare```

<br></details>

<details><summary> Sitemaps </summary><br>

Generate XML sitemap

```bash
php artisan sitemap:generate
```

</details></details><hr><br></details></details>




<details><summary> <h2> &nbsp; <img src="/public/img/technologies/docker.svg" height="20" /> &nbsp; Docker </h2> </summary> <br>
<details><summary> 🛠️ Installation </summary> <br>

- First make sure u have installed latest versions of [Composer](https://getcomposer.org/) and [Docker](https://www.docker.com)
  
- Clone this repository

```
git clone https://github.com/Atomic-IT/DataManager.git
```

- Change .env.docker.example file to .env in root directory
- Unzip vendor.zip

- Build & run Docker image 
```bash
sail up --build -d
```

### **Make sure u have installed all modules!**

<br>

Possible problems:
- Sail: no such file or directory found: [Solution 1](https://laravel.com/docs/10.x/sail#configuring-a-shell-alias), [Solution 2](https://stackoverflow.com/questions/71503871/laravel-error-laravel-sail-no-such-file-or-directory-found)
- Error: EACCES: permission denied, mkdir '/var/www/html/node_modules': ```sudo chmod 777 -R DataManager``` or [Solution](https://stackoverflow.com/questions/49679808/error-eacces-permission-denied-mkdir-usr-local-lib-node-modules-node-sass-b)

<br></details>

<details><summary> 🚀 Run </summary> <br>

Root directory:

```bash
# run all Docker containers in the background
sail up -d
```

**Remember to shutdown all XAMPP processes!**

Possible problems:
- Error starting userland proxy: listen tcp4 0.0.0.0:3306: bind: address already in use: ```sudo service mysql stop```

<br></details>

<details><summary> ❓ Usage </summary><br>

<details><summary> Migrations </summary><br>

```bash
sail artisan migrate:fresh --seed

# Reset database by dropping all tables and then run all migrations
# --seed flag runs the database seeders after the migrations
```

<br/></details>

<details><summary> Factories </summary><br>

```bash
sail tinker

# if you wish, you can specify count in factory() or attributes in create()
Article::factory(100)->create();
Contact::factory(100)->create();
User::factory(100)->create();

# for Spatie Activity model
Database\Factories\ActivityFactory::new()->count(100)->create();
```

<br/></details>

<details><summary> Tests </summary><br>

<img src="/public/img/technologies/pest.svg" height="15" /> &nbsp;Pest tests:
```bash
# run all tests
sail pest

# or specify group
sail pest --group=api

# defined tests groups:
api, activity-api, article-api, artisan-api, contact-api, sitemap-api, user-api,
database, feature, global, unit, commands, controllers, services, factories, migrations, models

# run all tests and check code coverage
sail pest --coverage
```

![Tests](https://github.com/user-attachments/assets/560df303-07c7-42f0-a178-07ef5e05a8a8)![Coverage](https://github.com/user-attachments/assets/0b6cc696-8fdb-469f-a78c-e6faaadbe437)



<img src="/public/img/technologies/cypress.svg" height="15" /> &nbsp;Cypress tests:
```bash
npm run open  # For now I've not configured Cypress with Docker
```

<img src="/public/img/technologies/vitest.svg" height="15" /> &nbsp;Vitest tests:
```bash
sail npm run tests
```

<img src="/public/img/technologies/storybook.svg" height="15" /> &nbsp;Storybook - visit ```localhost:6006``` after ```sail up -d```

<br></details>

<details><summary> npm </summary><br>

1. Install packages - ```sail npm install```
2. Nuxt build - ```sail npm run build```
3. Run Prettier - ```sail npm run write```
4. Run Eslint - ```sail npm run lint```
5. Run Stylelint - ```sail npm run slint```
6. Husky install - ```sail npm run prepare```

<br></details>

<details><summary> Sitemaps </summary><br>

Generate XML sitemap

```bash
sail artisan sitemap:generate
```

</details></details><hr><br></details></details>

<details><summary> <h2> &nbsp; <img src="/public/img/technologies/stack.svg" width="20"> &nbsp; Tech Stack </h2> </summary> <br>
<div align="center">
    <a href="https://www.typescriptlang.org/" target="_blank"><img src="/public/img/technologies/typescript.svg" height="35" width="35" alt="TypeScript" /></a>
    <a href="https://www.php.net/" target="_blank"><img src="/public/img/technologies/php.svg" height="35" width="35" alt="PHP" /></a>
    <a href="https://laravel.com/" target="_blank"><img src="/public/img/technologies/laravel.svg" height="35" width="35" alt="Laravel" /></a>
    <a href="https://nuxt.com/" target="_blank"><img src="/public/img/technologies/nuxt.svg" height="35" width="35" alt="Nuxt" /></a>
    <a href="https://vuejs.org/" target="_blank"><img src="/public/img/technologies/vue.svg" height="35" width="35" alt="Vue" /></a>
    <a href="https://primevue.org/" target="_blank"><img src="/public/img/technologies/primevue.svg" height="35" width="35" alt="PrimeVue" /></a>
    <a href="https://www.chartjs.org/" target="_blank"><img src="/public/img/technologies/chart-js.svg" height="35" width="35" alt="Chart.js" /></a>
    <a href="https://greensock.com/gsap/" target="_blank"><img src="/public/img/technologies/gsap.svg" height="35" width="35" alt="GSAP" /></a>
    <a href="https://sass-lang.com/" target="_blank"><img src="/public/img/technologies/scss.svg" height="35" width="35" alt="Sass" /></a>
    <a href="https://html.com/" target="_blank"><img src="/public/img/technologies/html5.svg" height="35" width="35" alt="HTML5" /></a>
    <a href="https://www.docker.com/" target="_blank"><img src="/public/img/technologies/docker.svg" height="35" width="35" alt="Docker" /></a>
    <a href="https://www.heroku.com/" target="_blank"><img src="/public/img/technologies/heroku.svg" height="35" width="35" alt="Heroku" /></a>
    <a href="https://www.mysql.com/" target="_blank"><img src="/public/img/technologies/mysql.svg" height="35" width="35" alt="MySQL" /></a>
    <a href="https://pestphp.com/" target="_blank"><img src="/public/img/technologies/pest.svg" height="34" width="34" alt="PestPHP" /></a>
    <a href="https://vitest.dev/" target="_blank"><img src="/public/img/technologies/vitest.svg" height="35" width="35" alt="Vitest" /></a>
    <a href="https://storybook.js.org/" target="_blank"><img src="/public/img/technologies/storybook.svg" height="35" width="35" alt="Storybook" /></a>
    <a href="https://www.cypress.io/" target="_blank"><img src="/public/img/technologies/cypress.svg" height="35" width="35" alt="Cypress" /></a>
    <a href="https://biomejs.dev/" target="_blank"><img src="/public/img/technologies/biome.svg" height="35" width="35" alt="Biome" /></a>
    <a href="https://stylelint.io/" target="_blank"><img src="/public/img/technologies/stylelint.svg" height="35" width="35" alt="Stylelint" /></a>
    <a href="https://github.com/features/actions" target="_blank"><img src="/public/img/technologies/github.svg" height="35" width="35" alt="Github Actions" /></a>
    <a href="https://typicode.github.io/husky/" target="_blank"><img src="/public/img/technologies/husky.svg" height="35" width="35" alt="Husky" /></a>
</div>

<hr><br></details>

<details><summary> <h2> &nbsp; <img src="/public/img/technologies/github.svg" width="20"> &nbsp; Contribute </h2> </summary> <br>

Feel free to check [Issues](https://github.com/SzymCode/DataManager/issues) section. <br>
Your skills and expertise will directly contribute to the success of our project, helping us achieve our goals and create an attractive portfolio.

<br></details>

<br>
<hr>

<div align="center">

<h3>Contributors</h3>

<a href="https://github.com/SzymCode" target="_blank"><img src="/public/img/contributors/szymcode.svg" width="30" height="30" /></a>
<a href="https://github.com/kbloski" target="_blank"><img src="/public/img/contributors/kbloski.svg" width="30" height="30" /></a>
<a href="https://github.com/kbujak09" target="_blank"><img src="/public/img/contributors/kbujak09.svg" width="30" height="30" /></a>
<a href="https://github.com/K4mD4m" target="_blank"><img src="/public/img/contributors/K4mD4m.svg" width="30" height="30" /></a>
<a href="https://github.com/J0jeQ" target="_blank"><img src="/public/img/contributors/J0jeQ.svg" width="30" height="30" /><a>
<a href="https://github.com/JakubMalik" target="_blank"><img src="/public/img/contributors/JakubMalik.svg" width="30" height="30" /><a>
<a href="https://github.com/KatarzynaS97" target="_blank"><img src="/public/img/contributors/KatarzynaS97.svg" width="30" height="30" /></a>
<a href="https://github.com/karol199393" target="_blank"><img src="/public/img/contributors/karol199393.svg" width="30" height="30" /></a>
<a href="https://github.com/pysifu" target="_blank"><img src="/public/img/contributors/pysifu.svg" width="30" height="30" /></a>

</div>

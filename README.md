# <div align="center"> <img src="/public/img/logo.png" width="70"> <br> Nucleify <br> </div>
<br>

Build modern, scalable web applications with Nucleify – a modular, core-driven framework of uniquely functional, nucleus-inspired modules. Easily structure, manage, and reuse components to create responsive, maintainable, and flexible web apps. Nucleify leverages **[Laravel](https://laravel.com/)** for the backend and **[Nuxt](https://nuxt.com/)** for the frontend, giving developers a powerful full-stack foundation.

Designed with [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/), [Mobile-First](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00), [Feature-Sliced](https://medium.com/@dtgasparyan/feature-sliced-design-the-ideal-frontend-architecture-84d701ad44ba) and [Test Driven Development](https://wikipedia.org/wiki/Test-driven_development) principles in mind, Nucleify helps developers deliver powerful, efficient, and future-proof web projects.

**Join our project and become part of building something incredible!**

<br><a href="https://nucleify.io">Live preview</a><br><br>

⭐ **Project setup with a single command** <br>
⭐ **Unique Laravel/Nuxt modules & overrides functionality** <br>
⭐ Atomic Design components + CSS modules <br>
⭐ Futuristic UI made with [nucleify-ui](https://www.npmjs.com/package/nucleify-ui) + [Chart.js](https://www.chartjs.org/) + [GSAP](https://gsap.com/) + [SCSS](https://sass-lang.com/) <br>

<br>

<details><summary>✅ 94/96 Performance</summary>
<br>

#### Introduced many optimizations:
- SSR & Prerendering
- Nuxt building with Atomic Design gives nicely separated chunks, able to defer as you wish
- Preloading icons, font-display: swap + defer non-critical CSS + JS
- Fetching website's content like questions, or technologies from database on prerender, making them editable and accessible instantly without load time
- [nuxt-vitalizer](https://nuxt.com/modules/vitalizer) - this module is just perfect
- [@nuxtjs/google-fonts](https://nuxt.com/modules/google-fonts) - downloading fonts on building & serving them on prerender, reducing third-party sources
- I also recommend ```<nui-deferred-content>``` — it impacts performance extremely well
- and some other magic tricks that we keep secret :D

<br>
    
[PageSpeed Test](https://pagespeed.web.dev/analysis/https-datamanager-atomic-it-org/36uql7apub?form_factor=mobile)

![Image](https://github.com/user-attachments/assets/690bf666-17de-4d7e-bd1e-7fd9cac2466c)
![Image](https://github.com/user-attachments/assets/c25bfe19-9a8f-4e9a-9d52-a0dc136c830d)

</details>


<br>
<hr>

> We have officially deprecated all installation methods other than Docker. \
> Alternative installation approaches proved unnecessary and introduced additional complexity and avoidable setup issues. \
> To ensure a simpler and more reliable setup process, the project is now distributed exclusively through Docker.

<hr>
<br>

<details><summary> <h2> &nbsp; <img src="/public/img/technologies/docker.svg" height="20" /> &nbsp; Docker </h2> </summary> <br>
<details><summary> 🛠️ Installation </summary> <br>

- First make sure u have installed latest version of [Docker](https://www.docker.com), [Composer](https://getcomposer.org/), [Node.js](https://nodejs.org/en), [pnpm](https://pnpm.io/) and have [Make](https://makefiletutorial.com/#getting-started) command ready
  
- Clone this repository

```
git clone https://github.com/Nucleify/Nucleify
```

- Run ```make``` command

<br>

That's it! Now, you can enter http://localhost:3000

<br>
<br>

<details><summary> Harder way </summary> <br>

- Copy ```web/.config/.env.example``` to ```.env``` in root directory
- Run ```composer install```

- Build & run Docker image 
```bash
sail up --build -d
sail art migrate:fresh --seed
```

</details>

<br>

Possible problems:
- Sail: no such file or directory found: [Solution 1](https://laravel.com/docs/10.x/sail#configuring-a-shell-alias), [Solution 2](https://stackoverflow.com/questions/71503871/laravel-error-laravel-sail-no-such-file-or-directory-found)
- Error: EACCES: permission denied, mkdir '/var/www/html/node_modules': ```sudo chmod 777 -R nucleify``` or [Solution](https://stackoverflow.com/questions/49679808/error-eacces-permission-denied-mkdir-usr-local-lib-node-modules-node-sass-b)

<br></details>

<details><summary> 🚀 Run </summary> <br>

Root directory:

```bash
sail up -d
```

Possible problems:
- Error starting userland proxy: listen tcp4 0.0.0.0:3306: bind: address already in use: ```sudo service mysql stop```

<br></details>

<details><summary> ❓ Usage </summary><br>

<details><summary> Migrations </summary><br>

```bash
sail art migrate:fresh --seed

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

![Tests](/public/img/tests.png)![Coverage](/public/img/tests_coverage.png)


<img src="/public/img/technologies/vitest.svg" height="15" /> &nbsp;Vitest tests:
```bash
sail pnpm run tests
```

<br></details>

<details><summary> pnpm </summary><br>

1. Install packages - ```sail pnpm install```
2. Nuxt build - ```sail pnpm run build```
3. Run Biome - ```sail pnpm run write```
4. Run check - ```sail pnpm run check```
5. Run Stylelint - ```sail pnpm run slint```
6. Husky install - ```sail pnpm run prepare:husky```

<br></details>

<details><summary> Sitemaps </summary><br>

Generate XML sitemap

```bash
sail art sitemap:generate
```

</details></details><hr><br></details></details>


<details><summary> <h2> &nbsp; <img src="/public/img/technologies/stack.svg" width="20"> &nbsp; Tech Stack </h2> </summary> <br>
<div align="center">
    <a href="https://www.typescriptlang.org/" target="_blank"><img src="/public/img/technologies/typescript.svg" height="35" width="35" alt="TypeScript" /></a>
    <a href="https://nuxt.com/" target="_blank"><img src="/public/img/technologies/nuxt.svg" height="35" width="35" alt="Nuxt" /></a>
    <a href="https://nextjs.org/" target="_blank"><img src="/public/img/technologies/next.svg" height="35" width="35" alt="Next.js" /></a>
    <a href="https://www.chartjs.org/" target="_blank"><img src="/public/img/technologies/chart-js.svg" height="35" width="35" alt="Chart.js" /></a>
    <a href="https://sass-lang.com/" target="_blank"><img src="/public/img/technologies/scss.svg" height="35" width="35" alt="Sass" /></a>
    <a href="https://html.com/" target="_blank"><img src="/public/img/technologies/html5.svg" height="35" width="35" alt="HTML5" /></a>
    <a href="https://supabase.com/" target="_blank"><img src="/public/img/technologies/supabase.svg" height="35" width="35" alt="Supabase" /></a>
    <a href="https://www.docker.com/" target="_blank"><img src="/public/img/technologies/docker.svg" height="35" width="35" alt="Docker" /></a>
    <a href="https://www.cloudflare.com/" target="_blank"><img src="/public/img/technologies/cloudflare.svg" height="35" width="35" alt="Cloudflare" /></a>
    <a href="https://vitest.dev/" target="_blank"><img src="/public/img/technologies/vitest.svg" height="35" width="35" alt="Vitest" /></a>
    <a href="https://biomejs.dev/" target="_blank"><img src="/public/img/technologies/biome.svg" height="35" width="35" alt="Biome" /></a>
    <a href="https://stylelint.io/" target="_blank"><img src="/public/img/technologies/stylelint.svg" height="35" width="35" alt="Stylelint" /></a>
    <a href="https://github.com/features/actions" target="_blank"><img src="/public/img/technologies/github.svg" height="35" width="35" alt="Github Actions" /></a>
    <a href="https://typicode.github.io/husky/" target="_blank"><img src="/public/img/technologies/husky.svg" height="35" width="35" alt="Husky" /></a>
</div>

<hr><br></details>

<details><summary> <h2> &nbsp; <img src="/public/img/technologies/github.svg" width="20"> &nbsp; Contribute </h2> </summary> <br>

Before contributing, please take a moment to read our [CONTRIBUTING.md](./CONTRIBUTING.md). <br>
Feel free to check [Issues](https://github.com/Nucleify/Nucleify/issues) section. <br>
Your skills and expertise will directly contribute to the success of our project, helping us achieve our goals and create an attractive product.

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

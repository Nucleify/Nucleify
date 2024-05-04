# DataManager <div> ![PHP](https://img.shields.io/badge/PHP-%234F5B93.svg?style=for-the-badge&logo=php&logoColor=white&style=plastic) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&style=plastic) ![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white&style=plastic) ![Vue.js](https://img.shields.io/badge/Vue.js-%234FC08D.svg?style=for-the-badge&logo=vue.js&logoColor=white&style=plastic) [![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) </div>



This website helps to storage various data types and share it with others. My target is to create fully responsive, functional and scalable website based on [RWD](https://en.wikipedia.org/wiki/Responsive_web_design), [MFD](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [FDD](https://en.wikipedia.org/wiki/Feature-driven_development) principles.

[Preview!](http://datamanager.szymco.de)


<br>
<details><summary>  🛠️ Installation & Setup  </summary>

<br>

<details><summary> &nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png" height=20/> &nbsp;Standard </summary> 

- First make sure u have installed latest versions of [PHP](https://www.php.net), [Laravel](https://laravel.com/), [Vue.js](https://vuejs.org/), [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com), [XAMPP](https://www.apachefriends.org/pl/index.html) and [Composer](https://getcomposer.org/)

- I recommend use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) for install latest supported versions of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com), 

```
nvm use --lts
```

- Clone this repository

```
git clone https://github.com/SzymCode/DataManager.git
```

- Install modules in root directory

```bash
npm install
composer update
```

### **Make sure u have installed all modules!**

- Change *.env.example* file to *.env* in root directory, run XAMPP mysql server and create database
```bash
mysql -u root -p
create database datamanager
create database datamanager_test    # it's not necessary, only for tests
```

- Migrate and seed database
```bash
php artisan migrate:fresh --seed
```

<br>
</details>

<details><summary> &nbsp;<img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" height=20/> &nbsp;Docker </summary> 

- First make sure u have installed latest versions of [PHP](https://www.php.net), [Laravel](https://laravel.com/), [Vue.js](https://vuejs.org/), [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com), [Composer](https://getcomposer.org/) and [Docker](https://www.docker.com)

- I recommend use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) for install latest supported versions of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com), 

```
nvm use --lts
```

- Clone this repository

```
git clone https://github.com/SzymCode/DataManager.git
```

- Install modules in root directory

```bash
composer update
php artisan sail:install
```

### **Make sure u have installed all modules!**

- Change .env.example file to .env in root directory
</details>
<hr>
</details>


<details><summary> 🚀 Run </summary>

<br>

<details><summary> &nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png" height=20/> &nbsp;XAMPP </summary> 
<br>

- root directory:

```bash
npm run dev
php artisan serve
```

<br>
</details>


<details><summary> &nbsp;<img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" height=20/> &nbsp;Docker </summary> 
<br>

**Remember to shutdown all XAMPP processes!**
- root directory:

```bash
sail up -d    # run containers in background

sail exec laravel.test bash    # this command open sail container's bash, then run command bellow
npm run dev
```

Possible problem: 
- Sail: no such file or directory found: [Solution 1](https://laravel.com/docs/10.x/sail#configuring-a-shell-alias), [Solution 2](https://stackoverflow.com/questions/71503871/laravel-error-laravel-sail-no-such-file-or-directory-found)
</details>

<hr>
</details>  



<details><summary> ❓ Usage </summary>
<br>

<details><summary> Factories </summary>
<br>

```bash
php artisan tinker

# if you wish, you can specify count in factory() or attributes in create()
Article::factory(100)->create();
Contact::factory(100)->create();
User::factory(100)->create();

# for Spatie Activity model
Database\Factories\ActivityFactory::new()->count(100)->create();
```

<br/>
</details>

<details><summary> Tests </summary>
<br>

Backend tests:
```bash
# run all tests
./vendor/bin/pest

# or specify group
./vendor/bin/pest --group=api

# defined tests groups:
api, article-api, contact-api, user-api, feature, global, unit, controllers, database, factories, migrations, models
```

![Tests](https://github.com/SzymCode/DataManager/assets/107359025/a661bbde-cd4c-485e-8197-60c055a11cdc)



<br>

Frontend tests:
```bash
npm run open  # after this command cypress window will open automatically 
```

<br>
</details>

<details><summary> npm </summary>
<br>

1. Vite build:

```
npm run build
```

2. Eslint fix:

```
npm run lint
```

3. Run prettier:

```
npm run write
```

</details>

<hr/>
</details>

<details><summary> 🖼️ Preview Images </summary>
<br>

![desktop-preview](https://github.com/SzymCode/DataManager/assets/107359025/ddc78456-c5fd-4ec1-af24-80270c805b56)

![tablet-preview](https://github.com/SzymCode/DataManager/assets/107359025/fdc075ff-b7f4-44a2-9b72-c262809e18d7)

![phone-preview](https://github.com/SzymCode/DataManager/assets/107359025/405e7a85-b4e8-42b7-84ec-b24db5a7a1ba)
</details>

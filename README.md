

# <div align="center"> <img src="https://github.com/SzymCode/DataManager/assets/107359025/7a309f2a-fb1d-408a-8985-5bac01796411" width="100" height="100" > <br> DataManager <br> </div> <br> <div align="center"> ![PHP](https://img.shields.io/badge/PHP-%234F5B93.svg?style=for-the-badge&logo=php&logoColor=white&style=plastic) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&style=plastic) ![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white&style=plastic) ![Vue.js](https://img.shields.io/badge/Vue.js-%234FC08D.svg?style=for-the-badge&logo=vue.js&logoColor=white&style=plastic) [![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) </div>

This website helps to storage various data types and share it with others. My target is to create fully responsive, functional and scalable [ERP](https://en.wikipedia.org/wiki/Enterprise_resource_planning)-like website based on [RWD](https://en.wikipedia.org/wiki/Responsive_web_design), [MFD](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [FDD](https://en.wikipedia.org/wiki/Feature-driven_development) principles. Serves as my coding sandbox, where I can experiment with different coding techniques, implement new features, and refine my skills. 

<b>Join my project and become part of building something incredible!</b>

<br><a href="https://data-manager.szymco.de"><img src="https://github.com/SzymCode/DataManager/assets/107359025/37ef47ba-f205-4ac0-8912-a3409930d9ac"> Live preview</a><br><br>

<details><summary> <h2> &nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png" height=25/> &nbsp;XAMPP </h2> </summary> <br>
<details><summary> 🛠️ Installation </summary>

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

Backend tests:
```bash
# run all tests
./vendor/bin/pest

# or specify group
./vendor/bin/pest --group=api

# defined tests groups:
api, article-api, contact-api, user-api, feature, global, unit, controllers, services, database, factories, migrations, models
```

![Tests](https://github.com/SzymCode/DataManager/assets/107359025/a661bbde-cd4c-485e-8197-60c055a11cdc)

Frontend tests:
```bash
npm run open  # after this command cypress window will open automatically 
```

<br></details>

<details><summary> npm </summary><br>

1. Npm clean install - ```npm ci```
4. Vite build - ```npm run build```
5. Eslint fix - ```npm run lint```
6. Run prettier - ```npm run write```
7. Husky install - ```npm run prepare```


</details></details><hr><br></details></details>




<details><summary> <h2> &nbsp;<img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" height=25/> &nbsp;Docker </h2> </summary> <br>
<details><summary> 🛠️ Installation </summary>

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

<br></details>

<details><summary> 🚀 Run </summary> <br>

Root directory:

```bash
# run Docker containers in the background
sail start

# run command inside laravel.test container bash
sail npm run dev
```

**Remember to shutdown all XAMPP processes!**

Possible problems: 
- Sail: no such file or directory found: [Solution 1](https://laravel.com/docs/10.x/sail#configuring-a-shell-alias), [Solution 2](https://stackoverflow.com/questions/71503871/laravel-error-laravel-sail-no-such-file-or-directory-found)
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

Backend tests:
```bash
# run all tests
sail pest

# or specify group
sail pest --group=api

# defined tests groups:
api, article-api, contact-api, user-api, feature, global, unit, controllers, database, factories, migrations, models
```

![Tests](https://github.com/SzymCode/DataManager/assets/107359025/a661bbde-cd4c-485e-8197-60c055a11cdc)

Frontend tests:
```bash
sail npm run open  # after this command cypress window will open automatically 
```

<br></details>

<details><summary> npm </summary><br>

1. Npm clean install - ```sail npm ci```
4. Vite build - ```sail npm run build```
5. Eslint fix - ```sail npm run lint```
6. Run prettier - ```sail npm run write```
7. Husky install - ```sail npm run prepare```

</details></details><hr><br></details></details>


<details><summary> <h2> &nbsp; <img src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-823jqxdr.png" width="20"> &nbsp; Contribute </h2> </summary> <br>

Feel free to check open [issues](https://github.com/SzymCode/DataManager/issues) or create new ones. <br>
Your skills and expertise will directly contribute to the success of our project, helping us achieve our goals and create an attractive portfolio.

</details>

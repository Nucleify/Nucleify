

# ContactBook <div> ![PHP](https://img.shields.io/badge/PHP-%234F5B93.svg?style=for-the-badge&logo=php&logoColor=white&style=plastic) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&style=plastic) ![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white&style=plastic) ![Vue.js](https://img.shields.io/badge/Vue.js-%234FC08D.svg?style=for-the-badge&logo=vue.js&logoColor=white&style=plastic) [![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/) </div>



This website helps to storage contacts data and share it with others. It's second version of my [project](https://github.com/SzymCode/ContactBook-sandbox), now with completely other tech stack. My target is to create fully responsive, functional and scalable website based on [RWD](https://en.wikipedia.org/wiki/Responsive_web_design), [MFD](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [FDD](https://en.wikipedia.org/wiki/Feature-driven_development) principles.

[Preview!](https://contactbook-sc-0dd9929a94e1.herokuapp.com)


<br>
<details><summary>  🛠️ Installation & Setup  </summary>

<br>

<details><summary> &nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/XAMPP_Logo.png" height=20/> &nbsp;Standard </summary> 

- First make sure u have installed latest versions of [Laravel](https://laravel.com/), [Vue.js](https://vuejs.org/), [XAMPP](https://www.apachefriends.org/pl/index.html) and [Composer](https://getcomposer.org/)

- Clone this repository

```
git clone https://github.com/SzymCode/ContactBook.git
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
create database contactbook
create database contactbook_test    # it's not necessary, only for tests
```

- Migrate and seed database
```bash
php artisan migrate:fresh --seed
```

<br>
</details>

<details><summary> &nbsp;<img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" height=20/> &nbsp;Docker </summary> 

- First make sure u have installed latest versions of [Laravel](https://laravel.com/), [Vue.js](https://vuejs.org/), and [Composer](https://getcomposer.org/)

- Clone this repository

```
git clone https://github.com/SzymCode/ContactBook.git
```

- Install modules in root directory

```bash
composer update
php artisan sail:install
```

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
./vendor/bin/sail up -d    # run containers in background

docker compose exec laravel.test bash    # this command open sail container's bash, then run command bellow
npm run dev
```

Possible problem: [Sail: no such file or directory found](https://stackoverflow.com/questions/71503871/laravel-error-laravel-sail-no-such-file-or-directory-found)
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
Contact::factory(100)->create(); 
User::factory(100)->create();        
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
./vendor/bin/pest --group=user-api

# defined tests groups:
user-api, contact-api, feature, global, unit, controllers, database, factories, migrations, models
```

![Tests](https://github.com/SzymCode/ContactBook/assets/107359025/ea49e771-9963-4cb8-b103-7e2a0c91c6b7)

<br>

Frontend tests:
```bash
npm run open  # after this command cypress window will open automatically 
```

<br/>
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

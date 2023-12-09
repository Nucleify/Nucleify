<div align="center">

![PHP](https://img.shields.io/badge/PHP-%234F5B93.svg?style=for-the-badge&logo=php&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)\
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![Vue.js](https://img.shields.io/badge/vue.js-%234FC08D.svg?style=for-the-badge&logo=vue.js&logoColor=white)

</div>

# ContactBook

This website helps to storage contacts data and share it with others. It's second version of my [project](https://github.com/SzymCode/ContactBook-sandbox), now with completely other tech stack. My target is to create fully responsive, functional and scalable website based on [RWD](https://en.wikipedia.org/wiki/Responsive_web_design), [MFD](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [FDD](https://en.wikipedia.org/wiki/Feature-driven_development) principles.


<details><summary> <h2>  🛠️ Installation & Setup  </summary>

- First make sure u have installed latest versions of [Laravel](https://laravel.com/), [Vue.js](https://vuejs.org/), [XAMPP](https://www.apachefriends.org/pl/index.html) and [Composer](https://getcomposer.org/).

- Clone this repository.

```
git clone https://github.com/SzymCode/ContactBook.git
```

- Install modules in root directory.

```bash
npm install
composer update
```

### **Make sure u have installed all modules!**

- Change *.env.example* file to *.env* in root directory, run XAMPP mysql server and create database.
```bash
mysql -u root -p
create database contactbook
create database contactbook_test    # it's not necessary, only for tests
```

- Migrate and seed database.
```bash
php artisan migrate:fresh --seed
```

<br/>
</details>


<details><summary> <h2>  🚀 Run  </summary>
<br/>

- root directory:

```bash
npm run dev
php artisan serve
```

<br/>
</details>  



<details><summary> <h2>  ❓ Usage  </summary>

<details><summary> <h3> Factories </summary>

```bash
php artisan tinker

# if you wish, you can specify count in factory() or attributes in create()
Contact::factory(100)->create(); 
User::factory(100)->create();        
```

</details>

<details><summary> <h3> Tests </summary>

```bash
# run all tests
./vendor/bin/pest

# or specify group
./vendor/bin/pest --group=user-api

# defined tests groups:
user-api, contact-api, feature, global, unit, controllers, database, factories, migrations, models
```

![Tests](https://github.com/SzymCode/ContactBook/assets/107359025/ea49e771-9963-4cb8-b103-7e2a0c91c6b7)

</details>

<details><summary> <h3> npm </summary>

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

<br/>
</details>

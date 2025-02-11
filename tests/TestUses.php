<?php

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

if (env('DB_DATABASE') === 'database/database.sqlite') {
    uses(Tests\TestCase::class)
        ->beforeEach(function () {
            $this->artisan('migrate:fresh');
        })
        ->in('Feature', 'Database', 'Global');
} else {
    uses(
        Tests\TestCase::class,
    )
        ->in('Feature', 'Database');
    uses(
        RefreshDatabase::class
    )
        ->in(
        // Activity API
            'Feature/Api/Activity/HTTP401Test.php',

            // Article API
            'Feature/Api/Article/HTTP302Test.php',
            'Feature/Api/Article/HTTP422PutTest.php',

            // Artisan API
            'Feature/Api/Artisan/HTTP405AuthTest.php',
            'Feature/Api/Artisan/HTTP405UnAuthTest.php',

            // Contact API
            'Feature/Api/Contact/HTTP302Test.php',
            'Feature/Api/Contact/HTTP422PostTest.php',
            'Feature/Api/Contact/HTTP422PutTest.php',

            // Money API
            'Feature/Api/Money/HTTP302Test.php',
            'Feature/Api/Money/HTTP422PostTest.php',
            'Feature/Api/Money/HTTP422PutTest.php',

            // User API
            'Feature/Api/User/HTTP302Test.php',
            'Feature/Api/User/HTTP422PostTest.php',
            'Feature/Api/User/HTTP422PutTest.php',

            // Question API
            'Feature/Api/Question/HTTP302Test.php',

            // Sitemap API
            'Feature/Api/Sitemap',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
        // Activity API
            'Feature/Api/Activity/HTTP200Test.php',

            // Article API
            'Feature/Api/Article/HTTP200Test.php',
            'Feature/Api/Article/HTTP422PostTest.php',
            'Feature/Api/Article/HTTP500Test.php',

            // Artisan API
            'Feature/Api/Artisan/HTTP200Test.php',
            'Feature/Api/Artisan/HTTP500Test.php',

            // Contact API
            'Feature/Api/Contact/HTTP200Test.php',
            'Feature/Api/Contact/HTTP500Test.php',

            // Money API
            'Feature/Api/Money/HTTP200Test.php',
            'Feature/Api/Money/HTTP500Test.php',

            // User API
            'Feature/Api/User/HTTP200Test.php',
            'Feature/Api/User/HTTP500Test.php',

            // Question API
            'Feature/Api/Question/HTTP200Test.php',
            'Feature/Api/Question/HTTP500Test.php',
            'Feature/Api/Question/HTTP422PostTest.php',
            'Feature/Api/Question/HTTP422PutTest.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services'
        );
}

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
            'Feature/Api/Utilities/Activity/HTTP401Test.php',

            // Article API
            'Feature/Api/Entities/Article/HTTP302Test.php',
            'Feature/Api/Entities/Article/HTTP422PutTest.php',

            // Artisan API
            'Feature/Api/Utilities/Artisan/HTTP405AuthTest.php',
            'Feature/Api/Utilities/Artisan/HTTP405UnAuthTest.php',

            // Contact API
            'Feature/Api/Entities/Contact/HTTP302Test.php',
            'Feature/Api/Entities/Contact/HTTP422PostTest.php',
            'Feature/Api/Entities/Contact/HTTP422PutTest.php',

            // Money API
            'Feature/Api/Entities/Money/HTTP302Test.php',
            'Feature/Api/Entities/Money/HTTP422PostTest.php',
            'Feature/Api/Entities/Money/HTTP422PutTest.php',

            // User API
            'Feature/Api/Entities/User/HTTP302Test.php',
            'Feature/Api/Entities/User/HTTP422PostTest.php',
            'Feature/Api/Entities/User/HTTP422PutTest.php',

            // Question API
            'Feature/Api/Structural/Question/HTTP302Test.php',

            // Sitemap API
            'Feature/Api/Utilities/Sitemap',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
        // Activity API
            'Feature/Api/Utilities/Activity/HTTP200Test.php',

            // Article API
            'Feature/Api/Entities/Article/HTTP200Test.php',
            'Feature/Api/Entities/Article/HTTP422PostTest.php',
            'Feature/Api/Entities/Article/HTTP500Test.php',

            // Artisan API
            'Feature/Api/Utilities/Artisan/HTTP200Test.php',
            'Feature/Api/Utilities/Artisan/HTTP500Test.php',

            // Contact API
            'Feature/Api/Entities/Contact/HTTP200Test.php',
            'Feature/Api/Entities/Contact/HTTP500Test.php',

            // Money API
            'Feature/Api/Entities/Money/HTTP200Test.php',
            'Feature/Api/Entities/Money/HTTP500Test.php',

            // User API
            'Feature/Api/Entities/User/HTTP200Test.php',
            'Feature/Api/Entities/User/HTTP500Test.php',

            // Question API
            'Feature/Api/Structural/Question/HTTP200Test.php',
            'Feature/Api/Structural/Question/HTTP500Test.php',
            'Feature/Api/Structural/Question/HTTP422PostTest.php',
            'Feature/Api/Structural/Question/HTTP422PutTest.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
            'Feature/Traits'
        );
}

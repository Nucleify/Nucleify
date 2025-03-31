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

            // Artisan API
            'Feature/Api/Utilities/Artisan/HTTP405AuthTest.php',
            'Feature/Api/Utilities/Artisan/HTTP405UnAuthTest.php',

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

            // Artisan API
            'Feature/Api/Utilities/Artisan/HTTP200Test.php',
            'Feature/Api/Utilities/Artisan/HTTP500Test.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
            'Feature/Traits'
        );
}

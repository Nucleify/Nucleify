<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

if (env('DB_DATABASE') === 'database/database.sqlite') {
    uses(Tests\TestCase::class)
        ->beforeEach(function (): void {
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
            // Article API
            'Feature/Api/Article/HTTP302Test.php',
            'Feature/Api/Article/HTTP422PutTest.php',

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

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            // Article API
            'Feature/Api/Article/HTTP200Test.php',
            'Feature/Api/Article/HTTP422PostTest.php',
            'Feature/Api/Article/HTTP500Test.php',

            // Contact API
            'Feature/Api/Contact/HTTP200Test.php',
            'Feature/Api/Contact/HTTP500Test.php',

            // Money API
            'Feature/Api/Money/HTTP200Test.php',
            'Feature/Api/Money/HTTP500Test.php',

            // User API
            'Feature/Api/User/HTTP200Test.php',
            'Feature/Api/User/HTTP500Test.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
            'Feature/Traits'
        );
}

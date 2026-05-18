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
            // Question API
            'Feature/Api/Question/HTTP302Test.php',

            // Technology API
            'Feature/Api/Technology/HTTP302Test.php',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            // Question API
            'Feature/Api/Question/HTTP200Test.php',
            'Feature/Api/Question/HTTP500Test.php',
            'Feature/Api/Question/HTTP422PostTest.php',
            'Feature/Api/Question/HTTP422PutTest.php',

            // Technology API
            'Feature/Api/Technology/HTTP200Test.php',
            'Feature/Api/Technology/HTTP500Test.php',
            'Feature/Api/Technology/HTTP422PostTest.php',
            'Feature/Api/Technology/HTTP422PutTest.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
            'Feature/Traits'
        );
}

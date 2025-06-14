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
            // Card API
            'Feature/Api/Card/HTTP302Test.php',

            // Color API
            'Feature/Api/Color/HTTP302Test.php',

            // Feature API
            'Feature/Api/Feature/HTTP302Test.php',

            // Question API
            'Feature/Api/Question/HTTP302Test.php',

            // Technology API
            'Feature/Api/Technology/HTTP302Test.php',

            // Link API
            'Feature/Api/Link/HTTP302Test.php',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            // Card API
            'Feature/Api/Card/HTTP200Test.php',
            'Feature/Api/Card/HTTP500Test.php',
            'Feature/Api/Card/HTTP422PostTest.php',
            'Feature/Api/Card/HTTP422PutTest.php',

            // Color API
            'Feature/Api/Color/HTTP200Test.php',
            'Feature/Api/Color/HTTP500Test.php',
            'Feature/Api/Color/HTTP422PostTest.php',
            'Feature/Api/Color/HTTP422PutTest.php',

            // Feature API
            'Feature/Api/Feature/HTTP200Test.php',
            'Feature/Api/Feature/HTTP500Test.php',
            'Feature/Api/Feature/HTTP422PostTest.php',
            'Feature/Api/Feature/HTTP422PutTest.php',

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

            // Link API
            'Feature/Api/Link/HTTP200Test.php',
            'Feature/Api/Link/HTTP500Test.php',
            'Feature/Api/Link/HTTP422PostTest.php',
            'Feature/Api/Link/HTTP422PutTest.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
            'Feature/Traits'
        );
}

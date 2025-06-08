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
            // System Color API
            'Feature/Api/SystemColor/HTTP302Test.php',

            // User Color API
            'Feature/Api/UserColor/HTTP302Test.php',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            // System Color API
            'Feature/Api/SystemColor/HTTP200Test.php',
            'Feature/Api/SystemColor/HTTP500Test.php',
            'Feature/Api/SystemColor/HTTP422PostTest.php',
            'Feature/Api/SystemColor/HTTP422PutTest.php',

            // User Color API
            'Feature/Api/UserColor/HTTP200Test.php',
            'Feature/Api/UserColor/HTTP500Test.php',
            'Feature/Api/UserColor/HTTP422PostTest.php',
            'Feature/Api/UserColor/HTTP422PutTest.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
        );
}

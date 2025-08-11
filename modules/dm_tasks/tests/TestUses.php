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
            'Feature/Api/HTTP302Test.php',
            'Feature/Api/HTTP422PostTest.php',
            'Feature/Api/HTTP422PutTest.php',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            'Feature/Api/HTTP200Test.php',
            'Feature/Api/HTTP500Test.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services'
        );
}

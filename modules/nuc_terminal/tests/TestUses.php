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
            // Artisan API
            'Feature/Api/Artisan/HTTP405AuthTest.php',
            'Feature/Api/Artisan/HTTP405UnAuthTest.php',
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            // Artisan API
            'Feature/Api/Artisan/HTTP200Test.php',
            'Feature/Api/Artisan/HTTP500Test.php',

            'Feature/Controllers',
        );
}

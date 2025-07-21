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
            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            // Upload API
            'Feature/Api/Upload/Http200Test.php',
            'Feature/Api/Upload/Http422Test.php',

            // Zip API
            'Feature/Api/Zip/Http200Test.php',
            'Feature/Api/Zip/Http422Test.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers'
        );
}

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
            'Feature/Api/Module/HTTP302Test.php',

            'Database/Models'
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            'Feature/Api/Module/HTTP200Test.php',
            'Feature/Api/Module/HTTP500Test.php',
            'Feature/Api/Module/HTTP422PostTest.php',
            'Feature/Api/Module/HTTP422PutTest.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers'
        );
}

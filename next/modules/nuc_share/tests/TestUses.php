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
        ->in('Feature');
} else {
    uses(
        Tests\TestCase::class,
    )
        ->in('Feature');

    uses(
        RefreshDatabase::class
    )
        ->in(
            //
        );

    uses(
        DatabaseMigrations::class
    )
        ->in(
            'Feature/Api/HTTP200Test.php',
            'Feature/Api/HTTP401Test.php',
            'Feature/Api/HTTP500Test.php',

            'Feature/Controllers',
            'Feature/Services',
        );
}

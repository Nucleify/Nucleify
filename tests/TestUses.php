<?php

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
            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
            'Feature/Traits'
        );
}

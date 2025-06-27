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
        ->in('Database', 'Feature', 'Global');
} else {
    uses(Tests\TestCase::class)
        ->in('Database', 'Feature');

    uses(RefreshDatabase::class)
        ->in(
            'Database/Models'
            , 'Database/Factories', 
        
        );

    uses(DatabaseMigrations::class)
        ->in('Database/Migrations');
}

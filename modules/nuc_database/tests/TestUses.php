<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use Illuminate\Foundation\Testing\DatabaseMigrations;

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
        DatabaseMigrations::class
    )
        ->in(
            'Feature/Services',
        );
}

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
        ->in('Feature', 'Database', 'Global', 'hooks');
} else {
    uses(
        Tests\TestCase::class,
    )
        ->in('Feature', 'Database', 'hooks');
    uses(
        RefreshDatabase::class
    )
        ->in(
            'Feature/Api/Module/HTTP302Test.php',

            'Feature/Api/ModuleInstaller/HTTP302Test.php',

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

            'Feature/Api/ModuleInstaller/HTTP200Test.php',
            'Feature/Api/ModuleInstaller/HTTP422PostTest.php',
            'Feature/Api/ModuleInstaller/HTTP500Test.php',

            'Database/Factories',
            'Database/Migrations',

            'Feature/Controllers',
            'Feature/Services',
        );
}

<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-command');

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Modules\nuc_terminal\App\Console\Commands\ArtisanCommand;

use function Pest\Laravel\artisan;

afterAll(function (): void {
    artisan('migrate:fresh');
});

test('can run artisan migrate command', function (): void {
    Artisan::call(ArtisanCommand::class, ['code' => 'Artisan::call("migrate")']);

    expect(Schema::hasTable('users'))->toBeTrue();
});

test('can run artisan migrate:fresh command', function (): void {
    Artisan::call(ArtisanCommand::class, ['code' => 'Artisan::call("migrate:fresh")']);

    expect(Schema::hasTable('users'))->toBeTrue();
});

test('can run artisan migrate:fresh --seed command', function (): void {
    Artisan::call(ArtisanCommand::class, ['code' => 'Artisan::call("migrate:fresh --seed")']);

    expect(Schema::hasTable('migrations'))->toBeTrue()
        ->and(DB::table('users')->count())->toBeGreaterThan(0);
});

test('can handle and report errors during command execution', function (): void {
    Artisan::call(ArtisanCommand::class, ['code' => 'undefinedFunction()']);

    $output = Artisan::output();

    expect($output)->toContain('Call to undefined function undefinedFunction()');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

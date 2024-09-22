<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Console\Commands\ArtisanCommand;
use function Pest\Laravel\artisan;

afterAll(function () {
    artisan('migrate:fresh');
});

it('can run artisan migrate command', function () {
    Artisan::call(ArtisanCommand::class, ['code' => 'Artisan::call("migrate")']);

    expect(Schema::hasTable('users'))->toBeTrue();
});

it('can run artisan migrate:fresh command', function () {
    Artisan::call(ArtisanCommand::class, ['code' => 'Artisan::call("migrate:fresh")']);

    expect(Schema::hasTable('users'))->toBeTrue();
});

it('can run artisan migrate:fresh --seed command', function () {
    Artisan::call(ArtisanCommand::class, ['code' => 'Artisan::call("migrate:fresh --seed")']);

    expect(Schema::hasTable('migrations'))->toBeTrue()
        ->and(DB::table('users')->count())->toBeGreaterThan(0);
});

it('can handle and report errors during command execution', function () {
    Artisan::call(ArtisanCommand::class, ['code' => 'undefinedFunction()']);

    $output = Artisan::output();

    expect($output)->toContain('Call to undefined function undefinedFunction()');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

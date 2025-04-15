<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use function Pest\Laravel\get;

it('renders an existing view', function (): void {
    $viewDir = base_path('modules/dm_pages/views');
    $viewPath = "$viewDir/home.blade.php";

    File::ensureDirectoryExists($viewDir);
    View::addLocation($viewDir);

    get('/home')->assertOk();
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it('returns 404 for a non-existing view', function (): void {
    $response = get('/page/non-existent-view');

    $response->assertNotFound();
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

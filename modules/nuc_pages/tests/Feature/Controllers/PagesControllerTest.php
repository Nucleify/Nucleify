<?php

if (!defined('PEST_RUNNING')) {
    return;
}

// use function Pest\Laravel\get;

// Tests commented out because they are for Blade views, which we don't use in the project anymore, but may be useful in the future.
// it('renders an existing view', function (): void {
//     $viewDir = base_path('modules/nuc_pages/views');
//     $viewPath = "$viewDir/home.blade.php";

//     File::ensureDirectoryExists($viewDir);
//     View::addLocation($viewDir);

//     get('/home')->assertOk();
// });

// it('returns 404 for a non-existing view', function (): void {
//     $response = get('/page/non-existent-view');

//     $response->assertNotFound();
// });

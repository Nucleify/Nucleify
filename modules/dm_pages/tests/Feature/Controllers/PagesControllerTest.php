<?php if (!defined('PEST_RUNNING')) return; 


use function Pest\Laravel\get;

it('renders an existing view', function () {
    $viewDir = base_path('modules/dm_pages/views');
    $viewPath = "$viewDir/home.blade.php";

    File::ensureDirectoryExists($viewDir);
    View::addLocation($viewDir);

    get('/home')->assertOk();
});

it('returns 404 for a non-existing view', function () {
    $response = get('/page/non-existent-view');
    
    $response->assertNotFound();
});

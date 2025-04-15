<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\ArtisanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ArtisanController::class);
});

test('tinker command activity log factory > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute ActivityFactory::new()->count(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ]);
});

test('tinker command article factory > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute Article::factory(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ]);
});

test('tinker command contact factory > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute Contact::factory(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ]);
});

test('tinker command user factory > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute User::factory(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ]);
});

test('migrate:rollback command > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate:rollback']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ])
        ->and(Schema::hasTable('users'))->toBeFalse();
});

test('migrate command > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ])
        ->and(Schema::hasTable('users'))->toBeTrue();
});

test('migrate:fresh command > success', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate:fresh']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0,
        ])
        ->and(Schema::hasTable('users'))->toBeTrue();
});

it('handles exception when running migrate:rollback command', function (): void {
    $request = Request::create('/artisan', 'POST', ['command' => 'invalid']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(500)
        ->and($responseData)->toMatchArray([
            'error' => 'The command "invalid" does not exist.',
        ]);
});

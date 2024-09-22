<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ArtisanController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ArtisanController::class);
});

it('runs tinker command activity log factory successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute ActivityFactory::new()->count(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ]);
});

it('runs tinker command article factory successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute Article::factory(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ]);
});

it('runs tinker command contact factory successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute Contact::factory(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ]);
});

it('runs tinker command user factory successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'tinker --execute User::factory(100)->create()']);
    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ]);
});

it('runs migrate:rollback command successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate:rollback']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ])
        ->and(Schema::hasTable('users'))->toBeFalse();
});

it('runs migrate command successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ])
        ->and(Schema::hasTable('users'))->toBeTrue();
});

it('runs migrate:fresh command successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate:fresh']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ])
        ->and(Schema::hasTable('users'))->toBeTrue();
});

it('runs migrate:fresh --seed command successfully', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'migrate:fresh --seed']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(200)
        ->and($responseData)->toMatchArray([
            'exit_code' => 0
        ])
        ->and(Schema::hasTable('users'))->toBeTrue();
});


it('handles exception when running migrate:rollback command', function () {
    $request = Request::create('/artisan', 'POST', ['command' => 'invalid']);

    $response = $this->controller->run($request);

    $responseData = $response->getData(true);

    expect($response->status())->toBe(500)
        ->and($responseData)->toMatchArray([
            'error' => 'The command "invalid" does not exist.'
        ]);
});

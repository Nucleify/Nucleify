<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\UserController;
use App\Http\Requests\User\PostRequest;
use App\Http\Requests\User\PutRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(UserController::class, ['userService' => app()->make(UserService::class)]);
});

test('index > success', function (): void {
    $response = $this->controller->index();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('countByCreatedLastWeek > success', function (): void {
    $request = new Request;

    $response = $this->controller->countByCreatedLastWeek($request);

    expect($response->getStatusCode())->toEqual(200);
});

test('show > success', function (): void {
    $user = User::factory()->create();

    $response = $this->controller->show($user->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(userData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $user = User::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedUserData);

    $response = $this->controller->update($request, $user->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $user = User::factory()->create();

    $response = $this->controller->destroy($user->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

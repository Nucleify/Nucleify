<?php

use App\Http\Controllers\Auth\UserController;
use App\Http\Requests\User\PostRequest;
use App\Http\Requests\User\PutRequest;
use App\Models\User;
use App\Services\UserService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(UserController::class, ['userService' => app()->make(UserService::class)]);
});

it('runs index method successfully', function () {
    $response = $this->controller->index();

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toHaveCount(2);
});

it('runs show method successfully', function () {
    $user = User::factory()->create();

    $response = $this->controller->show($user->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs store method successfully', function () {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(userData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs update method successfully', function () {
    $user = User::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedUserData);

    $response = $this->controller->update($request, $user->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs delete method successfully', function () {
    $user = User::factory()->create();

    $response = $this->controller->destroy($user->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

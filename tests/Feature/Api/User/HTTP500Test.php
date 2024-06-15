<?php

use function Pest\Laravel\mock;

use App\Models\User;
use App\Services\UserService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(UserService::class);
});

describe('500', function() {
    it('index api', function () {
        $this->service
            ->shouldReceive('getAll')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('users.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    it('show api', function () {
        $this->service
            ->shouldReceive('getById')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('users.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    it('store api', function () {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('users.store'), userData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    it('update api', function () {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('users.update', userData['id']), updatedUserData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    it('destroy api', function () {
        $user = User::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('users.destroy', ['id' => $user->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});

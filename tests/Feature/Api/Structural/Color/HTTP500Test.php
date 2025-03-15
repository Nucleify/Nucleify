<?php

use App\Models\Structural\Color;
use App\Services\Structural\ColorService;
use function Pest\Laravel\mock;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(ColorService::class);
});

describe('500 > Internal Server Error', function() {
    test('index api', function () {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('colors.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function () {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('colors.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function () {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('colors.store'), colorData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function () {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('colors.update', colorData['id']), updatedColorData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function () {
        $color = Color::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('colors.destroy', ['id' => $color->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});

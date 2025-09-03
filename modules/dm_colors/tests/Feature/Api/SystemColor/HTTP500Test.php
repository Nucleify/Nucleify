<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-500');
uses()->group('api-500');

use App\Models\SystemColor;
use App\Services\SystemColorService;

use function Pest\Laravel\mock;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(SystemColorService::class);
});

describe('500', function (): void {
    test('index api', function (): void {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->getJson(route('system-colors.index'))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function (): void {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->getJson(route('system-colors.show', ['id' => 1]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function (): void {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->postJson(route('system-colors.store'), systemColorData)
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function (): void {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->putJson(route('system-colors.update', systemColorData['id']), updatedSystemColorData)
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function (): void {
        $model = SystemColor::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->deleteJson(route('system-colors.destroy', ['id' => $model->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});

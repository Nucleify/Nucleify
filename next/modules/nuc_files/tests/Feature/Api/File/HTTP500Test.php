<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;
use App\Services\FileService;

use function Pest\Laravel\mock;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(FileService::class);
});

describe('500', function (): void {
    test('index api', function (): void {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->getJson(route('files.index'))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function (): void {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->getJson(route('files.show', ['id' => 1]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('edit api', function (): void {
        $model = File::factory()->create();

        $this->service
            ->shouldReceive('edit')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->putJson(route('files.edit', ['id' => $model->id]), ['path' => 'newName'])
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function (): void {
        $model = File::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $this->deleteJson(route('files.destroy', ['id' => $model->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});

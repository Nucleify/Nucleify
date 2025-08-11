<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\File;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = File::factory()->create();

    $this->assertDatabaseCount('files', 1)
        ->assertDatabaseHas('files', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = File::factory()->count(3)->create();

    $this->assertDatabaseCount('files', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('files', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        File::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');

test('can\'t create multiple records', function (): void {
    try {
        File::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }
    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');

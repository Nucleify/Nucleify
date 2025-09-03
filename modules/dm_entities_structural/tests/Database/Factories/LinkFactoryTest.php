<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('link-factory');

use App\Models\Link;

test('can create record', function (): void {
    $model = Link::factory()->create();

    $this->assertDatabaseCount('links', 1)
        ->assertDatabaseHas('links', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Link::factory()->count(3)->create();

    $this->assertDatabaseCount('links', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('links', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Link::factory()->create(['category' => null]);
    } catch (Exception $e) {
        $this->assertNotEmpty($e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        Link::factory()->count(2)->create(['category' => null]);
    } catch (Exception $e) {
        $this->assertNotEmpty($e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

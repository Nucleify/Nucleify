<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-color-factory');

use App\Models\UserColor;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = UserColor::factory()->create();

    $this->assertDatabaseCount('user_colors', 1)
        ->assertDatabaseHas('user_colors', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = UserColor::factory()->count(3)->create();

    $this->assertDatabaseCount('user_colors', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('user_colors', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        UserColor::factory()->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        UserColor::factory()->count(2)->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

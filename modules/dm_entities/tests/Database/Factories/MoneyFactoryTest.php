<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-factory');

use App\Models\Money;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Money::factory()->create();

    $this->assertDatabaseCount('money', 1)
        ->assertDatabaseHas('money', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Money::factory()->count(3)->create();

    $this->assertDatabaseCount('money', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('money', ['id' => $model->id]);
    }
});

test('cant\'t create record', function (): void {
    try {
        Money::factory()->create(['count' => 'invalid_count']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('cant\'t create multiple records', function (): void {
    try {
        Money::factory()->count(2)->create(['count' => 'invalid_count']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

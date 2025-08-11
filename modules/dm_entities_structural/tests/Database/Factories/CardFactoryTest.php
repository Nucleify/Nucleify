<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-factory');

use App\Models\Card;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Card::factory()->create();

    $this->assertDatabaseCount('cards', 1)
        ->assertDatabaseHas('cards', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Card::factory()->count(3)->create();

    $this->assertDatabaseCount('cards', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('cards', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Card::factory()->create(['display' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        Card::factory()->count(2)->create(['display' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

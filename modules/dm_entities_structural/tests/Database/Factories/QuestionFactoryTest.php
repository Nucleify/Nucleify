<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-factory');

use App\Models\Question;

beforeEach(function (): void {
    $this->createUsers();
});

test('can create record', function (): void {
    $model = Question::factory()->create();

    $this->assertDatabaseCount('questions', 1)
        ->assertDatabaseHas('questions', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = Question::factory()->count(3)->create();

    $this->assertDatabaseCount('questions', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('questions', ['id' => $model->id]);
    }
});

test('can\'t create record', function (): void {
    try {
        Question::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

test('can\'t create multiple records', function (): void {
    try {
        Question::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

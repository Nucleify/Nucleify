<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Question;

beforeEach(function (): void {
    $this->createUsers();
});

it('can create record', function (): void {
    $question = Question::factory()->create();

    $this->assertDatabaseCount('questions', 1);
    $this->assertDatabaseHas('questions', ['id' => $question->id]);
});

it('can create multiple records', function (): void {
    $questions = Question::factory()->count(3)->create();

    $this->assertDatabaseCount('questions', 3);
    foreach ($questions as $question) {
        $this->assertDatabaseHas('questions', ['id' => $question->id]);
    }
});

it("can't create record", function (): void {
    try {
        Question::factory()->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it("can't create multiple records", function (): void {
    try {
        Question::factory()->count(2)->create(['id' => 'id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());

        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

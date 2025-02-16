<?php

use App\Models\Question;

beforeEach(function () {
    $this->createUsers();
});

it('can create record', function () {
    $question = Question::factory()->create();

    $this->assertDatabaseCount('questions', 1);
    $this->assertDatabaseHas('questions', ['id' => $question->id]);
});

it('can create multiple records', function () {
    $questions = Question::factory()->count(3)->create();

    $this->assertDatabaseCount('questions', 3);
    foreach ($questions as $question) {
        $this->assertDatabaseHas('questions', ['id' => $question->id]);
    }
});

it("can't create record", function () {
    try {
        Question::factory()->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

it("can't create multiple records", function () {
    try {
        Question::factory()->count(2)->create(['user_id' => 'user_id']);
    } catch (Exception $e) {
        $this->assertStringContainsString('Incorrect integer value', $e->getMessage());
        return;
    }

    $this->fail('Expected exception not thrown.');
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable'); // unavailable for git workflow tests

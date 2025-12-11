<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-api-200');
uses()->group('api-200');

use App\Models\Question;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        Question::factory(3)->create();

        $this->getJson(route('questions.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Question::factory(3)->create();

        $this->getJson(route('questions.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function (): void {
        Question::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('questions.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('getSiteQuestions api', function (): void {
        Question::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('questions.getSiteQuestions', ['site' => 'technology']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('questions.store'), questionData)
            ->assertOk();
    });

    test('show api', function (): void {
        $model = Question::factory()->create();

        $this->getJson(route('questions.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Question::factory()->create();

        $this->putJson(route('questions.update', $model->id), updatedQuestionData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Question::factory()->create();

        $this->deleteJson(route('questions.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('questions', ['id' => $model->id]);
    });
});

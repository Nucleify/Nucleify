<?php if (!defined('PEST_RUNNING')) return; 


use function Pest\Laravel\mock;

use App\Models\Question;
use App\Services\QuestionService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(QuestionService::class);
});

describe('500 > Internal Server Error', function() {
    test('index api', function () {
        $this->service
            ->shouldReceive('index')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('questions.index'));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('show api', function () {
        $this->service
            ->shouldReceive('show')
            ->with(1)
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->getJson(route('questions.show', ['id' => 1]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('store api', function () {
        $this->service
            ->shouldReceive('create')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->postJson(route('questions.store'), questionData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('update api', function () {
        $this->service
            ->shouldReceive('update')
            ->with(1, Mockery::any())
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->putJson(route('questions.update', questionData['id']), updatedQuestionData);

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('destroy api', function () {
        $question = Question::factory()->create();

        $this->service
            ->shouldReceive('delete')
            ->once()
            ->andThrow(new Exception('Internal Server Error'));

        $response = $this->deleteJson(route('questions.destroy', ['id' => $question->id]));

        $response->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });
});

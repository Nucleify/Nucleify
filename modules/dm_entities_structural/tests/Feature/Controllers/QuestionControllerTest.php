<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\QuestionController;
use App\Http\Requests\Question\PostRequest;
use App\Http\Requests\Question\PutRequest;
use App\Models\Question;
use App\Services\QuestionService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(QuestionController::class, ['questionService' => app()->make(QuestionService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        Question::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('getByCategory method', function (): void {
        $category = 'technology';
        $categories = ['other', 'science', $category];

        foreach ($categories as $cat) {
            Question::factory()->create(['category' => $cat]);
        }

        $response = $this->controller->getByCategory($category);
        $data = $response->getData(true);

        expect($response->getStatusCode())->toEqual(200);

        foreach ($data as $question) {
            expect($question['category'])->toEqual($category);
        }

        expect(count($data))->toEqual(Question::where('category', $category)->count());
    });

    test('getSiteQuestions method', function (): void {
        $category = 'technology';
        $categories = ['other', 'science', $category];

        foreach ($categories as $cat) {
            Question::factory()->create(['category' => $cat]);
        }

        $response = $this->controller->getSiteQuestions($category);
        $data = $response->getData(true);

        expect($response->getStatusCode())->toEqual(200);

        foreach ($data as $question) {
            expect($question['category'])->toEqual($category);
        }

        expect(count($data))->toEqual(Question::where('category', $category)->count());
    });

    test('show method', function (): void {
        $question = Question::factory()->create();

        $response = $this->controller->show($question->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(questionData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('update method', function (): void {
        $question = Question::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedQuestionData);

        $response = $this->controller->update($request, $question->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('delete method', function (): void {
        $question = Question::factory()->create();

        $response = $this->controller->destroy($question->id);

        expect($response->getStatusCode())->toEqual(200);
        $this->assertDatabaseMissing('questions', ['id' => $question->id]);
    });
});

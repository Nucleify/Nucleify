<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-api-422');
uses()->group('question-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function (): void {
    apiTestArray([
        // CONTENT TESTS
        'content > empty' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['content' => '']),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field is required.']]],
        ],
        'content > integer' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['content' => 1]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field must be a string.']]],
        ],
        'content > false' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['content' => false]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field must be a string.']]],
        ],
        'content > true' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['content' => true]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field must be a string.']]],
        ],
        'content > empty array' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['content' => []]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field is required.']]],
        ],

        // ANSWER TESTS
        'answer > integer' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['answer' => 1]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field must be a string.']]],
        ],
        'answer > false' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['answer' => false]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field must be a string.']]],
        ],
        'answer > true' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['answer' => true]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field must be a string.']]],
        ],
        'answer > empty array' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['answer' => []]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'id' => 1,
            'data' => array_merge(updatedQuestionData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
    ]);
});

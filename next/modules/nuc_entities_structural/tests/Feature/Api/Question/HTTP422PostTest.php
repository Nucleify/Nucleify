<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-api-422');
uses()->group('question-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function (): void {
    apiTestArray([
        // INDEX TESTS
        'index > empty' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['index' => '']),
            'structure' => ['errors' => ['index']],
            'fragment' => ['errors' => ['index' => ['The index field is required.']]],
        ],
        'index > string' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['index' => 'index']),
            'structure' => ['errors' => ['index']],
            'fragment' => ['errors' => ['index' => ['The index field must be an integer.']]],
        ],
        'index > false' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['index' => false]),
            'structure' => ['errors' => ['index']],
            'fragment' => ['errors' => ['index' => ['The index field must be an integer.']]],
        ],
        'index > empty array' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['index' => []]),
            'structure' => ['errors' => ['index']],
            'fragment' => ['errors' => ['index' => ['The index field is required.']]],
        ],

        // CONTENT TESTS
        'content > empty' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['content' => '']),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field is required.']]],
        ],
        'content > integer' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['content' => 1]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field must be a string.']]],
        ],
        'content > false' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['content' => false]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field must be a string.']]],
        ],
        'content > true' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['content' => true]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field must be a string.']]],
        ],
        'content > empty array' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['content' => []]),
            'structure' => ['errors' => ['content']],
            'fragment' => ['errors' => ['content' => ['The content field is required.']]],
        ],

        // ANSWER TESTS
        'answer > integer' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['answer' => 1]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field must be a string.']]],
        ],
        'answer > false' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['answer' => false]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field must be a string.']]],
        ],
        'answer > true' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['answer' => true]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field must be a string.']]],
        ],
        'answer > empty array' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['answer' => []]),
            'structure' => ['errors' => ['answer']],
            'fragment' => ['errors' => ['answer' => ['The answer field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'data' => array_merge(questionData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
    ]);
});

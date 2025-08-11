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

describe('422 > POST', function ($questionData = questionData) {
    /**
     * INDEX TESTS
     */
    $questionData['index'] = '';
    test('index > empty', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['index']],
        ['errors' => [
            'index' => ['The index field is required.'],
        ]]
    ));

    $questionData['index'] = 'index';
    test('index > string', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['index']],
        ['errors' => [
            'index' => ['The index field must be an integer.'],
        ]]
    ));

    $questionData['index'] = false;
    test('index > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['index']],
        ['errors' => [
            'index' => ['The index field must be an integer.'],
        ]]
    ));

    $questionData['index'] = [];
    test('index > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['index']],
        ['errors' => [
            'index' => ['The index field is required.'],
        ]]
    ));

    $questionData['index'] = questionData['index'];

    /**
     * CONTENT TESTS
     */
    $questionData['content'] = '';
    test('content > empty', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => ['The content field is required.'],
        ]]
    ));

    $questionData['content'] = 1;
    test('content > integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ],
        ]]
    ));

    $questionData['content'] = false;
    test('content > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ],
        ]]
    ));

    $questionData['content'] = true;
    test('content > true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ],
        ]]
    ));

    $questionData['content'] = [];
    test('content > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => ['The content field is required.'],
        ]]
    ));

    $questionData['content'] = questionData['content'];

    /**
     * ANSWER TESTS
     */
    $questionData['answer'] = 1;
    test('answer > integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ],
        ]]
    ));

    $questionData['answer'] = false;
    test('answer > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ],
        ]]
    ));

    $questionData['answer'] = true;
    test('answer > true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ],
        ]]
    ));

    $questionData['answer'] = [];
    test('answer > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => ['The answer field is required.'],
        ]]
    ));

    $questionData['answer'] = questionData['answer'];

    /**
     * CATEGORY TESTS
     */
    $questionData['category'] = 1;
    test('category > integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $questionData['category'] = false;
    test('category > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $questionData['category'] = true;
    test('category > true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));

    $questionData['category'] = [];
    test('category > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.'],
        ]]
    ));
});

<?php

beforeEach(function () {
  $this->createUsers();
  $this->actingAs($this->admin);
});

describe('422 > Unprocessable Content > POST', function($questionData = questionData) {
    /**
     * CONTENT TESTS
     */
    $questionData['content'] = '';
    test('invalid content > empty', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => ['The content field is required.']
        ]]
    ));

    $questionData['content'] = 1;
    test('invalid content > integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $questionData['content'] = false;
    test('invalid content > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $questionData['content'] = true;
    test('invalid content > true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => [
                'The content field must be a string.',
            ]
        ]]
    ));

    $questionData['content'] = [];
    test('invalid content > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['content']],
        ['errors' => [
            'content' => ['The content field is required.']
        ]]
    ));

    $questionData['content'] = questionData['content']; // reset content value



    /**
     * ANSWER TESTS
     */
    $questionData['answer'] = 1;
    test('invalid answer > integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $questionData['answer'] = false;
    test('invalid answer > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $questionData['answer'] = true;
    test('invalid answer > true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => [
                'The answer field must be a string.',
            ]
        ]]
    ));

    $questionData['answer'] = [];
    test('invalid answer > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['answer']],
        ['errors' => [
            'answer' => ['The answer field is required.']
        ]]
    ));

    $questionData['answer'] = questionData['answer']; // reset answer value



    /**
     * CATEGORY TESTS
     */
    $questionData['category'] = 1;
    test('invalid category > integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = false;
    test('invalid category > false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = true;
    test('invalid category > true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [];
    test('invalid category > empty array', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));
});
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
    test('invalid content > positive integer', apiTest(
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

    $questionData['content'] = -1;
    test('invalid content > negative integer', apiTest(
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

    $questionData['content'] = [1];
    test('invalid content > array with positive integer', apiTest(
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

    $questionData['content'] = [-1];
    test('invalid content > array with negative integer', apiTest(
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

    $questionData['content'] = ['content'];
    test('invalid content > array with string', apiTest(
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

    $questionData['content'] = ['content1', 'content2'];
    test('invalid content > array with multiple different strings', apiTest(
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

    $questionData['content'] = questionData['content']; // reset content value

    /**
     * ANSWER TESTS
     */
    $questionData['answer'] = 1;
    test('invalid answer > positive integer', apiTest(
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

    $questionData['answer'] = -1;
    test('invalid answer > negative integer', apiTest(
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

    $questionData['answer'] = [1];
    test('invalid answer > array with positive integer', apiTest(
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

    $questionData['answer'] = [-1];
    test('invalid answer > array with negative integer', apiTest(
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

    $questionData['answer'] = [1, 1];
    test('invalid answer > array with multiple same positive integers', apiTest(
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

    $questionData['answer'] = [1, 2];
    test('invalid answer > array with multiple different positive integers', apiTest(
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

    $questionData['answer'] = [-1, -1];
    test('invalid answer > array with multiple same negative integers', apiTest(
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

    $questionData['answer'] = [-1, -2];
    test('invalid answer > array with multiple different negative integers', apiTest(
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

    $questionData['answer'] = ['answer'];
    test('invalid answer > array with string', apiTest(
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

    $questionData['answer'] = ['answer1', 'answer1'];
    test('invalid answer > array with multiple same strings', apiTest(
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

    $questionData['answer'] = ['answer1', 'answer2'];
    test('invalid answer > array with multiple different strings', apiTest(
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

    $questionData['answer'] = [true];
    test('invalid answer > array with true', apiTest(
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

    $questionData['answer'] = [false];
    test('invalid answer > array with false', apiTest(
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

    $questionData['answer'] = [true, true];
    test('invalid answer > array with multiple true', apiTest(
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

    $questionData['answer'] = [false, false];
    test('invalid answer > array with multiple false', apiTest(
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

    $questionData['answer'] = [true , false];
    test('invalid answer > array with true false', apiTest(
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

    $questionData['answer'] = questionData['answer']; // reset answer value

    /**
     * CATEGORY TESTS
     */
    $questionData['category'] = 1;
    test('invalid category > positive integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = -1;
    test('invalid category > negative integer', apiTest(
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

    $questionData['category'] = [1];
    test('invalid category > array with positive integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [-1];
    test('invalid category > array with negative integer', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [1, 1];
    test('invalid category > array with multiple same positive integers', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [1, 2];
    test('invalid category > array with multiple different positive integers', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [-1, -1];
    test('invalid category > array with multiple same negative integers', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [-1, -2];
    test('invalid category > array with multiple different negative integers', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = ['category'];
    test('invalid category > array with string', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = ['category1', 'category1'];
    test('invalid category > array with multiple same strings', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = ['category1', 'category2'];
    test('invalid category > array with multiple different strings', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [true];
    test('invalid category > array with true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [false];
    test('invalid category > array with false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [true, true];
    test('invalid category > array with multiple true', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [false, false];
    test('invalid category > array with multiple false', apiTest(
        'POST',
        'questions.store',
        422,
        $questionData,
        ['errors' => ['category']],
        ['errors' => [
            'category' => ['The category field must be a string.']
        ]]
    ));

    $questionData['category'] = [true , false];
    test('invalid category > array with true false', apiTest(
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
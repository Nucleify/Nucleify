<?php

describe('401 > Unauthorized', function () {
  test('index api', apiTest(
    'GET',
    'questions.index',
    401,
    null,
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('countByCreatedLastWeek api', apiTest(
    'GET',
    'questions.countByCreatedLastWeek',
    401,
    null,
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('shop api', apiTest(
    'SHOW',
    'questions.show',
    401,
    1,
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('store api with data', apiTest(
    'POST',
    'questions.store',
    401,
    questionData,
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('store api empty json', apiTest(
    'POST',
    'questions.store',
    401,
    [],
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('update api with data', apiTest(
    'PUT',
    'questions.update',
    401,
    questionData,
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('update api empty json', apiTest(
    'PUT',
    'questions.update',
    401,
    [],
    ['message'],
    ['message' => 'Unauthenticated.']
  ));

  test('destroy api', apiTest(
    'DELETE',
    'questions.destroy',
    401,
    null,
    ['message'],
    ['message' => 'Unauthenticated.']
  ));
});

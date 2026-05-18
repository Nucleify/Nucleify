<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-api-401');
uses()->group('api-401');

describe('401', function (): void {
    apiTestArray([
        'index api' => [
            'method' => 'GET',
            'route' => 'questions.index',
            'status' => 401,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'countByCreatedLastWeek api' => [
            'method' => 'GET',
            'route' => 'questions.countByCreatedLastWeek',
            'status' => 401,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'show api' => [
            'method' => 'SHOW',
            'route' => 'questions.show',
            'status' => 401,
            'id' => 1,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'store api with data' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'status' => 401,
            'data' => questionData,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'store api empty json' => [
            'method' => 'POST',
            'route' => 'questions.store',
            'status' => 401,
            'data' => [],
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'update api with data' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'status' => 401,
            'id' => 1,
            'data' => questionData,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'update api empty json' => [
            'method' => 'PUT',
            'route' => 'questions.update',
            'status' => 401,
            'id' => 1,
            'data' => [],
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'destroy api' => [
            'method' => 'DELETE',
            'route' => 'questions.destroy',
            'status' => 401,
            'id' => 1,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
    ]);
});

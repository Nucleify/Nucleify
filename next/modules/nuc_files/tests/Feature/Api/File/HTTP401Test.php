<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('401', function (): void {
    apiTestArray([
        'index api' => [
            'method' => 'GET',
            'route' => 'files.index',
            'status' => 401,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'show api' => [
            'method' => 'SHOW',
            'route' => 'files.show',
            'status' => 401,
            'id' => 1,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'edit api' => [
            'method' => 'PUT',
            'route' => 'files.edit',
            'status' => 401,
            'id' => 1,
            'data' => fileData,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'destroy api' => [
            'method' => 'DELETE',
            'route' => 'files.destroy',
            'status' => 401,
            'id' => 1,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
    ]);
});

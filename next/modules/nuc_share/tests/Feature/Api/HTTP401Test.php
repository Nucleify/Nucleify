<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('share-api-401');
uses()->group('api-401');

beforeEach(function (): void {
    $this->createUsers();
});

describe('401', function (): void {
    apiTestArray([
        'create share request api' => [
            'method' => 'POST',
            'route' => 'share.create',
            'status' => 401,
            'data' => [
                'entity_ids' => [1, 2],
                'entity_type' => 'article',
                'user_ids' => [1],
            ],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'get received requests api' => [
            'method' => 'GET',
            'route' => 'share.received',
            'status' => 401,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'get sent requests api' => [
            'method' => 'GET',
            'route' => 'share.sent',
            'status' => 401,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'get pending count api' => [
            'method' => 'GET',
            'route' => 'share.count',
            'status' => 401,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'accept share request api' => [
            'method' => 'POST',
            'route' => 'share.accept',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'reject share request api' => [
            'method' => 'POST',
            'route' => 'share.reject',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'cancel share request api' => [
            'method' => 'POST',
            'route' => 'share.cancel',
            'status' => 401,
            'id' => 1,
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
    ]);
});

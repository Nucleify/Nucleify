<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('technology-api-405');
uses()->group('technology-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    apiTestArray([
        'put > index api' => [
            'method' => 'PUT',
            'route' => 'technologies.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json > index api' => [
            'method' => 'PUT',
            'route' => 'technologies.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete > index api' => [
            'method' => 'DELETE',
            'route' => 'technologies.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json > index api' => [
            'method' => 'DELETE',
            'route' => 'technologies.index',
            'status' => 405,
            'id' => 1,
        ],
        'post json > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'technologies.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
        ],
        'post > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'technologies.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > show api' => [
            'method' => 'POST',
            'route' => 'technologies.show',
            'status' => 405,
            'id' => 1,
        ],
        'put json > post api' => [
            'method' => 'PUT',
            'route' => 'technologies.store',
            'status' => 405,
            'id' => 1,
        ],
        'delete json > post api' => [
            'method' => 'DELETE',
            'route' => 'technologies.store',
            'status' => 405,
            'id' => 1,
        ],
        'post json > update api' => [
            'method' => 'POST',
            'route' => 'technologies.update',
            'status' => 405,
            'id' => 1,
        ],
        'post > delete api' => [
            'method' => 'POST',
            'route' => 'technologies.destroy',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > delete api' => [
            'method' => 'POST',
            'route' => 'technologies.destroy',
            'status' => 405,
            'id' => 1,
        ],
    ]);
});

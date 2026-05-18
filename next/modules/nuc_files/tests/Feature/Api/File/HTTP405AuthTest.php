<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    apiTestArray([
        'put > index api' => [
            'method' => 'PUT',
            'route' => 'files.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json > index api' => [
            'method' => 'PUT',
            'route' => 'files.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete > index api' => [
            'method' => 'DELETE',
            'route' => 'files.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json > index api' => [
            'method' => 'DELETE',
            'route' => 'files.index',
            'status' => 405,
            'id' => 1,
        ],
        'post json > show api' => [
            'method' => 'POST',
            'route' => 'files.show',
            'status' => 405,
            'id' => 1,
        ],
        'post > delete api' => [
            'method' => 'POST',
            'route' => 'files.destroy',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > delete api' => [
            'method' => 'POST',
            'route' => 'files.destroy',
            'status' => 405,
            'id' => 1,
        ],
        'post json > edit api' => [
            'method' => 'POST',
            'route' => 'files.edit',
            'status' => 405,
            'id' => 1,
        ],
    ]);
});

<?php

test('should have test suffix')
    ->expect([
        'Tests\Feature',
        'Tests\Unit',
        'Tests\Global',
    ])
    ->toHaveSuffix('Test');

test('should have controller suffix')
    ->expect('App\Http\Controllers')
    ->toHaveSuffix('Controller');

test('should have request suffix')
    ->expect('App\Http\Requests')
    ->toHaveSuffix('Request');

test('should have provider suffix')
    ->expect('App\Http\Providers')
    ->toHaveSuffix('Provider');

test('should have service suffix')
    ->expect('App\Http\Services')
    ->toHaveSuffix('Service');

test('should have resource suffix')
    ->expect('App\Http\Resources')
    ->toHaveSuffix('Resource');

test('should have factory suffix')
    ->expect('Database\Factories')
    ->toHaveSuffix('Factory');

test('should have seeder suffix')
    ->expect('Database\Seeders')
    ->toHaveSuffix('Seeder');

test('should have command suffix')
    ->expect('App\Console\Commands')
    ->toHaveSuffix('Command');

test('should have contract suffix')
    ->expect('App\Contracts')
    ->toHaveSuffix('Contract');

test('should have not model suffix')
    ->expect('App\Models')
    ->not->toHaveSuffix('Model');

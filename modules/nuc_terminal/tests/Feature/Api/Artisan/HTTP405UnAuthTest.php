<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-api-405');
uses()->group('terminal-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    test('put without parameter > run command api', function (): void {
        $this->put(route('artisan.run'))
            ->assertStatus(405);
    });

    test('put json without parameter > run command api', function (): void {
        $this->putJson(route('artisan.run'))
            ->assertStatus(405);
    });

    test('delete without parameter > run command api', function (): void {
        $this->delete(route('artisan.run'))
            ->assertStatus(405);
    });

    test('delete json without parameter > run command api', function (): void {
        $this->deleteJson(route('artisan.run'))
            ->assertStatus(405);
    });

    test('put with parameter > run command api', function (): void {
        $this->put(route('artisan.run', 1))
            ->assertStatus(405);
    });

    test('put json with parameter > run command api', function (): void {
        $this->putJson(route('artisan.run', 1))
            ->assertStatus(405);
    });

    test('delete with parameter > run command api', function (): void {
        $this->delete(route('artisan.run', 1))
            ->assertStatus(405);
    });

    test('delete json with parameter > run command api', function (): void {
        $this->deleteJson(route('artisan.run', 1))
            ->assertStatus(405);
    });
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');

<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Method Not Allowed > Authorized', function (): void {
    test('invalid method put without parameter > run command api', function (): void {
        $this->put(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put json without parameter > run command api', function (): void {
        $this->putJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete without parameter > run command api', function (): void {
        $this->delete(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete json without parameter > run command api', function (): void {
        $this->deleteJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put with parameter > run command api', function (): void {
        $this->put(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method delete with parameter > run command api', function (): void {
        $this->delete(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json with parameter > run command api', function (): void {
        $this->deleteJson(route('artisan.run', 1))
            ->assertStatus(405);
    });
})->skip(env('DB_DATABASE') === 'database/database.sqlite', 'temporarily unavailable');

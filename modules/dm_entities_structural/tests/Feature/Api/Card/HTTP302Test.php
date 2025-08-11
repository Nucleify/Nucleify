<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-api-302');
uses()->group('api-302');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302', function (): void {
    test('put > show api', function (): void {
        $this->put(route('cards.show', 1))
            ->assertStatus(302);
    });

    test('put > update api', function (): void {
        $this->put(route('cards.update', 1))
            ->assertStatus(302);
    });

    test('put > delete api', function (): void {
        $this->put(route('cards.destroy', 1))
            ->assertStatus(302);
    });
});

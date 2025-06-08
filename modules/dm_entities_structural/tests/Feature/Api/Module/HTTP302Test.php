<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302 > Redirect > Authorized', function (): void {
    test('invalid method put > show api', function (): void {
        $this->put(route('modules.show', 1))
            ->assertStatus(302);
    });

    test('invalid method put > update api', function (): void {
        $this->put(route('modules.update', 1))
            ->assertStatus(302);
    });

    test('invalid method put > delete api', function (): void {
        $this->put(route('modules.destroy', 1))
            ->assertStatus(302);
    });
});

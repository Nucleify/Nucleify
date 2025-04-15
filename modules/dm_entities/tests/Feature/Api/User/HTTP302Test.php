<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302 > Authorized', function (): void {
    test('invalid method put on show api', function (): void {
        $this->put(route('users.show', 1))
            ->assertStatus(302);
    });

    test('invalid method put on update api', function (): void {
        $this->put(route('users.update', 1))
            ->assertStatus(302);
    });

    test('invalid method put on delete api', function (): void {
        $this->put(route('users.destroy', 1))
            ->assertStatus(302);
    });
});

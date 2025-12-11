<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302', function (): void {
    test('put > show api', function (): void {
        $this->put(route('modules.show', 1))
            ->assertStatus(302);
    });

    test('put > update api', function (): void {
        $this->put(route('modules.update', 1))
            ->assertStatus(302);
    });

    test('put > delete api', function (): void {
        $this->put(route('modules.destroy', 1))
            ->assertStatus(302);
    });
});

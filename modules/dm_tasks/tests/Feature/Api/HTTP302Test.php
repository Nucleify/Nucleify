<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-api-302');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302', function (): void {
    test('put > show api', function (): void {
        $this->put(route('tasks.show', 1))
            ->assertStatus(302);
    });

    test('put > update api', function (): void {
        $this->put(route('tasks.update', 1))
            ->assertStatus(302);
    });

    test('put > delete api', function (): void {
        $this->put(route('tasks.destroy', 1))
            ->assertStatus(302);
    });
});

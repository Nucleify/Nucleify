<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('405 > Unauthorized', function (): void {
    test('put > index api', function (): void {
        $this->put(route('files.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('files.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('files.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('files.index', 1))
            ->assertStatus(405);
    });

    test('post json > show api', function (): void {
        $this->postJson(route('files.show', 1))
            ->assertStatus(405);
    });

    test('post > delete api', function (): void {
        $this->post(route('files.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > delete api', function (): void {
        $this->postJson(route('files.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > edit api', function (): void {
        $this->postJson(route('files.edit', 1))
            ->assertStatus(405);
    });
});

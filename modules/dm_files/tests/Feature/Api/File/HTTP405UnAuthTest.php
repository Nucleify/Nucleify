<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('405 > Method Not Allowed > Unauthorized', function (): void {
    test('invalid method put > index api', function (): void {
        $this->put(route('files.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function (): void {
        $this->putJson(route('files.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function (): void {
        $this->delete(route('files.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function (): void {
        $this->deleteJson(route('files.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function (): void {
        $this->postJson(route('files.show', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function (): void {
        $this->post(route('files.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('files.destroy', 1))
            ->assertStatus(405);
    });
});

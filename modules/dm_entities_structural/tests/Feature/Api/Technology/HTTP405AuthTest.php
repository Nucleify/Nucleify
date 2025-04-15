<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Method Not Allowed > Authorized', function (): void {
    test('invalid method put > index api', function (): void {
        $this->put(route('technologies.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function (): void {
        $this->putJson(route('technologies.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function (): void {
        $this->delete(route('technologies.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function (): void {
        $this->deleteJson(route('technologies.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('technologies.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('technologies.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function (): void {
        $this->postJson(route('technologies.show', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > post api', function (): void {
        $this->putJson(route('technologies.store', 1))
            ->assertStatus(405);
    });

    test('invalid method delete json > post api', function (): void {
        $this->deleteJson(route('technologies.store', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > update api', function (): void {
        $this->postJson(route('technologies.update', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function (): void {
        $this->post(route('technologies.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('technologies.destroy', 1))
            ->assertStatus(405);
    });
});

<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-api-405');
uses()->group('task-api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Method Not Allowed > Authorized', function (): void {
    test('invalid method put > index api', function (): void {
        $this->put(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function (): void {
        $this->putJson(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function (): void {
        $this->delete(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function (): void {
        $this->deleteJson(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('tasks.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('tasks.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function (): void {
        $this->postJson(route('tasks.show', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > post api', function (): void {
        $this->putJson(route('tasks.store', 1))
            ->assertStatus(405);
    });

    test('invalid method delete json > post api', function (): void {
        $this->deleteJson(route('tasks.store', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > update api', function (): void {
        $this->postJson(route('tasks.update', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function (): void {
        $this->post(route('tasks.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('tasks.destroy', 1))
            ->assertStatus(405);
    });
});

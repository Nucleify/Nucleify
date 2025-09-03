<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('task-api-405');
uses()->group('task-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    test('put > index api', function (): void {
        $this->put(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('tasks.index', 1))
            ->assertStatus(405);
    });

    test('post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('tasks.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post > countByCreatedLastWeek api', function (): void {
        $this->post(route('tasks.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json > show api', function (): void {
        $this->postJson(route('tasks.show', 1))
            ->assertStatus(405);
    });

    test('put json > post api', function (): void {
        $this->putJson(route('tasks.store', 1))
            ->assertStatus(405);
    });

    test('delete json > post api', function (): void {
        $this->deleteJson(route('tasks.store', 1))
            ->assertStatus(405);
    });

    test('post json > update api', function (): void {
        $this->postJson(route('tasks.update', 1))
            ->assertStatus(405);
    });

    test('post > delete api', function (): void {
        $this->post(route('tasks.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > delete api', function (): void {
        $this->postJson(route('tasks.destroy', 1))
            ->assertStatus(405);
    });
});

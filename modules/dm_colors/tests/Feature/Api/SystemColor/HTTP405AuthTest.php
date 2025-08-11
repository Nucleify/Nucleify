<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-405');
uses()->group('system-color-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    test('put > index api', function (): void {
        $this->put(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('system-colors.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post > countByCreatedLastWeek api', function (): void {
        $this->post(route('system-colors.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json > show api', function (): void {
        $this->postJson(route('system-colors.show', 1))
            ->assertStatus(405);
    });

    test('put json > post api', function (): void {
        $this->putJson(route('system-colors.store', 1))
            ->assertStatus(405);
    });

    test('delete json > post api', function (): void {
        $this->deleteJson(route('system-colors.store', 1))
            ->assertStatus(405);
    });

    test('post json > update api', function (): void {
        $this->postJson(route('system-colors.update', 1))
            ->assertStatus(405);
    });

    test('post > delete api', function (): void {
        $this->post(route('system-colors.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > delete api', function (): void {
        $this->postJson(route('system-colors.destroy', 1))
            ->assertStatus(405);
    });
});

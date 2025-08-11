<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-api-405');
uses()->group('money-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->user);
});

describe('405 > Unauthorized', function (): void {
    test('put > index api', function (): void {
        $this->put(route('money.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('money.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('money.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('money.index', 1))
            ->assertStatus(405);
    });

    test('post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('money.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post > countByCreatedLastWeek api', function (): void {
        $this->post(route('money.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json > show api', function (): void {
        $this->postJson(route('money.show', 1))
            ->assertStatus(405);
    });

    test('put json > post api', function (): void {
        $this->putJson(route('money.store', 1))
            ->assertStatus(405);
    });

    test('delete json > post api', function (): void {
        $this->deleteJson(route('money.store', 1))
            ->assertStatus(405);
    });

    test('post json > update api', function (): void {
        $this->postJson(route('money.update', 1))
            ->assertStatus(405);
    });

    test('post > delete api', function (): void {
        $this->post(route('money.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > delete api', function (): void {
        $this->postJson(route('money.destroy', 1))
            ->assertStatus(405);
    });
});

<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('system-color-api-405');
uses()->group('system-color-api-405-unauth');

describe('405 > Method Not Allowed > Unauthorized', function (): void {
    test('invalid method put > index api', function (): void {
        $this->put(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function (): void {
        $this->putJson(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function (): void {
        $this->delete(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function (): void {
        $this->deleteJson(route('system-colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('system-colors.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('system-colors.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function (): void {
        $this->postJson(route('system-colors.show', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > post api', function (): void {
        $this->putJson(route('system-colors.store', 1))
            ->assertStatus(405);
    });

    test('invalid method delete json > post api', function (): void {
        $this->deleteJson(route('system-colors.store', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > update api', function (): void {
        $this->postJson(route('system-colors.update', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function (): void {
        $this->post(route('system-colors.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('system-colors.destroy', 1))
            ->assertStatus(405);
    });
});

<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('activity-api-405');
uses()->group('activity-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    test('put > index api', function (): void {
        $this->put(route('activity-log.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('activity-log.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });

    test('put > countByCreatedLastWeek api', function (): void {
        $this->put(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('put json > countByCreatedLastWeek api', function (): void {
        $this->putJson(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post > countByCreatedLastWeek api', function (): void {
        $this->post(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json > show api', function (): void {
        $this->postJson(route('activity-log.show', 1))
            ->assertStatus(405);
    });

    test('post > delete api', function (): void {
        $this->post(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > delete api', function (): void {
        $this->postJson(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
});

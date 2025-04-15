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
        $this->put(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > index api', function (): void {
        $this->putJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete > index api', function (): void {
        $this->delete(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > index api', function (): void {
        $this->deleteJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put > countByCreatedLastWeek api', function (): void {
        $this->put(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > countByCreatedLastWeek api', function (): void {
        $this->putJson(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('activity-log.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > show api', function (): void {
        $this->postJson(route('activity-log.show', 1))
            ->assertStatus(405);
    });
    test('invalid method post > delete api', function (): void {
        $this->post(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
});

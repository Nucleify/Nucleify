<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Method Not Allowed > Authorized', function (): void {
    test('invalid method put with parameter > index api', function (): void {
        $this->put(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json with parameter > index api', function (): void {
        $this->putJson(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete with parameter > index api', function (): void {
        $this->delete(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json with parameter > index api', function (): void {
        $this->deleteJson(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('contacts.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('contacts.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post json with parameter > show api', function (): void {
        $this->postJson(route('contacts.show', 1))
            ->assertStatus(405);
    });
    test('invalid method put json with parameter > post api', function (): void {
        $this->putJson(route('contacts.store', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json with parameter > post api', function (): void {
        $this->deleteJson(route('contacts.store', 1))
            ->assertStatus(405);
    });
    test('invalid method post json with parameter > update api', function (): void {
        $this->postJson(route('contacts.update', 1))
            ->assertStatus(405);
    });
    test('invalid method post with parameter > delete api', function (): void {
        $this->post(route('contacts.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json with parameter > delete api', function (): void {
        $this->postJson(route('contacts.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method put without parameter > index api', function (): void {
        $this->put(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method put json without parameter > index api', function (): void {
        $this->putJson(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method delete without parameter > index api', function (): void {
        $this->delete(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method delete json without parameter > index api', function (): void {
        $this->deleteJson(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method put json without parameter > post api', function (): void {
        $this->putJson(route('contacts.store'))
            ->assertStatus(405);
    });
    test('invalid method delete json without parameter > post api', function (): void {
        $this->deleteJson(route('contacts.store'))
            ->assertStatus(405);
    });
});

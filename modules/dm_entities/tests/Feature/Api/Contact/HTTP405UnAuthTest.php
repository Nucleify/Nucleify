<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-405');
uses()->group('contact-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    test('put with parameter > index api', function (): void {
        $this->put(route('contacts.index', 1))
            ->assertStatus(405);
    });

    test('put json with parameter > index api', function (): void {
        $this->putJson(route('contacts.index', 1))
            ->assertStatus(405);
    });

    test('delete with parameter > index api', function (): void {
        $this->delete(route('contacts.index', 1))
            ->assertStatus(405);
    });

    test('delete json with parameter > index api', function (): void {
        $this->deleteJson(route('contacts.index', 1))
            ->assertStatus(405);
    });

    test('post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('contacts.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post > countByCreatedLastWeek api', function (): void {
        $this->post(route('contacts.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json with parameter > show api', function (): void {
        $this->postJson(route('contacts.show', 1))
            ->assertStatus(405);
    });

    test('put json with parameter > post api', function (): void {
        $this->putJson(route('contacts.store', 1))
            ->assertStatus(405);
    });

    test('delete json with parameter > post api', function (): void {
        $this->deleteJson(route('contacts.store', 1))
            ->assertStatus(405);
    });

    test('post json with parameter > update api', function (): void {
        $this->postJson(route('contacts.update', 1))
            ->assertStatus(405);
    });

    test('post with parameter > delete api', function (): void {
        $this->post(route('contacts.destroy', 1))
            ->assertStatus(405);
    });

    test('post json with parameter > delete api', function (): void {
        $this->postJson(route('contacts.destroy', 1))
            ->assertStatus(405);
    });

    test('put without parameter > index api', function (): void {
        $this->put(route('contacts.index'))
            ->assertStatus(405);
    });

    test('put json without parameter > index api', function (): void {
        $this->putJson(route('contacts.index'))
            ->assertStatus(405);
    });

    test('delete without parameter > index api', function (): void {
        $this->delete(route('contacts.index'))
            ->assertStatus(405);
    });

    test('delete json without parameter > index api', function (): void {
        $this->deleteJson(route('contacts.index'))
            ->assertStatus(405);
    });

    test('put json without parameter > post api', function (): void {
        $this->putJson(route('contacts.store'))
            ->assertStatus(405);
    });

    test('delete json without parameter > post api', function (): void {
        $this->deleteJson(route('contacts.store'))
            ->assertStatus(405);
    });
});

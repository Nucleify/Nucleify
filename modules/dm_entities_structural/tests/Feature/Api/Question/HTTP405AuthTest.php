<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('question-api-405');
uses()->group('question-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    test('put > index api', function (): void {
        $this->put(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('questions.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post > countByCreatedLastWeek api', function (): void {
        $this->post(route('questions.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('post json > show api', function (): void {
        $this->postJson(route('questions.show', 1))
            ->assertStatus(405);
    });

    test('put json > post api', function (): void {
        $this->putJson(route('questions.store', 1))
            ->assertStatus(405);
    });

    test('delete json > post api', function (): void {
        $this->deleteJson(route('questions.store', 1))
            ->assertStatus(405);
    });

    test('post json > update api', function (): void {
        $this->postJson(route('questions.update', 1))
            ->assertStatus(405);
    });

    test('post > delete api', function (): void {
        $this->post(route('questions.destroy', 1))
            ->assertStatus(405);
    });

    test('post json > delete api', function (): void {
        $this->postJson(route('questions.destroy', 1))
            ->assertStatus(405);
    });
});

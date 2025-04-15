<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('405 > Method Not Allowed > Unauthorized', function (): void {
    test('invalid method put > index api', function (): void {
        $this->put(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function (): void {
        $this->putJson(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function (): void {
        $this->delete(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function (): void {
        $this->deleteJson(route('questions.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('questions.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('questions.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function (): void {
        $this->postJson(route('questions.show', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > post api', function (): void {
        $this->putJson(route('questions.store', 1))
            ->assertStatus(405);
    });

    test('invalid method delete json > post api', function (): void {
        $this->deleteJson(route('questions.store', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > update api', function (): void {
        $this->postJson(route('questions.update', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function (): void {
        $this->post(route('questions.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('questions.destroy', 1))
            ->assertStatus(405);
    });
});

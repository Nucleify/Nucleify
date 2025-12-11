<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-api-401');
uses()->group('api-401');

describe('401', function (): void {
    test('migrate:rollback command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback'])
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('migrate command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate'])
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('migrate:fresh command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh'])
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('migrate:fresh --seed command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed'])
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });
});

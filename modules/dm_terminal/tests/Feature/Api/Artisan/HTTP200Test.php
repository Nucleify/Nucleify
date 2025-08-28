<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('terminal-api-200');
uses()->group('api-200');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('migrate:rollback command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback'])
            ->assertStatus(200)
            ->assertJson(['exit_code' => 0]);
    });

    test('migrate command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate'])
            ->assertStatus(200)
            ->assertJson(['exit_code' => 0]);
    });

    test('migrate:fresh command', function (): void {
        $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh'])
            ->assertStatus(200)
            ->assertJson(['exit_code' => 0]);
    });
});

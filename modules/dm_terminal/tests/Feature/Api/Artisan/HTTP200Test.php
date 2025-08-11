<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('migrate:rollback command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });

    test('migrate command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });

    test('migrate:fresh command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });

    test('migrate:fresh --seed command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });
});

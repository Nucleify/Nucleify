<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('401', function (): void {
    test('migrate:rollback command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });

    test('migrate command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });

    test('migrate:fresh command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });

    test('migrate:fresh --seed command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.',
            ]);
    });
});

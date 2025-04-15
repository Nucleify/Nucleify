<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    it('can run migrate:rollback command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });

    it('can run migrate command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });

    it('can run migrate:fresh command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });

    it('can run migrate:fresh --seed command', function (): void {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0,
            ]);
    });
});

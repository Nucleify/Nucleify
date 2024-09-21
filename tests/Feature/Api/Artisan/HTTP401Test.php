<?php

describe('401', function () {
    it('runs migrate:rollback command unsuccessfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });

    it('runs migrate command unsuccessfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });

    it('runs migrate:fresh command unsuccessfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });

    it('runs migrate:fresh --seed command unsuccessfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });
});

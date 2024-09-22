<?php

describe('401 > Unauthorized', function () {
    it('cant\'t run migrate:rollback command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });

    it('cant\'t run migrate command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });

    it('cant\'t run migrate:fresh command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });

    it('cant\'t run migrate:fresh --seed command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    });
});

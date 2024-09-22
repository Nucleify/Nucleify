<?php

use Spatie\Activitylog\Models\Activity;
use App\Models\Article;
use App\Models\Contact;
use App\Models\User;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    it('can run tinker command activity log factory', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute ActivityFactory::new()->count(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, Activity::count());
    });

    it('can run tinker command articles factory', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute Article::factory(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, Article::count());
    });

    it('can run tinker command contacts factory', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute Contact::factory(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, Contact::count());
    });

    it('can run tinker command users factory', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute User::factory(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, User::count());
    });


    it('can run migrate:rollback command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });

    it('can run migrate command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });

    it('can run migrate:fresh command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });

    it('can run migrate:fresh --seed command', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });
});

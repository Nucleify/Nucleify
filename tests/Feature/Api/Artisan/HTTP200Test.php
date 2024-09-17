<?php

use Spatie\Activitylog\Models\Activity;
use App\Models\Article;
use App\Models\Contact;
use App\Models\User;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function () {
    it('runs tinker command activity log factory successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute ActivityFactory::new()->count(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, Activity::count());
    });

    it('runs tinker command articles factory successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute Article::factory(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, Article::count());
    });

    it('runs tinker command contacts factory successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute Contact::factory(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, Contact::count());
    });

    it('runs tinker command users factory successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'tinker --execute User::factory(100)->create()']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);

        $this->assertGreaterThanOrEqual(100, User::count());
    });


    it('runs migrate:rollback command successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:rollback']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });

    it('runs migrate command successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });

    it('runs migrate:fresh command successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });

    it('runs migrate:fresh --seed command successfully', function () {
        $response = $this->postJson(route('artisan.run'), ['command' => 'migrate:fresh --seed']);

        $response->assertStatus(200)
            ->assertJson([
                'exit_code' => 0
            ]);
    });
});

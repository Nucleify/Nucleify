<?php

namespace Tests;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected User $admin, $user;

    protected function createUsers(): void
    {
        $this->admin = User::create([
            'id' => fake()->numberBetween(999, 9999),
            'name' => fake()->firstName(),
            'email' => fake()->email(),
            'password' => Hash::make('password'),
            'role' => 'super_admin'
        ]);
        $this->user = User::create([
            'id' => fake()->numberBetween(999, 9999),
            'name' => fake()->firstName(),
            'email' => fake()->email(),
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);
    }
}

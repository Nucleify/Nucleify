<?php

namespace Tests;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

use App\Models\User;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected User $admin, $user;

    protected function createUsers(): void
    {
        $this->admin = User::create([
            'id' => 1,
            'name' => fake()->firstName(),
            'email' => fake()->email(),
            'password' => Hash::make('password'),
            'role' => 'super_admin'
        ]);
        $this->user = User::create([
            'id' => 2,
            'name' => fake()->firstName(),
            'email' => fake()->email(),
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);
    }
}

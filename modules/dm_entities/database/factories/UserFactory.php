<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $data = [
            'id' => $this->faker->unique()->numberBetween(10, 10000),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => $this->faker->randomElement(['user', 'test_admin']),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        $validator = Validator::make($data, [
            'id' => 'required|integer|min:3|max:10000',
            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|min:3|max:70|unique:users,email',
            'password' => 'required|min:8|max:50',
            'role' => 'required|in:user,test_admin'
        ]);

        while ($validator->fails()) {
            $data['email'] = $this->faker->unique()->safeEmail();
            $validator = Validator::make($data, [
                'email' => 'required|email|min:3|max:70|unique:users,email',
            ]);
        }

        return $data;
    }
}

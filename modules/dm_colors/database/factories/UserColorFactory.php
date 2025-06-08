<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserColor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<UserColor>
 */
class UserColorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::all();
        $usersIds = $users->pluck('id')->toArray();

        $value = $this->faker->randomElement(['#6d7c75', '#39965b', '#9849ff']);

        $data = [
            'user_id' => $this->faker->randomElement($usersIds),
            'name' => $this->faker->word(),
            'value' => $value,
            'new' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|exists:users,id',
            'name' => 'required|string',
            'value' => 'required|string|max:255',
            'new' => 'required|bool',
        ]);

        return $data;
    }
}

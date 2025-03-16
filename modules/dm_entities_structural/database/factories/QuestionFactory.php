<?php

namespace Database\Factories;

use App\Models\Structural;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<Question>
 */
class QuestionFactory extends Factory
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

        $category = $this->faker->randomElement(['home', 'about', 'services', 'other']);

        $data = [
            'user_id' => $this->faker->randomElement($usersIds),
            'index' => $this->faker->numberBetween(0, 100),
            'content' => $this->faker->sentence(),
            'answer' => $this->faker->sentence(10),
            'category' => $category,
            'on_site' => in_array($category, ['home', 'about', 'services']),
            'display' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this-> faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|exists:users,id',
            'index' => 'required|integer|min:0',
            'content' => 'required|string|max:255',
            'answer' => 'required|string|max:1000',
            'category' => 'string|max:255',
            'on_site' => 'bool',
            'display' => 'bool'
        ]);

        return $data;
    }
}

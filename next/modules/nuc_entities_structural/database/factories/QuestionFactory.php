<?php

namespace Database\Factories;

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
        $category = $this->faker->randomElement(['home', 'about', 'offer', 'services', 'other']);

        $data = [
            'index' => $this->faker->numberBetween(0, 100),
            'content' => $this->faker->sentence(),
            'answer' => $this->faker->sentence(10),
            'category' => $category,
            'on_site' => in_array($category, ['home', 'about', 'offer', 'services']),
            'display' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'index' => 'required|integer|min:0',
            'content' => 'required|string|max:255',
            'answer' => 'required|string|max:1000',
            'category' => 'string|max:255',
            'on_site' => 'bool',
            'display' => 'bool',
        ]);

        return $data;
    }
}

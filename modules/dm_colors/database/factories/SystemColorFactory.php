<?php

namespace Database\Factories;

use App\Models\SystemColor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<SystemColor>
 */
class SystemColorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $value = $this->faker->randomElement(['#6d7c75', '#39965b', '#9849ff']);

        $data = [
            'name' => $this->faker->word(),
            'value' => $value,
            'new' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'name' => 'required|string',
            'value' => 'required|string|max:255',
            'new' => 'required|bool',
        ]);

        return $data;
    }
}

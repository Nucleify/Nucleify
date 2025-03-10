<?php

namespace Database\Factories\Structural;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

use App\Models\Structural\Card;

/**
 * @extends Factory<Card>
 */
class CardFactory extends Factory
{
    /**
     * Define the model's default state.
     * 
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = [
            'src' => $this->faker->sentence(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(2),
            'component' => $this->faker->randomElement(['TextBlock', 'ImageCard', 'FeatureCard']),
            'display' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this-> faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        Validator::make($data, [
            'src' => 'required|string|max:255',
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'component' => 'required|string|max:100',
            'display' => 'bool'
        ]);

        return $data;
    }
}
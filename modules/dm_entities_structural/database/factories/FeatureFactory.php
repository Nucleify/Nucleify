<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<Feature>
 */
class FeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = [
            'icon' => $this->faker->randomElement(['pi-home', 'pi-user', 'pi-search', 'pi-heart', 'pi-settings']),
            'header' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(6),
            'category' => $this->faker->word(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'header' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        return $data;
    }
}

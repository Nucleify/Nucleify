<?php

namespace Database\Factories;

use App\Models\Structural;

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
            'header' =>  $this->faker->sentence(3),
            'description' => $this->faker->sentence(6),
            'category' => $this->faker->word(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        Validator::make($data, [
            'header' => 'required|string',
            "description" => 'required|string',
            "category" => 'required|string',
        ]);

        return $data;
    }
}

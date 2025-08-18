<?php

namespace Database\Factories;

use App\Models\Documentation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<Documentation>
 */
class DocumentationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = $this->faker->randomElement(['api', 'frontend', 'backend', 'deployment']);

        $data = [
            'name' => $this->faker->sentence(3),
            'category' => $category,
            'version' => $this->faker->numerify('#.#.#'),
            'file' => $this->faker->word() . '.pdf',
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now')->format('Y-m-d H:i:s'),
            'updated_at' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d H:i:s'),
        ];

        Validator::make($data, [
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'version' => 'nullable|string|max:100',
            'file' => 'required|string|max:255',
        ])->validate();

        return $data;
    }
}

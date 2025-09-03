<?php

namespace Database\Factories;

use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<Module>
 */
class ModuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = $this->faker->randomElement(['home', 'about', 'services', 'other']);

        $data = [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(10),
            'category' => $category,
            'version' => $this->faker->numerify('##.##.##'),
            'enabled' => $this->faker->boolean(),
            'installed' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'category' => 'string|max:255',
            'version' => 'required|string|max:100',
            'enabled' => 'required|boolean',
            'installed' => 'required|boolean',
        ]);

        return $data;
    }
}

<?php

namespace Database\Factories;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = [
            'user_id' => $this->faker->numberBetween(1, 10),
            'path' => $this->faker->filePath(),
            'mime_type' => $this->faker->randomElement(['application/zip', 'text/plain', 'application/pdf']),
            'size' => (string) $this->faker->numberBetween(100, 10000),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'user_id' => 'required|integer',
            'path' => 'required|string|max:255',
            'mime_type' => 'required|string|max:255',
            'size' => 'required|string|max:255',
        ]);

        return $data;
    }
}

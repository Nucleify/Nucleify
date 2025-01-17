<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected static ?string $password;

    public function definition(): array
    {
        $users = User::all();
        $usersIds = $users->pluck('id')->toArray();

        $data = [
            'user_id' => $this->faker->randomElement($usersIds),
            'index' => $this->faker->numberBetween(-1000000, 1000000),
            'content' => $this->faker->sentence(),
            'answer' => $this->faker->paragraph,
            'category' => implode(', ', $this->faker->words()),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this-> faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|exists:users,id',
            'index' => 'required|integer',
            'content' => 'required|string|max:255',
            'answer' => 'required|string|max:1000',
            'category' => 'string|max:255',
        ]);

        return $data;
    }
}

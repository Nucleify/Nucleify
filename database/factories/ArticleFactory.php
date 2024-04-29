<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class ArticleFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $users = User::all();
        $userIds = $users->pluck('id')->toArray();

        $data = [
            'user_id' => $this->faker->randomElement($userIds),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph,
            'category' => implode(', ', $this->faker->words()),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:10',
            'category' => 'string|max:255',
        ]);

        return $data;
    }
}

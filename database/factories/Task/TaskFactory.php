<?php

namespace Database\Factories\Task;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

class TaskFactory extends Factory
{
    public function definition(): array
    {
        $users = User::all();

        $usersIds = $users->pluck('id')->toArray();

        $data = [
            'creator_id' => $this->faker->randomElement($usersIds),
            'assignee_id' => $this->faker->randomElement($usersIds),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph,
            'start_date' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'creator_id' => 'required|integer|exists:users,id',
            'assignee_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:10',
            'start_date' => 'date|before:end_date',
            'end_date' => 'date|after:start_date',
        ]);

        return $data;
    }
}

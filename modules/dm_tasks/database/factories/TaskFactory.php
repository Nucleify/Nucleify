<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::all();
        $userIds = $users->pluck('id')->toArray();

        $data = [
            'user_id' => $this->faker->randomElement($userIds),
            'assignee_id' => $this->faker->randomElement($userIds),
            'collaborator_ids' => implode(',', $this->faker->randomElements($userIds, rand(0, 3))),
            'title' => $this->faker->sentence(3),
            'description' => substr($this->faker->paragraph(255), 0, 255),
            'start_date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now')->format('Y-m-d H:i:s'),
            'updated_at' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d H:i:s'),
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|in:' . implode(',', $userIds),
            'assignee_id' => 'nullable|integer|in:' . implode(',', $userIds),
            'collaborator_ids' => 'nullable|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ])->validate();

        return $data;
    }
}

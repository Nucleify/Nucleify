<?php

namespace Database\Factories\Structural;

use App\Models\Task;
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
        $collaboratorIds = $this->faker->randomElements(range(1, 20), $this->faker->numberBetween(0, 5));

        $data = [
            'user_id' => $this->faker->numberBetween(1, 50),
            'assignee_id' => $this->faker->numberBetween(1, 50),
            'collaborator_ids' => $collaboratorIds,
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'start_date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now')->format('Y-m-d H:i:s'),
            'updated_at' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d H:i:s'),
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|min:1',
            'assignee_id' => 'required|integer|min:1',
            'collaborator_ids' => 'array',
            'title' => 'required|string|max:255',
            'description' => 'string|nullable',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ])->validate();

        return $data;
    }
}

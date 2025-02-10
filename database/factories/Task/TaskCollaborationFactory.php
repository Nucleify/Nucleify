<?php

namespace Database\Factories\Task;

use App\Models\Task\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

class TaskCollaborationFactory extends Factory
{
    public function definition(): array
    {
        $users = User::all();
        $tasks = Task::all();

        $usersIds = $users->pluck('id')->toArray();
        $tasksIds = $tasks->pluck('id')->toArray();

        $data = [
            'collaborator_id' => $this->faker->randomElement($usersIds),
            'task_id' => $this->faker->randomElement($tasksIds),
        ];

        Validator::make($data, [
            'collaborator_id' => 'required|integer|exists:users,id',
            'task_id' => 'required|integer|exists:tasks,id',
        ]);

        return $data;
    }
}

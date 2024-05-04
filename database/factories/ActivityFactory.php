<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use Spatie\Activitylog\Models\Activity;

class ActivityFactory extends Factory
{
    protected $model = Activity::class;

    public function definition()
    {
        $users = User::all();
        $userIds = $users->pluck('id')->toArray();

        return [
            'subject_id' => $this->faker->randomNumber(),
            'subject_type' => $this->faker->word,
            'causer_id' => $this->faker->randomElement($userIds),
            'causer_type' => $this->faker->word,
            'description' => $this->faker->randomElement([
                'User has fetched his contacts data',
                'User has created new contact',
                'User has updated his contact',
                'User has deleted his contact'
            ]),
            'properties' => [],
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];
    }
}

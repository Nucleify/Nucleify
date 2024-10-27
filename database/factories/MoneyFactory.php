<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Money;
use App\Models\User;

class MoneyFactory extends Factory
{
    protected $model = Money::class;

    public function definition(): array
    {
        $users = User::all();
        $usersIds = $users->pluck('id')->toArray();

        return [
            'count' => $this->faker->numberBetween(-1000000, 1000000),
            'sender_id' => $this->faker->randomElement($usersIds),
            'receiver_id' => $this->faker->randomElement($usersIds),
            'created_at' => $this->faker->dateTimeBetween('-1 year'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year'),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Money;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MoneyFactory extends Factory
{
    protected $model = Money::class;

    public function definition(): array
    {
        $users = User::all();
        $usersIds = $users->pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($usersIds),
            'sender' => $this->faker->iban(),
            'receiver' => $this->faker->iban(),
            'count' => $this->faker->numberBetween(-1000000, 1000000),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(),
            'category' => $this->faker->word(),
            'created_at' => $this->faker->dateTimeBetween('-1 year'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year'),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Money;

class MoneyFactory extends Factory
{
    // Określamy model, dla którego jest tworzona fabryka
    protected $model = Money::class;

    public function definition(): array
    {
        $users = User::pluck('id')->toArray(); // Szybsze zapytanie, nie potrzebujemy całego modelu

        return [
            'count' => $this->faker->numberBetween(1, 1000), // Generujemy losową ilość pieniędzy
            'sender_id' => $this->faker->randomElement($users),
            'receiver_id' => $this->faker->randomElement($users),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}

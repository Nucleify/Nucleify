<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->numberBetween(3, 1000),
            'user_id' => $this->faker->numberBetween(3, 1000),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'personal_phone' => $this->faker->phoneNumber,
            'work_phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'birthday' => $this->faker->date(),
            'role' => $this->faker->randomElement(['admin', 'user'])
        ];
    }
}

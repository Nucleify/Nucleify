<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

class ContactFactory extends Factory
{
    public function definition(): array
    {
        $data = [
            'user_id' => $this->faker->numberBetween(3, 10000),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'personal_phone' => $this->faker->regexify('/^\d{9}$/'),
            'work_phone' => $this->faker->regexify('/^\d{9}$/'),
            'address' => $this->faker->address,
            'birthday' => $this->faker->date(),
            'role' => $this->faker->randomElement(['admin', 'user'])
        ];

        $validator = Validator::make($data, [
            'id' => 'required|integer|min:3|max:10000',
            'user_id' => 'required|integer',
            'first_name' => 'required|string|min:3|max:30',
            'last_name' => 'nullable|string|min:3|max:30',
            'email' => 'nullable|email|min:3|max:70',
            'personal_phone' => 'nullable|string|min:9|max:9|regex:/^\d{9}/',
            'work_phone' => 'nullable|string|min:9|max:9|regex:/^\d{9}/',
            'address' => 'nullable|string|min:15|max:100',
            'birthday' => 'nullable|date',
            'role' => 'nullable|string|in:user,admin,staff'
        ]);

        while ($validator->fails()) {
            $data['email'] = $this->faker->unique()->safeEmail();
            $validator = Validator::make($data, [
                'email' => 'required|email|min:3|max:70|unique:users,email',
            ]);
        }

        return $data;
    }
}

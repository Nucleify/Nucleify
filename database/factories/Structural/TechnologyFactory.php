<?php

namespace Database\Factories\Structural;

use App\Models\Entities\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

use App\Models\Structural\Technology;

/**
 * @extends Factory<Technology>
 */
class TechnologyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::all();
        $usersIds = $users->pluck('id')->toArray();

        $data = [
            'user_id' => $this->faker->randomElement($usersIds),
            'href' => $this->faker->url(),
            'src' => $this->faker->url(),
            'label' => $this->faker->word(),
            'description' => $this->faker->sentence(5),
            'category' => $this->faker->word(),
            'display' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this-> faker->dateTimeBetween('-1 year')->format('Y-m-d')
        ];

        Validator::make($data, [
            'user_id' => 'required|integer|exists:users,id',
            'href' => 'required|string',
            'src' => 'required|string',
            'label' => 'required|string|max:50',
            'description' => 'string|max:255',
            'category' => 'string',
            'display' => 'required|bool'
        ]);

        return $data;
    }
}

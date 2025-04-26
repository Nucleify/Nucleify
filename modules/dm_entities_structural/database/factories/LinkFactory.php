<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Validator;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Link>
 */
class LinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = [
            'download' => $this->faker->url(),
            'href' => $this->faker->url(),
            'src' => $this->faker->url(),
            'icon' => $this->faker->word(),
            'category' => $this->faker->word(),
            'hreflang' => $this->faker->languageCode(),
            'media' => $this->faker->word(),
            'ping' => $this->faker->url(),
            'referrerpolicy' => $this->faker->randomElement([
                'no-referrer', 'no-referrer-when-downgrade', 'origin',
                'origin-when-cross-origin', 'same-origin',
                'strict-origin-when-cross-origin', 'unsafe-url',
            ]),
            'rel' => $this->faker->randomElement([
                'alternate', 'author', 'bookmark', 'external',
                'help', 'license', 'next', 'nofollow',
                'noreferrer', 'noopener', 'prev', 'search', 'tag',
            ]),
            'target' => $this->faker->randomElement(['_blank', '_parent', '_self', '_top']),
            'type' => $this->faker->mimeType(),
            'created_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];

        Validator::make($data, [
            'download' => 'nullable|string',
            'href' => 'required|string|url',
            'src' => 'nullable|string|url',
            'icon' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'hreflang' => 'nullable|string|max:255',
            'media' => 'nullable|string|max:255',
            'ping' => 'nullable|string',
            'referrerpolicy' => 'nullable|string|max:255|' .
                'in:no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,' .
                'same-origin,strict-origin-when-cross-origin,unsafe-url',
            'rel' => 'nullable|string|max:255|in:alternate,author,bookmark,external,help,' .
                'license,next,nofollow,noreferrer,noopener,prev,search,tag',
            'target' => 'nullable|string|max:255|in:_blank,_parent,_self,_top',
            'type' => 'nullable|string|max:255',
        ]);

        return $data;
    }
}

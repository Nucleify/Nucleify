<?php

namespace Database\Seeders;

use App\Models\Feature;

use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * @var string
     */
    protected string $path = 'database/constants/Structural/Questions/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Feature::factory()->create( [
            'header' => 'Feature #1',
            'description' => 'Lorem ipsum dolor sit amet.',
            'category' => 'category #1',
        ]);
    }
}

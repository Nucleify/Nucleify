<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    /**
     * @var string
     */
    protected string $path = 'modules/dm_entities_structural/database/constants/Features/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $whyUsFeatures = require_once $this->path . 'WhyUs.php';


        foreach ($whyUsFeatures as $feature) {
            Feature::factory()->create(array_merge($feature, [
                'category' => 'home',
            ]));
        }
    }
}

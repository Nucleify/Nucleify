<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    protected string $path = 'modules/nuc_entities_structural/database/constants/Features/';

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

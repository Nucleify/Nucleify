<?php

namespace Database\Seeders;

use App\Models\Technology;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    protected string $path = 'modules/nuc_entities_structural/database/constants/Technologies/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generalTechnologies = require_once $this->path . 'General.php';

        foreach ($generalTechnologies as $technology) {
            Technology::factory()->create(array_merge($technology, [
                'category' => 'general',
                'display' => true,
            ]));
        }
    }
}

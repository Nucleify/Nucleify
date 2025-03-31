<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Technology;

class TechnologySeeder extends Seeder
{
    /**
     * @var string
     */
    protected string $path = 'modules/dm_entities_structural/database/constants/Technologies/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generalTechnologies = require_once $this->path . 'General.php';

        foreach ($generalTechnologies as $technology) {
            Technology::factory()->create(array_merge($technology, [
                'category' => 'general',
                'display' => true
            ]));
        }
    }
}

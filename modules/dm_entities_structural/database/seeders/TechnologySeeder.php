<?php

namespace Database\Seeders;

use App\Models\Technology;

use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    /**
     * @var string
     */
    protected string $path = 'database/constants/Structural/Technologies/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generalTechnologies = require_once $this->path . 'General.php';

        foreach ($generalTechnologies as $technology) {
            Technology::factory()->create(array_merge($technology, [
                'user_id' => 1,
                'category' => 'general',
                'display' => true
            ]));
        }
    }
}

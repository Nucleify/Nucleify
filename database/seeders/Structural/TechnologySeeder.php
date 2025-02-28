<?php

namespace Database\Seeders\Structural;

use App\Models\Structural\Technology;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 6; $i++) {
            Technology::factory(10)->create([
                'user_id' => $i,
            ]);
        }
    }
}

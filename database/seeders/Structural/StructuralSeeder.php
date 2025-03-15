<?php

namespace Database\Seeders\Structural;

use App\Models\Structural\Link;
use Illuminate\Database\Seeder;

class StructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ColorSeeder::class,
            QuestionSeeder::class,
            LinkSeeder::class,
            TechnologySeeder::class
        ]);
    }
}

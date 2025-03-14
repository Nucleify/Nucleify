<?php

namespace Database\Seeders\Structural;

use App\Models\Structural\Link;
use Illuminate\Database\Seeder;

class StructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            QuestionSeeder::class,
            LinkSeeder::class,
            TechnologySeeder::class,
        ]);
    }
}

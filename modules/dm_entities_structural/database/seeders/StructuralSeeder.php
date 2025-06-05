<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class StructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CardSeeder::class,
            ColorSeeder::class,
            FeatureSeeder::class,
            QuestionSeeder::class,
            LinkSeeder::class,
            TechnologySeeder::class,
            ModuleSeeder::class,
        ]);
    }
}

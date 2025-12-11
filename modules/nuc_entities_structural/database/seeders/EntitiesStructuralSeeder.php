<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EntitiesStructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CardSeeder::class,
            FeatureSeeder::class,
            QuestionSeeder::class,
            LinkSeeder::class,
            TechnologySeeder::class,
        ]);
    }
}

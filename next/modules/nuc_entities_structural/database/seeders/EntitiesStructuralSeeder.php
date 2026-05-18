<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EntitiesStructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            QuestionSeeder::class,
            TechnologySeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

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

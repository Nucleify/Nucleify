<?php

namespace Database\Seeders\Structural;

use Illuminate\Database\Seeder;

class StructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CardSeeder::class,
            QuestionSeeder::class,
            TechnologySeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders\Structural;

use Illuminate\Database\Seeder;

class StructuralSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            QuestionSeeder::class,
//            TechnologySeeder::class,
        ]);
    }
}

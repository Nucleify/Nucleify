<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Database\Factories\ActivityFactory;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ActivityFactory::new()->count(100)->create();
    }
}

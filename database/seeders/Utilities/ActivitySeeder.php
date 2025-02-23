<?php

namespace Database\Seeders\Utilities;

use Database\Factories\Utilities\ActivityFactory;
use Illuminate\Database\Seeder;

class
ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ActivityFactory::new()->count(100)->create();
    }
}

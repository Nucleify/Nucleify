<?php

namespace Database\Seeders\Utilities;

use Illuminate\Database\Seeder;

class UtilitiesSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ActivitySeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ColorsSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SystemColorSeeder::class,
            UserColorSeeder::class,
        ]);
    }
}

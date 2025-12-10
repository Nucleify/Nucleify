<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EntitiesSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ContactSeeder::class,
            ArticleSeeder::class,
            MoneySeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ContactSeeder::class,
            ArticleSeeder::class,
//            ActivitySeeder::class,
            MoneySeeder::class
        ]);
    }
}

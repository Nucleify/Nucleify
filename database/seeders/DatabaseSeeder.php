<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Database\Seeders\Task\TaskCollaborationSeeder;
use Database\Seeders\Task\TaskSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ContactSeeder::class,
            ArticleSeeder::class,
//            ActivitySeeder::class,
            MoneySeeder::class,
            TaskSeeder::class,
            TaskCollaborationSeeder::class
        ]);
    }
}

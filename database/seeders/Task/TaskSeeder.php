<?php

namespace Database\Seeders\Task;

use Illuminate\Database\Seeder;

use App\Models\Task\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('APP_ENV') === 'production' || 'dev') {
            for ($i = 1; $i <= 6; $i++) {
                Task::factory(40)->create([
                    'creator_id' => $i,
                ]);
            }
        }
    }
}

<?php

namespace Database\Seeders\Task;

use Illuminate\Database\Seeder;

use App\Models\Task\TaskCollaboration;


class TaskCollaborationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('APP_ENV') === 'production' || 'dev') {
            for ($i = 1; $i <= 6; $i++) {
                TaskCollaboration::factory(40)->create();
            }
        }
    }
}

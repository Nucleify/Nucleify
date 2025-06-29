<?php

namespace Database\Seeders;

use App\Traits\Runners\MessageRunnerTrait;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use MessageRunnerTrait;

    public function run(): void
    {
        $this->call(EntitiesSeeder::class);
        $this->showMessage('Entities seeding completed.', $this->command);

        $this->call(StructuralSeeder::class);
        $this->showMessage('Structural entities seeding completed.', $this->command);

        $this->call(ActivitySeeder::class);
        $this->showMessage('Activities seeding completed.', $this->command);

        $this->call(TaskSeeder::class);
        $this->showMessage('Tasks seeding completed.', $this->command);

        $this->call(ColorsSeeder::class);
        $this->showMessage('Colors seeding completed.', $this->command);
    }
}

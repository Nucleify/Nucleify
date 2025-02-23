<?php

namespace Database\Seeders;

use App\Traits\Runners\MessageRunnerTrait;
use Illuminate\Database\Seeder;

use Database\Seeders\Entities\EntitiesSeeder;
use Database\Seeders\Structural\StructuralSeeder;
use Database\Seeders\Utilities\UtilitiesSeeder;

class DatabaseSeeder extends Seeder
{
    use MessageRunnerTrait;

    public function run(): void
    {
        $this->call(EntitiesSeeder::class);
        $this->call(StructuralSeeder::class);
        $this->call(UtilitiesSeeder::class);
    }
}

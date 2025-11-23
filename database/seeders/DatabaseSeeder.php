<?php

namespace Database\Seeders;

use App\Services\SeederDiscoveryService;
use App\Traits\Runners\MessageRunnerTrait;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use MessageRunnerTrait;

    public function run(): void
    {
        app(SeederDiscoveryService::class)->discoverAndCallSeeders($this);
    }
}

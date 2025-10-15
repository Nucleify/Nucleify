<?php

namespace Modules\dm_database;

use App\Services\SeederDiscoveryService;
use Illuminate\Support\ServiceProvider;

class dm_database extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(SeederDiscoveryService::class);
    }
}

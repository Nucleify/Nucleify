<?php

namespace Modules\nuc_database;

use App\Services\SeederDiscoveryService;
use Illuminate\Support\ServiceProvider;

class nuc_database extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(SeederDiscoveryService::class);
    }
}

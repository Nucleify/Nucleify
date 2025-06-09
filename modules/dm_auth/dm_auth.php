<?php

namespace Modules\dm_auth;

use Illuminate\Support\ServiceProvider;

class dm_auth extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
    }
}

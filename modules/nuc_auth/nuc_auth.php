<?php

namespace Modules\nuc_auth;

use Illuminate\Support\ServiceProvider;

class nuc_auth extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
    }
}

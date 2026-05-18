<?php

namespace Modules\nuc_modules;

use Illuminate\Support\ServiceProvider;

class nuc_modules extends ServiceProvider
{
    public function register(): void
    {
        require_once __DIR__ . '/helpers/index.php';
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
        $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
    }
}

<?php

namespace Modules\dm_tasks;

use Illuminate\Support\ServiceProvider;

class dm_tasks extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

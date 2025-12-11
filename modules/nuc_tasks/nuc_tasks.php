<?php

namespace Modules\nuc_tasks;

use Illuminate\Support\ServiceProvider;

class nuc_tasks extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

<?php

namespace Modules\dm_entities;

use Illuminate\Support\ServiceProvider;

class dm_entities extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

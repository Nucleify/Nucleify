<?php

namespace Modules\dm_entities_structural;

use Illuminate\Support\ServiceProvider;

class dm_entities_structural extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

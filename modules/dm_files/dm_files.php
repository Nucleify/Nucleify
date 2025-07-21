<?php

namespace Modules\dm_files;

use Illuminate\Support\ServiceProvider;

class dm_files extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

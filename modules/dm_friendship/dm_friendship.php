<?php

namespace Modules\dm_friendship;

use Illuminate\Support\ServiceProvider;

class dm_friendship extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

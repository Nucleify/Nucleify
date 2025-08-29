<?php

namespace Modules\dm_documentation;

use Illuminate\Support\ServiceProvider;

class dm_documentation extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

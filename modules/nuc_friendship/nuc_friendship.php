<?php

namespace Modules\nuc_friendship;

use Illuminate\Support\ServiceProvider;

class nuc_friendship extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

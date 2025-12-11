<?php

namespace Modules\nuc_entities_structural;

use Illuminate\Support\ServiceProvider;

class nuc_entities_structural extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

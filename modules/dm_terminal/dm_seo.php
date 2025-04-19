<?php

namespace Modules\dm_terminal;

use Illuminate\Support\ServiceProvider;

class dm_terminal extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

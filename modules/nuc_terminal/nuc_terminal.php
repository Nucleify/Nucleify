<?php

namespace Modules\nuc_terminal;

use Illuminate\Support\ServiceProvider;

class nuc_terminal extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

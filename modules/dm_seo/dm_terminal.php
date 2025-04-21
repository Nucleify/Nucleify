<?php

namespace Modules\dm_seo;

use Illuminate\Support\ServiceProvider;

class dm_seo extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
    }
}

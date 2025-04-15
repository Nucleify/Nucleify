<?php

namespace Modules\dm_activity;

use Illuminate\Support\ServiceProvider;

class dm_activity extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(base_path('modules/dm_activity/database/migrations'));
    }
}

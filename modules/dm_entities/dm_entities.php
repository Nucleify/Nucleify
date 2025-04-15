<?php

namespace Modules\dm_entities;

use Illuminate\Support\ServiceProvider;

class dm_entities extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(base_path('modules/dm_entities/database/migrations'));
    }
}

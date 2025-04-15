<?php

namespace Modules\dm_entities_structural;

use Illuminate\Support\ServiceProvider;

class dm_entities_structural extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(base_path('modules/dm_entities_structural/database/migrations'));
    }
}

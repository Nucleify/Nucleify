<?php

namespace Modules\dm_friendship;

use Illuminate\Support\ServiceProvider;

class dm_friendship extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(base_path('modules/dm_friendship/database/migrations'));
    }
}

<?php

namespace Modules\dm_auth;

use Illuminate\Support\ServiceProvider;

class dm_auth extends ServiceProvider
{
    /**
     * @return void
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(base_path('modules/dm_auth/database/migrations'));
    }
}


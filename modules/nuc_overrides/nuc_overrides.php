<?php

namespace Modules\nuc_overrides;

use App\Services\OverrideService;
use Illuminate\Support\ServiceProvider;

class nuc_overrides extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(OverrideService::class, function () {
            return new OverrideService;
        });

        require_once __DIR__ . '/app/Helpers/override.php';
    }
}

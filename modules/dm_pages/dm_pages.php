<?php

namespace Modules\dm_pages;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class dm_pages extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    public function boot(): void
    {
        app()->register(App\Providers\RouteServiceProvider::class);
    }
}

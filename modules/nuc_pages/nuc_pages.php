<?php

namespace Modules\nuc_pages;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class nuc_pages extends ServiceProvider
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

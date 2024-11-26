<?php

namespace App\Providers;

use Butschster\Head\Facades\Meta;
use Butschster\Head\Facades\PackageManager;
use Butschster\Head\Providers\MetaTagsApplicationServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class MetaTagsServiceProvider extends ServiceProvider
{
    protected function packages(): void
    {
        PackageManager::create('default_tags', function(): void {
            Meta::prependTitle('DataManager')
                ->setTitleSeparator(' | ')
                ->setTitle('ERP template & Page Builder')
                ->setDescription(
                    'Build cutting-edge applications with DataManager - developer-focused template. Leverage the latest 
                    technologies like Laravel, Vue.js, and more to create powerful ERP solutions. Our modern frameworks and 
                    tools provide a seamless development experience, enabling fast, efficient, and scalable solutions. 
                    Perfect for developers looking to integrate high-tech features, streamline workflows, and deliver robust 
                    applications. Unlock the potential of advanced tech stacks and stay ahead in software innovation.'
                )
                ->setRobots('follow,index')
                ->setCanonical(env('APP_URL') . '/' . collect(explode('/', url()->current()))->last())
                ->setFavicon(env('APP_URL') . '/favicon.ico');
        });
    }
}
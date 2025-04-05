<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ActivityLogger extends Facade
{
    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'activityLoggerService';
    }
}

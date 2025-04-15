<?php

namespace App\Traits\Getters;

use Illuminate\Contracts\Auth\Authenticatable;

trait UserGetterTrait
{
    public function getCauser(): ?Authenticatable
    {
        return auth()->user();
    }

    public function isCauserStaff($causer): bool
    {
        return $causer->isStaff();
    }
}

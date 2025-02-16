<?php

namespace App\Traits\Getters;

use Illuminate\Contracts\Auth\Authenticatable;

trait UserGetterTrait
{
    /**
     * @return Authenticatable|null
     */
    public function getCauser(): ?Authenticatable
    {
        return auth()->user();
    }

    /**
     * @param $causer
     *
     * @return bool
     */
    public function isCauserStaff($causer): bool
    {
        return $causer->isStaff();
    }
}

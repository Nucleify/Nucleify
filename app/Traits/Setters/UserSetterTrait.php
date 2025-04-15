<?php

namespace App\Traits\Setters;

use App\Traits\Getters\UserGetterTrait;
use Illuminate\Contracts\Auth\Authenticatable;

trait UserSetterTrait
{
    use UserGetterTrait;

    protected ?Authenticatable $causer = null;

    protected bool $isCauserStaff = false;

    public function defineUserData(): void
    {
        $this->causer = $this->getCauser();
        $this->isCauserStaff = $this->causer && $this->isCauserStaff($this->causer);
    }
}

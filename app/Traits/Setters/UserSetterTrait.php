<?php

namespace App\Traits\Setters;

use Illuminate\Contracts\Auth\Authenticatable;

use App\Traits\Getters\UserGetterTrait;

trait UserSetterTrait
{
    use UserGetterTrait;

    protected ?Authenticatable $causer = null;
    protected bool $isCauserStaff = false;

    /**
     * @return void
     */
    public function defineUserData(): void
    {
        $this->causer = $this->getCauser();
        $this->isCauserStaff = $this->causer && $this->isCauserStaff($this->causer);
    }
}

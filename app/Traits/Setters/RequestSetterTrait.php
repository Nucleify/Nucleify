<?php

namespace App\Traits\Setters;

use App\Traits\Getters\RequestGetterTrait;

trait RequestSetterTrait
{
    use RequestGetterTrait;

    protected bool $isRefererAdmin;

    protected bool $isRefererStructural;

    protected ?string $referrer = null;

    public function defineRequestData($request): void
    {
        $this->referrer = $this->getReferrer($request);
        $this->isRefererAdmin = $this->getRefererIsAdmin($this->referrer);
        $this->isRefererStructural = $this->getRefererIsStructural($this->referrer);
    }
}

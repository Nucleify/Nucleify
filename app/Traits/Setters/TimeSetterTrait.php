<?php

namespace App\Traits\Setters;

use App\Traits\Getters\TimeGetterTrait;

trait TimeSetterTrait
{
    use TimeGetterTrait;

    protected string $lastWeek;

    public function defineTimeData(): void
    {
        $this->lastWeek = $this->getLastWeek();
    }
}

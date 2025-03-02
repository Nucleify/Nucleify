<?php

namespace App\Traits\Setters;

use App\Traits\Getters\TimeGetterTrait;

trait TimeSetterTrait
{
    use TimeGetterTrait;

    protected string $lastWeek;

    /**
     * @return void
     */
    public function defineTimeData(): void
    {
        $this->lastWeek = $this->getLastWeek();
    }
}
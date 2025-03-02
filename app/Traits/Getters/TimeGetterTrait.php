<?php

namespace App\Traits\Getters;

trait TimeGetterTrait
{
    /**
     * @return string
     */
    public function getLastWeek(): string
    {
        return now()->subWeek()->toDateString();
    }
}

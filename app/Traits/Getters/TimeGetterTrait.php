<?php

namespace App\Traits\Getters;

trait TimeGetterTrait
{
    public function getLastWeek(): string
    {
        return now()->subWeek()->toDateString();
    }
}

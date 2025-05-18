<?php

namespace App\Traits\Getters;

use Illuminate\Http\Request;

trait RequestGetterTrait
{
    public function getReferrer(Request $request): ?string
    {
        return $request->header('referer-slug');
    }

    public function getRefererIsAdmin(?string $referer): bool
    {
        return $referer && str_contains($referer, 'admin');
    }

    public function getRefererIsStructural(?string $referer): bool
    {
        return $referer && str_contains($referer, 'structural');
    }
}

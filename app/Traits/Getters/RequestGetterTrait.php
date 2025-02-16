<?php

namespace App\Traits\Getters;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;

trait RequestGetterTrait
{
    /**
     * @param Request $request
     *
     * @return string|null
     */
    public function getReferrer(Request $request): ?string
    {
        return $request->header('referer');
    }

    /**
     * @param string|null $referer
     *
     * @return bool
     */
    public function getRefererIsAdmin(?string $referer): bool
    {
        return $referer && str_contains($referer, 'admin');
    }
}

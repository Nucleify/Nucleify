<?php

namespace App\Transformers;

use App\Contracts\UserShouldReceiveFields;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    public function transform(UserShouldReceiveFields $model): array
    {
        return [
            'id' => $model->getId(),
            'name' => $model->getName(),
            'email' => $model->getEmail(),
            'role' => $model->getRole(),
        ];
    }
}

<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Contracts\UserShouldReceiveFields;

class UserTransformer extends TransformerAbstract
{
    public function transform(UserShouldReceiveFields $model): array
    {
        return [
            'id' => $model->getId(),
            'name' => $model->getName(),
            'email' => $model->getEmail(),
            'role' => $model->getRole(),
            'created_at' => $model->getCreatedAt(),
            'updated_at' => $model->getUpdatedAt()
        ];
    }
}

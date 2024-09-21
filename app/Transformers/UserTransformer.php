<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;

use App\Contracts\UserContract;

class UserTransformer extends TransformerAbstract
{
    public function transform(UserContract $model): array
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
